import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import { useAuthContext } from "@/context";
import type { DecodeToken, loginResponse } from "@/types/user";
import { BASE_URL } from "@/common";
import { jwtDecode } from "jwt-decode";
import httpClient from "@/helpers/httpClient";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { session, saveSession } = useAuthContext();

  const loginFormSchema = yup.object({
    username: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().required("Please enter your password")
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(loginFormSchema)
  });



  useEffect(() => {
    if (session) {
      const decoded: DecodeToken = jwtDecode(session.access_token);
      console.log('pik', decoded)
      redirectAsRole(decoded.user.userRole)
    }
  }, []);

  const redirectAsRole = (role: 'Admin' | 'Restaurant_User', current = false) => {
    if (role == "Admin") {
      navigate("/admin/dashboard");
    } else if (role == 'Restaurant_User') {
      navigate("/home");
    }

  }

  type LoginFormFields = yup.InferType<typeof loginFormSchema>

  const login = handleSubmit(async (values: LoginFormFields) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const res: loginResponse = await axios.post(BASE_URL + "/auth/login", values, config);

      if (res.data.access_token) {
        const decoded: DecodeToken = jwtDecode(res.data.access_token);
        if (decoded.user.userRole == 'Restaurant_User') {
          const userInfo = await httpClient.get(BASE_URL + '/restaurant/' + decoded.user.UserID)
          console.log(userInfo)
        }
        res.data.userRole = decoded.user.userRole;
        saveSession(res.data);
        if (decoded.user.userRole == 'Restaurant_User' || decoded.user.userRole == 'Admin') {
          redirectAsRole(decoded.user.userRole, true)
        }

      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.data?.error) {
        toast.error(e.response?.data?.error, { position: "top-right", duration: 2000 });
      }
    } finally {
      setLoading(false);
    }
    toast.success("Successfully logged in. Redirecting....", { position: "top-right", duration: 2000 });
  });

  return { loading, login, control };
};

export default useLogin;

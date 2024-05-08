import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { AuthLayout, ClientLayout, DefaultLayout, AdminLayout } from "../layouts";
import { useAuthContext } from "@/context";
import { allAuthFlattedRoutes, clientPublicFlattedRoutes, clientProtectedFlattedRoutes, allAdminFlattedRoutes, allBlankFlattedRoutes } from "./index";

const AllRoutes = (props: RouteProps) => {
  const { session, isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route>
        {allBlankFlattedRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={
            <DefaultLayout {...props}>
              {route.element}
            </DefaultLayout>
          }
          />
        ))}
      </Route>

      <Route>
        {allAuthFlattedRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={
            <AuthLayout {...props}>
              {route.element}
            </AuthLayout>
          }
          />
        ))}
      </Route>

      <Route>
        {clientPublicFlattedRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={
            <ClientLayout {...props}>
              {route.element}
            </ClientLayout>
          }
          />
        ))}
      </Route>

      <Route>
        {clientProtectedFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              (isAuthenticated && session?.userRole == 'User') ? (
                <ClientLayout {...props}>{route.element}</ClientLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/login",
                    search: "redirectTo=" + route.path,
                  }}
                />
              )
            }
          />
        ))}
      </Route>

      <Route>
        {allAdminFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              (isAuthenticated && session?.userRole == 'Admin') ? (
                <AdminLayout {...props}>{route.element}</AdminLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/login",
                    search: "redirectTo=" + route.path,
                  }}
                />
              )
            }
          />
        ))}
      </Route>

    </Routes>
  )
}

export default AllRoutes;

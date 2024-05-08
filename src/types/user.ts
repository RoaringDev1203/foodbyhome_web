export type IUser = {
  id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'Admin' | 'Restaurant_User'
  token: string
}

export type AuthContextType = {
  session: loginType | undefined;
  isAuthenticated: boolean;
  saveSession: (session: loginType) => void;
  removeSession: () => void;
}

export type loginType = {
  access_token: string,
  refresh_token: string,
  token_type: string
  userRole: string
}
export type loginResponse = {
  data: loginType
}

export type DecodeUser = {
  sub: string;
  UserID: string;
  userRole: 'Admin' | 'Restaurant_User';
  status: null | string; // Use 'null | string' if status can be either a string or null.
  username: string;
  name: string;
};

export type DecodeToken = {
  user: DecodeUser;
  exp: number;
};

export type PersonalDetails = {
  individual_firstname: string;
  individual_lastname: string;
  individual_phone: string;
  individual_cpr: string;
  individual_email: string;
  individual_dob: string;
  individual_city: string;
  individual_address: string;
  individual_postal_code: string;
  individual_state: string;
  username?: string;
  password?: string;
  status?: string
};

export type BusinessDetails = {
  restaurant_name: string;
  cvr: string;
  phone: number;
  city: string;
  address: string;
  email: string;
  zipCode: string;
  language: string;
  duration: string;
  minDelivery: string;
  logo?: string;
  bgBackground?: string;
  openingHours?: object;
};

export type BankDetails = {
  account_number: string;
  account_holder_name: string;
  payout_schedule: string;
};

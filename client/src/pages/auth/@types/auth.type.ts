import { UserInfo } from "@/@types/user.type";
export interface AccountLogin {
  username: string;
  password: string;
}

export interface AccountRegister {
  username: string;
  password: string;
  email: string;
  fullname: string;
  phone?: string;
  address?: string;
}

export interface ResponseLogin {
  success: boolean;
  message: string;
  accessToken: string;
  userData: UserInfo;
}

export type ResponseRegister = Omit<ResponseLogin, "accessToken">;

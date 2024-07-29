import axios from "@/apis/axiosClient";
import {
  DataCreateUser,
  DataUpdateUser,
  ParamsGetUsersProp,
  User,
  Users,
} from "../@types/user.type";
import { ApiUserResponse } from "@/@types/response.type";

export const apiGetUsers = (paramsProp: ParamsGetUsersProp) => {
  return axios.get<ApiUserResponse<Users>>("/user/getusers", {
    params: paramsProp,
  });
};

export const apiGetUserById = (_id: string | number | undefined) => {
  return axios.get<ApiUserResponse<User>>(`/user/getuser/${_id}`);
};

export const apiDeleteUserById = (_id: string | number | undefined) => {
  return axios.delete<{}>(`/user/getuser/${_id}`);
};

export const apiCreateUser = (body: DataCreateUser) => {
  return axios.post<User>("/user/", body);
};

export const apiUpdateUserById = (body: DataUpdateUser) => {
  return axios.put<User>("/user/getuser/", body);
};

export const apiGetUsersBySearch = ({
  email,
  fullname,
}: {
  email: string | null;
  fullname: string | null;
}) => {
  return axios.get<Users>("/user/searchuser", {
    params: {
      email,
      fullname,
    },
  });
};

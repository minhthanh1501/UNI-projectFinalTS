import axios from "@/apis/axiosClient";
import { DataCreateUser, User, Users } from "../@types/user.type";

export const apiGetUsers = () => {
  return axios.get<Users>("/user/getall");
};

export const apiGetUserById = (_id: string | number | undefined) => {
  return axios.get<User>(`/user/${_id}`);
};

export const apiDeleteUserById = (_id: string | number | undefined) => {
  return axios.delete<{}>(`/user/${_id}`);
};

export const apiCreateUser = (body: DataCreateUser) => {
  return axios.post<User>("/user/", body);
};

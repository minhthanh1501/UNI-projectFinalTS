import axios from "@/apis/axiosClient";
import {
  CreateDataGroup,
  Group,
  Groups,
  UpdateDataGroup,
} from "../@types/group.type";
import { Users } from "@/pages/User/@types/user.type";

export const apiCreateGroup = () => {
  return axios.post<CreateDataGroup>("/");
};

export const apiGetGroups = () => {
  return axios.get<Groups>("/getgroups");
};

export const apiGetGroupById = () => {
  return axios.get<Group>("/getgroup");
};

export const apiUpdateGroupById = () => {
  return axios.put<UpdateDataGroup>("/group");
};

export const apiDeleteGroupById = (_id: string | number) => {
  return axios.delete<{}>("/");
};

export const apiGetUsersByGroupId = () => {
  return axios.get<Users>("/group");
};

export const apiAddUserToGroup = () => {
  return axios.get<Groups>("/group");
};

export const apiDeleteUserFromGroup = () => {
  return axios.get<{}>("/group");
};

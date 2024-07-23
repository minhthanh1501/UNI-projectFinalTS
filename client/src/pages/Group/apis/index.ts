import { UpdateDataGroup } from "./../@types/group.type";
import axios from "@/apis/axiosClient";
import {
  DataCreateGroup,
  Group,
  Groups,
  DataUpdateGroup,
} from "../@types/group.type";
import { Users } from "@/pages/User/@types/user.type";

export const apiCreateGroup = (body: DataCreateGroup) => {
  return axios.post<Group>("/group/", body);
};

export const apiUpdateGroupById = (body: DataUpdateGroup) => {
  return axios.put<Group>("/group/getgroup", body);
};

export const apiGetGroups = (name: string | null) => {
  return axios.get<Groups>("/group/getgroups", {
    params: {
      name,
    },
  });
};

export const apiGetGroupById = (_id: string | number | undefined) => {
  return axios.get<Group>(`/group/getgroup/${_id}`);
};

export const apiDeleteGroupById = (_id: string | number) => {
  return axios.delete<{}>(`/group/getgroup/${_id}`);
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

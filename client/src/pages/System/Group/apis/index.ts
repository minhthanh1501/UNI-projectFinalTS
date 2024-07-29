import axios from "@/apis/axiosClient";
import {
  DataCreateGroup,
  Group,
  Groups,
  DataUpdateGroup,
} from "../@types/group.type";
import { ApiGroupResponse, ApiUserResponse } from "@/@types/response.type";
import { User, Users } from "../../User/@types/user.type";

export const apiCreateGroup = (body: DataCreateGroup) => {
  return axios.post<Group>("/group/", body);
};

export const apiUpdateGroupById = (body: DataUpdateGroup) => {
  return axios.put<Group>("/group/getgroup", body);
};

export const apiGetGroups = (name: string | null) => {
  return axios.get<ApiGroupResponse<Groups>>("/group/getgroups", {
    params: {
      name,
    },
  });
};

export const apiGetGroupById = (_id: string | number | undefined | null) => {
  return axios.get<ApiGroupResponse<Group>>(`/group/getgroup/${_id}`);
};

export const apiDeleteGroupById = (_id: string | number) => {
  return axios.delete<{}>(`/group/getgroup/${_id}`);
};

export const apiAddUserToGroup = (data: { gid: string; uid: string[] }) => {
  return axios.post<ApiUserResponse<Users>>("/user/addusertogroup", data);
};

export const apiDeleteUserFromGroup = (data: { gid: string; uid?: string }) => {
  return axios.post<ApiUserResponse<User>>("/user/deleteuserfromgroup", data);
};

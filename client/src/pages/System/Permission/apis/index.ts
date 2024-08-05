import { ApiMenuResponse } from "@/@types/response.type";
import axios from "@/apis/axiosClient";
import {
  DataCreateMenu,
  DataUpdateMenu,
  Menu,
  Menus,
} from "../@types/permission.type";

// ##########MENU#########

export const apiGetMenusNotRecursive = (
  mid: string | null,
  name: string | null
) => {
  return axios.get<ApiMenuResponse<Menus>>("/menu/getmenuschildren", {
    params: {
      mid,
      name,
    },
  });
};

export const apiCreateMenu = (data: DataCreateMenu) => {
  return axios.post<ApiMenuResponse<Menu>>("/menu/", data);
};

export const apiDeleteMenuById = (_id: string) => {
  return axios.delete<{}>("/menu/", {
    params: {
      _id,
    },
  });
};

export const apiUpdateMenuById = (data: DataUpdateMenu) => {
  return axios.put<ApiMenuResponse<Menu>>("/menu/", data);
};

export const apiGetMenuById = (_id: string | null) => {
  return axios.get<ApiMenuResponse<Menu>>("/menu/getmenubyid", {
    params: {
      _id,
    },
  });
};

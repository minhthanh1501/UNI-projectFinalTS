import { ApiMenuResponse } from "@/@types/response.type";
import axios from "@/apis/axiosClient";
import { Menus } from "../@types/permission.type";

// ##########MENU#########

export const apiGetMenusNotRecursive = (mid: string | null) => {
  return axios.get<ApiMenuResponse<Menus>>("/menu/getmenuschildren", {
    params: {
      mid,
    },
  });
};

import axios from "@/apis/axiosClient";
import { Profession, Professions } from "../@types/profession.type";
import { ApiProfessionResponse } from "@/@types/response.type";

interface ParamsProps {
  name?: string;
  field?: string;
}

export const apiSearch = (paramsProps: ParamsProps) => {
  return axios.get<ApiProfessionResponse<Professions>>("profession/search", {
    params: paramsProps,
  });
};

export const apiCreateOrUpdate = (data: Partial<Profession>) => {
  return axios.post<ApiProfessionResponse<Profession>>(
    "profession/createOrUpdate",
    data
  );
};

export const apiGetDetail = (_id?: string) => {
  return axios.get<ApiProfessionResponse<Profession>>(
    `profession/detail/${_id}`
  );
};

export const apiDelete = (_id: string) => {
  return axios.delete<ApiProfessionResponse<Profession>>("profession/delete", {
    params: {
      _id,
    },
  });
};

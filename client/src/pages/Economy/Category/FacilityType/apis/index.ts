import { ApiFacilityTypeResponse } from "@/@types/response.type";
import axios from "@/apis/axiosClient";
import {
  FacilityType,
  FacilityTypes,
  ParamsProps,
} from "../@types/facilityType.type";

export const apiSearch = (paramsProps: ParamsProps) => {
  return axios.get<ApiFacilityTypeResponse<FacilityTypes>>(
    "facilityType/search",
    {
      params: paramsProps,
    }
  );
};

export const apiCreateOrUpdate = (data: Partial<FacilityType>) => {
  return axios.post<ApiFacilityTypeResponse<FacilityType>>(
    "facilityType/createOrUpdate",
    data
  );
};

export const apiGetDetail = (_id?: string) => {
  return axios.get<ApiFacilityTypeResponse<FacilityType>>(
    `facilityType/detail/${_id}`
  );
};

export const apiDelete = (_id: string) => {
  return axios.delete<ApiFacilityTypeResponse<FacilityType>>(
    "facilityType/delete",
    {
      params: {
        _id,
      },
    }
  );
};

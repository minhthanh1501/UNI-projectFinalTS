import { ApiUserResponse } from "@/@types/response.type"
import axios from "@/apis/axiosClient"
import { User } from "@/pages/System/User/@types/user.type"


export const apiUpdateUserById = (data: User) => {
    return axios.post<ApiUserResponse<User>>("/user", data)
}
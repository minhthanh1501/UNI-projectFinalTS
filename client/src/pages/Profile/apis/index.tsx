import { ApiUserResponse } from "@/@types/response.type"
import axios from "@/apis/axiosClient"
import { User } from "@/pages/System/User/@types/user.type"


export const apiUpdateUserById = (data: User) => {
    return axios.put<ApiUserResponse<User>>("user/getuser", data)
}

export const apiChangePassword = (data: { oldpassword: string, newpassword: string }) => {
    return axios.put<ApiUserResponse<User>>("user/changepassword", data)
}
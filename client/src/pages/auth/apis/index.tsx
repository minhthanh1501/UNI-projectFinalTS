import { AccountLogin, AccountRegister, ResponseLogin, ResponseRegister } from "../@types/auth.type";
import axios from "../../../apis/axiosClient"


export const apiLoginUser = (data: AccountLogin) => {
    const { username, password } = data;
    return axios.post<ResponseLogin>("/user/login", { username, password });
};

export const apiRegisterUser = (body: AccountRegister) => {
    return axios.post<ResponseRegister>("/user/register", body)
}

export const apiGetCurrentUser = () => {
    return axios.get<ResponseLogin>("/user/current")
}
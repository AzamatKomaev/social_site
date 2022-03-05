import axios, {AxiosResponse} from "axios";
import {AuthPath} from "../backpaths/authPaths";
import {UserI} from "../interfaces";
import {AuthFrontPath} from "../frontpaths/frontPath";
import {defaultConfig} from "./authData";


export class AuthService {
    static getCurrentUser = async(): Promise<AxiosResponse> => {
        try {
            return await axios.get(AuthPath.current(), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    static loginUserAndGetJwt = async(username: string, password: string): Promise<AxiosResponse> => {
        try {
            return await axios.post(AuthPath.login(), {
                username: username,
                password: password
            })
        } catch (err: any) {
            return err.response
        }
    }

    static logout = () => {
        localStorage.clear()
        window.location.href = AuthFrontPath.login()
    }
}

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

    static createUser = async(username: string, email: string, password: string): Promise<AxiosResponse> => {
        try {
            return await axios.post(AuthPath.register(), {
                username: username,
                email: email,
                password: password
            })
        } catch (err: any) {
            return err.response
        }
    }

    static acceptUser = async(token: string, isAuth: boolean): Promise<boolean> => {
        let response: AxiosResponse

        if (isAuth) return false
        try {
            response = await axios.patch(AuthPath.accept(token))
        } catch (err: any) {
            response = err.response
        }

        return response.status === 200
    }

    static logout = () => {
        localStorage.clear()
        window.location.href = AuthFrontPath.login()
    }
}


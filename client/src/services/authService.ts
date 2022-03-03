import axios, {AxiosResponse} from "axios";
import {AuthPath} from "../backpaths/authPaths";
import {UserI} from "../interfaces";


export class AuthService {
    static getCurrentUser = async(): Promise<AxiosResponse> => {
        try {
            return await axios.get(AuthPath.current())
        } catch (err: any) {
            return err.response
        }
    }
}

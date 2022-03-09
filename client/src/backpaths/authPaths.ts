import {defaultUrl} from "./defaultUrl";


export class AuthPath {
    static login = (): string => {
        return `${defaultUrl}/auth/login/`
    }

    static register = (): string => {
        return `${defaultUrl}/auth/register/`
    }

    static current = (): string => {
        return `${defaultUrl}/auth/current/`
    }

    static accept = (token: string): string => {
        return `${defaultUrl}/auth/accept/${token}/`
    }
}


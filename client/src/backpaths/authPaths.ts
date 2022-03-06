const defaultUrl = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}/api/v1`


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

export class UserPath {
    static userDetail = (instance: number | string): string => {
        return `${defaultUrl}/users/${instance}/`
    }

    static friendList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/friends/`
    }

    static postList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/posts/`
    }

    static commentList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/comments/`
    }
}

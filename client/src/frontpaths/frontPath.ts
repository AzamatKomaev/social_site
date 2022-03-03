import category from "../components/soc-ui/include/category/Category";

const defaultUrl = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_PROTOCOL}`

export class AuthFrontPath {
    static login = (): string => {
        return `${defaultUrl}/auth/loign/`
    }

    static register = (): string => {
        return `${defaultUrl}/auth/sign_up/`
    }

    static sendMessage = (): string => {
        return `${defaultUrl}/auth/send_message/`
    }

    static acceptEmail = (token: string): string => {
        return `${defaultUrl}/auth/accept/${token}/`
    }
}

export class CategoryFrontPath {
    static categoryList = (): string => {
        return `${defaultUrl}/categories/`
    }

    static postList = (categoryId: number): string => {
        return `${defaultUrl}/categories/c_id/${categoryId}/`
    }

    static postDetail = (categoryId: number, postId: number): string => {
        return `${defaultUrl}/categories/c_id/${categoryId}/${postId}/`
    }
}

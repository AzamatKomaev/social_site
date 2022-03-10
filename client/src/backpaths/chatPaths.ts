import {defaultUrl} from "./defaultUrl";


const defaultWsUrl: string = `ws://${process.env.REACT_APP_HOSTNAME}/ws`

export class WebSocketChatPath {

    static group = (chatId: number, jwt: string): string => {
        return `${defaultWsUrl}/group_chat/${chatId}/?token=${jwt}`
    }

    static personal = (): string => {
        return ""
    }
}


export class GroupChatPath {
    static chats_list = (sortBy: string, page: number): string => {
        return `${defaultUrl}/group_chats/?sort_by=${sortBy}&page=${page}`
    }

    static chat_detail = (chatId: number): string => {
        return `${defaultUrl}/group_chats/${chatId}/`
    }

    static messages_list = (chatId: number, page: number): string => {
        return `${defaultUrl}/group_chats/${chatId}/messages/?page_number=${page}`
    }

    static members_list = (chatId: number): string => {
        return `${defaultUrl}/group_chats/${chatId}/members/`
    }

    static chat_requests_list = (chatId: number, userId: number): string => {
        return `${defaultUrl}/group_chats/${chatId}/requests/${userId}/`
    }

    static user_chat_requests_list = (userId: number): string => {
        return `${defaultUrl}/group_chat_requests/${userId}/`
    }
}

export class PersonalChatPath {
    static chats_list = (sortBy: string, page: number): string => {
        return `${defaultUrl}/personal_chats/?sort_by=${sortBy}&page=${page}`
    }

    static chats_detail = (userId: number): string => {
        return `${defaultUrl}/personal_chats/${userId}/`
    }

    static messages_list = (userId: number, page: number): string => {
        return `${defaultUrl}/personal_chats/${userId}/messages/?page_number=${page}`
    }
}

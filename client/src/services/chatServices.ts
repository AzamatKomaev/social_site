import axios, {AxiosResponse} from "axios";
import {GroupChatPath, PersonalChatPath} from "../backpaths/chatPaths";
import {defaultConfig} from "./authData";

export class GroupChatService {
    private chatId: number

    constructor(chatId: number) {
        this.chatId = chatId
    }

    public static async getList(sortBy: string, page: number): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.chats_list(sortBy, page), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async getMessages(page: number): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.messages_list(this.chatId))
        } catch (err: any) {
            return err.response
        }
    }
}

export class PersonalChatService {
    private interlocutorId: number

    constructor(userId: number) {
        this.interlocutorId = userId
    }

    static async getList(sortBy: string, page: number): Promise<AxiosResponse> {
        try {
            return await axios.get(PersonalChatPath.chats_list(sortBy, page), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

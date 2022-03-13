import axios, {AxiosResponse} from "axios";
import {GroupChatPath, PersonalChatPath} from "../backpaths/chatPaths";
import {defaultConfig} from "./authData";

export class GroupChatService {
    private chatId: number

    constructor(chatId: number) {
        this.chatId = chatId
    }

    public async getDetail(): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.chat_detail(this.chatId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
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
            return await axios.get(GroupChatPath.messages_list(this.chatId, page), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async getMembers(): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.members_list(this.chatId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async createMessage(text: string): Promise<AxiosResponse> {
        try {
            return await axios.post(GroupChatPath.messages_list(this.chatId, 0), {
                text: text
            }, defaultConfig)
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

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

    public async getRequests(): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.chat_requests_list(this.chatId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async getRequestDetail(userId: number): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.user_chat_request_detail(this.chatId, userId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async acceptRequest(): Promise<AxiosResponse> {
        try {
            return await axios.patch(GroupChatPath.chat_requests_list(this.chatId), {}, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public static async getUserRequests(userId: number): Promise<AxiosResponse> {
        try {
            return await axios.get(GroupChatPath.user_chat_requests_list(userId), defaultConfig)
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

    public async createRequest(userId: number): Promise<AxiosResponse> {
        try {
            return await axios.post(GroupChatPath.user_chat_request_detail(this.chatId, userId), {}, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async deleteRequest(userId: number): Promise<AxiosResponse> {
        try {
            return await axios.delete(GroupChatPath.user_chat_request_detail(this.chatId, userId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

export class PersonalChatService {
    private interlocutorUsername: string

    constructor(username: string) {
        this.interlocutorUsername = username
    }

    public async getDetail(): Promise<AxiosResponse> {
        try {
            return await axios.get(PersonalChatPath.chats_detail(this.interlocutorUsername), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    static async getList(sortBy: string, page: number): Promise<AxiosResponse> {
        try {
            return await axios.get(PersonalChatPath.chats_list(sortBy, page), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async getMessages(page: number): Promise<AxiosResponse> {
        try {
            return await axios.get(PersonalChatPath.messages_list(this.interlocutorUsername, page), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    public async createMessage(text: string) {
        try {
            return await axios.post(PersonalChatPath.messages_list(this.interlocutorUsername, 1), {
                text: text
            }, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

export class CreatingChat {
    private name: string | undefined;
    private avatar: string | undefined;

    public constructor(name: string, avatar: string) {
        this.name = name;
        this.avatar = avatar
    }

    private createDataForm(): FormData {
        let dataForm: FormData = new FormData()
        if (this.name) dataForm.append('name', this.name);
        if (this.avatar) dataForm.append('avatar', this.avatar)
        return dataForm
    }

    public async createChat(): Promise<AxiosResponse> {
        const dataForm = this.createDataForm()

        try {
            return await axios.post(GroupChatPath.chats_list('last_message', 0), dataForm, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

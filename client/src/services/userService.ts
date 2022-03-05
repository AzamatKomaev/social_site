import axios, {AxiosResponse} from "axios";
import {GroupChatRequestI} from "../interfaces";
import {UserPath} from "../backpaths/authPaths";


export class UserService {
    static getUser = async(username: string): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.userDetail(username))
        } catch (err: any) {
            return err.response
        }
    }
}


export const getAllUserChatRequests = async(userId: number) => {
    interface ChatRequestListDataI {
        status: number | null,
        chatRequestsList: Array<GroupChatRequestI>
    }

    let data: ChatRequestListDataI = {
        status: null,
        chatRequestsList: []
    }

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/find/${userId}/chat_request/`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        data.status = response.status
        data.chatRequestsList = response.data
    } catch (err) {
        data.status = err.response.status
    }
    return data
}

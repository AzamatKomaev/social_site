import axios, {AxiosResponse} from "axios";
import {GroupChatRequestI} from "../interfaces";
import {UserPath} from "../backpaths/userPaths";


export class UserService {
    static getUser = async(username: string): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.userList(username, null))
            // return await axios.get(UserPath.userDetail(username))
        } catch (err: any) {
            return err.response
        }
    }

    static getFriendList = async(userId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.friendList(userId))
        } catch (err: any) {
            return err.response
        }
    }

    static getFriendRequests = async(userId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.friendList(userId))
        } catch (err: any) {
            return err.response
        }
    }

    static getUserPosts = async(userId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.postList(userId))
        } catch (err: any) {
            return err.response
        }
    }

    static getCommentList = async(userId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(UserPath.commentList(userId))
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

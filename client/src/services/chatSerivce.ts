import axios from "axios";
import {GroupChatRequestI} from "../interfaces";


export const getChatMembers = async(chatId) => {
    let members = []

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/members/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            members = response.data
        })
        .catch((error) => {
            console.error(error)
        })

    return members
}

export const getAllChatRequest = async(chatId) => {
    let chatRequests = []

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/request/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            chatRequests = response.data
        })
        .catch((err) => {
            console.error(err)
        })

    return chatRequests
}

export const getRequest = async(chatId: number, userId: number): Promise<GroupChatRequestI> => {
    let request: GroupChatRequestI

    await axios.get(`http://127.0.0.1:8000/api/v1/chats/${chatId}/request/${userId}/`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            request = response.data
        })
        .catch((err) => {
            console.error(err)
        })

    return request
}

export const createRequest = async(chatId: number, userId: number): Promise<GroupChatRequestI> => {
    let request: GroupChatRequestI

    await axios.post(`http://127.0.0.1:8000/api/v1/chats/${chatId}/request/${userId}/`, {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            request = response.data
        })
        .catch((err) => {
            console.error(err)
        })

    return request
}

export const deleteRequest = async(chatId: number, userId: number): Promise<number> => {
    let statusCode: number

    await axios.delete(`http://127.0.0.1:8000/api/v1/chats/${chatId}/request/${userId}/`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            statusCode = response.status
        })
        .catch((err) => {
            console.error(err)
        })

    return statusCode
}

import axios from "axios";
import {GroupChatI, GroupChatRequestI} from "../interfaces";


export const getGroupChats = async(sortBy: string, page: number) => {
    try {
        return await axios.get(`http://127.0.0.1:8000/api/v1/chats?sort_by=${sortBy}&page=${page}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
    } catch (error) {
        if (error.response.status !== 401) {
            alert(error.response.status + " error")
        }
    }
}

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

export const acceptChatRequest = async(fromChatId: number): Promise<GroupChatRequestI> => {
    let acceptedRequest: GroupChatRequestI

    try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/v1/chats/${fromChatId}/request/`, {}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        acceptedRequest = response.data
    } catch (err) {
        console.error(err)
    }

    return acceptedRequest
}

export const createChat = async(dataForm): Promise<GroupChatI> => {
    let chatData: GroupChatI;

    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'multipart/form-data'
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/chats/', dataForm, {
            headers: headers
        })
        chatData = response.data
    } catch (err) {
        console.error(err)
        return err.response.data
    }

    return chatData;
}

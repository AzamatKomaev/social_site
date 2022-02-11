import axios from "axios";

interface PersonalChatDataI {
    info: object | null,
    error: number | null
}


export const getPersonalChats = async(sortBy: string, page: number) => {
    try {
        return await axios.get(`http://127.0.0.1:8000/api/v1/personal_chats?sort_by=${sortBy}&page=${page}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
    } catch (error) {
        if (error.response.status !== 401) {
            alert(error.response.status + " error")
            return;
        }
        return error.response
    }
}


export const getPersonalChat = async(username: string) => {
    let data: PersonalChatDataI = {
        info: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/personal_chats/" + username + "/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.info = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data;
}

export const getPersonalChatMessages = async(username: string, pageNumber: number) => {
    let data =  {
        messages: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/personal_chats/" + username + "/messages/?page_number=" + pageNumber, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            if (response.status !== 204) {
                data.messages = response.data
            } else {
                data.error = true
            }
        })
        .catch((error) => {
            data.error = true
        })

    return data
}
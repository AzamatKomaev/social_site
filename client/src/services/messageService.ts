import axios from "axios";


export const createGroupMessage = async(message, chatId) => {
    let data = {
        info: null,
        error: null
    }
    let url = "http://127.0.0.1:8000/api/v1/chats/" + chatId + "/messages/"

    await axios.post(url, {
        text: message
    }, {
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

    return data
}

export const createPersonalMessage = async(message, username) => {
    let data = {
        info: null,
        error: null
    }
    let url = "http://127.0.0.1:8000/api/v1/personal_chats/" + username + "/messages/"

    await axios.post(url, {
        text: message
    }, {
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

    return data
}
import axios from "axios";


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

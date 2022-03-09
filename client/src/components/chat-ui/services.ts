import axios from 'axios';




interface chatDataI {
    chat: object | null,
    error: number | boolean
}

const getChatData = async(chatId: number) => {
    let data: chatDataI = {
        chat: null,
        error: false
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.chat = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data;
}

export { getChatData }

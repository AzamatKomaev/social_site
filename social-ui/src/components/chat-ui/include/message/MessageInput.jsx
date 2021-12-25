import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const addGroupMessageInDb = async(message, chatId) => {
    let data = {
        info: null,
        error: null
    }
    let url = "http://127.0.0.1:8000/api/v1/chats/" + chatId + "/"

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

const addPersonalMessageInDb = async(message, username) => {
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


const MessageInput = (props) => {
    const [message, setMessage] = useState()

    const sendMessage = () => {
        if (message != "") {
            if (props.type_is_group) {
                addGroupMessageInDb(message, props.chat.id)
                    .then((result) => {
                        props.ws.send((JSON.stringify({
                            type: "send_message",
                            data: result.info
                        })))
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else {
                addPersonalMessageInDb(message, props.chat.interlocutor.username)
                    .then((result) => {
                        props.ws.send((JSON.stringify({
                            type: "send_message",
                            data: result.info
                        })))
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
        setMessage("")
    }

    return (
        <div className="flex-grow-0 py-3 px-4 border-top">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="chat-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                 />
                <button
                    className="btn btn-primary"
                    id="chat-message-submit"
                    onClick={sendMessage}
                 >
                    Send
                </button>
            </div>
        </div>
    )
}

export default MessageInput;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const addMessageInDb = async(message, chatId) => {
    let data = {
        info: null,
        error: null
    }

    await axios.post("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/", {
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
        addMessageInDb(message, props.chatId)
            .then((result) => {
                console.log(result)
                setMessage("")
            })
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

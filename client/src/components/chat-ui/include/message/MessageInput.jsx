import React, { useState } from 'react';

const MessageInput = (props) => {
    const [message, setMessage] = useState("")

    const sendMessage = async() => {
        if (message !== "") {
            const response = await props.service.createMessage(message)

            if (response.status === 201) {
                props.ws.send((JSON.stringify({
                    type: "send_message",
                    data: response.data
                })))
            } else {
                console.log(response)
            }
        }
        setMessage("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
           sendMessage()
        }
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
                    onKeyPress={handleKeyPress}
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

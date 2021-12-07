import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import MessageChatWindow from './include/message/MessageChatWindow';

import { getCurrentUserData } from '../../services/service';


const getChatMessages = async(postId) => {
    let messages = {
        data: {
            messages: null,
            chat: null
        },
        error: false
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + postId + "/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            messages.data.messages = response.data.messages
            messages.data.chat = response.data.chat
        })
        .catch((error) => {
            messages.error = error.response.status
        })

    return messages;
}


const MessageChatPage = (props) => {
    const chatId = props.match.params.chatId;

    const [isAuth, setIsAuth] = useState()
    const [currentUserData, setCurrentUserData] = useState(null)

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        getChatMessages(chatId)
            .then((result) => {
                setMessages(result.data.messages)
                setChat(result.data.chat)
                setError(result.error)
            })
    }, [])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setCurrentUserData(result.info)
            })
    }, [])

    if (error == 404 || error == 403) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    } else if (messages) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <MessageChatWindow messages={messages} chat={chat} currentUserData={currentUserData}/>
            </div>
        )
    } else {
        return (
            <div>
                errorrrr
            </div>
        )
    }
}

export default MessageChatPage;
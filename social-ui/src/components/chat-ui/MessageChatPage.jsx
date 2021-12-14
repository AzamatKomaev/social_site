import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import MessageChatWindow from './include/message/MessageChatWindow';

import { getCurrentUserData } from '../../services/service';
import { WsConnect } from './include/message/websocket.jsx';


const getChatMessages = async(chatId) => {
    let messages = {
        data: {
            messages: null,
            chat: null
        },
        error: false
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/", {
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
    const [currentUserData, setCurrentUserData] = useState()

    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState([])

    const [chat, setChat] = useState(null)
    const [error, setError] = useState(false)

    const ws = useRef()
    const messagesFromApi = useRef()

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

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:8000/ws/group_chat/" + chatId + "/?token=" + localStorage.getItem("jwt") + "/")
        ws.current.onopen = () => {
            alert("Connection is opened.")
        }

        ws.current.onclose = () => {
            alert("Connection is closed.")
        }

        ws.current.onmessage = (e) => {
            setNewMessages([...newMessages, JSON.parse(e.data)])
        }
    }, [])


    if (error == 404 || error == 403) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    } else if (messages && currentUserData) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <MessageChatWindow messages={messages} newMessages={newMessages} chat={chat} ws={ws.current} currentUserData={currentUserData}/>
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
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import MessageChatWindow from './include/message/MessageChatWindow';


interface personalChatDataI {
    info: object | null,
    error: number | null
}


const getPersonalChat = async(username: string) => {
    let data: personalChatDataI = {
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

const getPersonalChatMessages = async(username: string, pageNumber: number) => {
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


const PersonalMessageChatPage = (props: any) => {
    const interlocutorUsername = props.match.params.username

    const userData = useSelector((state: any) => state.user)

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState<any>()
    const [error, setError] = useState<any>(false)

    const [newMessages, setNewMessages] = useState([])

    const ws: any = useRef()


    const addNewMessageInArray = (data: any) => {
        let chatHistory = document.getElementById('chat-window')

        setNewMessages(
            newMessages => [...newMessages, data]
        )

        if (chatHistory.scrollHeight - chatHistory.scrollTop < 1000) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    useEffect(() => {
        getPersonalChat(interlocutorUsername)
            .then((result) => {
                setChat(result.info)
                setError(result.error)
            })
    }, [])

    useEffect(() => {
        getPersonalChatMessages(interlocutorUsername, 1)
            .then((result) => {
                setMessages(result.messages.reverse())
                let chatHistory = document.getElementById('chat-window')
                chatHistory.scrollTop = chatHistory.scrollHeight;
            })
    }, [])

    useEffect(() => {
        ws.current = new WebSocket(
            `ws://127.0.0.1:8000/ws/personal_chat/${interlocutorUsername}/?token=${(localStorage.getItem("jwt") as string)}/`
        )
        ws.current.onopen = () => {
            console.log("opened")
        }

        ws.current.onclose = () => {
            console.log("closed")
        }

        ws.current.onmessage = (e) => {
            addNewMessageInArray(JSON.parse(e.data))
        }
    }, [])


    const scrollHandler = (e) => {
    }


    if (!userData.isAuth || error) {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={false}
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat}
                    ws={ws.current}
                    scrollHandler={scrollHandler}
                 />
            </div>
        )
    }
}

export default PersonalMessageChatPage;

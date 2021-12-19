import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import MessageChatWindow from './include/message/MessageChatWindow';

import { getCurrentUserData } from '../../services/service';
import { WsConnect } from './include/message/websocket.jsx';


const getChatData = async(chatId) => {
    let data = {
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

const getChatMessages = async(chatId, pageNumber) => {
    let data =  {
        messages: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/messages/?page_number=" + pageNumber, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            if (response.status != 204) {
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


const MessageChatPage = (props) => {
    const chatId = props.match.params.chatId;

    const [isAuth, setIsAuth] = useState()
    const [currentUserData, setCurrentUserData] = useState()

    const [messages, setMessages] = useState([])

    const [newMessages, setNewMessages] = useState([])

    const [chat, setChat] = useState(null)
    const [scrollHeights, setScrollHeights] = useState([])
    const [error, setError] = useState(false)

    const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false)

    const ws = useRef()


    const addNewMessageInArray = (data) => {
        let chatHistory = document.getElementById('chat-window')

        setNewMessages(
            newMessages => [...newMessages, data]
        )

        if (chatHistory.scrollHeight - chatHistory.scrollTop < 1000) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    useEffect(() => {
        getChatData(chatId)
            .then((result) => {
                setChat(result.chat)
                setError(result.error)
            })
    }, [])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setCurrentUserData(result.info)
            })
        getChatMessages(chatId, 1)
            .then((result) => {
                setMessages(result.messages.reverse())

                let chatHistory = document.getElementById('chat-window')
                chatHistory.scrollTop = chatHistory.scrollHeight;
            })
    }, [])

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:8000/ws/group_chat/" + chatId + "/?token=" + localStorage.getItem("jwt") + "/")
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

    useEffect(() => {
        if (fetching & currentPage != -1) {
            console.log("fetching")
            getChatMessages(chatId, currentPage)
                .then((result) => {
                    if (!result.error) {
                        setMessages([...result.messages.reverse(), ...messages])
                        setCurrentPage(prevState => prevState + 1)
                    } else {
                        setCurrentPage(-1)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        if (messages && messages.length > 0) {
            let chatHistory = document.getElementById('chat-window')
            setScrollHeights([...scrollHeights, chatHistory.scrollHeight])
        }
    }, [messages])


    const scrollHandler = (e) => {
        if (
            e.target.scrollTop < 10 &&
            currentPage != -1
        ) {
            setFetching(true)
            console.log(scrollHeights)

            if (scrollHeights.length === 1) {
                e.target.scrollTop = 3705
            } else {
                //console.log("old valuse is " + scrollHeights[scrollHeights.length - 2])
                //console.log("New value is " + e.target.scrollHeight)
                e.target.scrollTop = e.target.scrollHeight - scrollHeights[scrollHeights.length - 2]
            }
        }
    }


    if (error == 404 || error == 403) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    } else if ((messages || newMessages) && currentUserData) {

        try {
            let chatHistory = document.getElementById('chat-window')
            //setCurrentHeight(chatHistory.scrollHeight)
        } catch (e) {
            console.log("pass")
        }

        return (
            <div>
                <Header isAuth={isAuth}/>
                <MessageChatWindow
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat}
                    ws={ws.current}
                    currentUserData={currentUserData}
                    scrollHandler={scrollHandler}
                 />
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
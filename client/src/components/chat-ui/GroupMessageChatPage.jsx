import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import MessageChatWindow from './include/message/MessageChatWindow';

import { getCurrentUserData } from '../../services/service';
import { getChatData } from './services';


const getChatMessages = async(chatId, pageNumber) => {
    let data =  {
        messages: null,
        error: null
    }

    await axios.get(`http://127.0.0.1:8000/api/v1/chats/${chatId}/messages/?page_number=${pageNumber}`, {
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


const GroupMessageChatPage = (props) => {
    const chatId = props.match.params.chatId;

    const [currentUserData, setCurrentUserData] = useState()

    const [messages, setMessages] = useState([])

    const [newMessages, setNewMessages] = useState([])

    const [chat, setChat] = useState(null)
    const [scrollHeights, setScrollHeights] = useState([1355])
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
                setCurrentUserData(result)
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
        if (fetching && currentPage !== -1) {
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
            currentPage !== -1
        ) {
            setFetching(true)
            let elem = document.getElementById('chat-window')
            console.log(`Scroll top is ${elem.scrollTop}`)
            console.log(scrollHeights)
            elem.scrollTop = e.target.scrollHeight - scrollHeights[scrollHeights.length - 2]
        }
    }


    if (error === 404 || error === 403) {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    } else if ((messages || newMessages) && currentUserData) {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={true}
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
        console.log(messages)
        console.log(newMessages)
        console.log(currentUserData)
        return (
            <div>
                лох
            </div>
        )
    }
}

export default GroupMessageChatPage;
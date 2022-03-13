import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import MessageChatWindow from './include/message/MessageChatWindow';

import { getCurrentUserData } from '../../services/service';
import { getChatData } from './services';
import {GroupChatService} from "../../services/chatServices";
import {AuthService} from "../../services/authService";
import {WebSocketChatPath} from "../../backpaths/chatPaths";


const getChatMessages = async(chatId, pageNumber) => {
    let data =  {
        messages: null,
        error: null
    }
    
    const service = new GroupChatService(chatId)
    const response = service.getMessages(pageNumber)

    if (response.status === 200) {
        data.messages = response.data
    } else {
        data.error = true
    }

    return data
}


const GroupMessageChatPage = (props) => {
    const chatId = props.match.params.chatId;

    const [currentUserData, setCurrentUserData] = useState()

    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState([])

    const [chat, setChat] = useState(null)
    const [scrollHeights, setScrollHeights] = useState([1355])
    const [error, setError] = useState(false)

    const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false)

    const ws = useRef()
    const service = useRef()


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
        service.current = new GroupChatService(chatId)
    }, [chatId])

    useEffect(() => {
        const fetchData = async() => {
            const response = await service.current.getDetail()
            if (response.status === 200) {
                setChat(response.data)
            } else {
                setError(response.status)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const response = await AuthService.getCurrentUser()
            setCurrentUserData({
                info: response.data,
                isAuth: response.status === 200
            })
        }
        fetchData()
    }, [])

    useEffect(() => {

        const fetchData = async() => {
            const response = await service.current.getMessages(1)
            if (response.status === 200) {
                setMessages(response.data.reverse())
                let chatHistory = document.getElementById('chat-window')
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        ws.current = new WebSocket(WebSocketChatPath.group(chatId, localStorage.getItem('jwt')))
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
        const fetchData = async() => {
            if (fetching && currentPage !== -1) {
                const response = await service.current.getMessages(currentPage)

                if (response.status === 200) {
                    setMessages([...response.data.reverse(), ...messages])
                    setCurrentPage(prevState => prevState + 1)
                    console.log('i was worked!!!!!!')
                } else {
                    setCurrentPage(-1)
                }

                setFetching(false)
            }
        }
        fetchData()
    }, [fetching])

    useEffect(() => {
        const fetchData = async() => {
            const response = await service.current.getMembers()

            if (response.status === 200) {
                setMembers(response.data)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (messages && messages.length > 0) {
            let chatHistory = document.getElementById('chat-window')
            setScrollHeights([...scrollHeights, chatHistory.scrollHeight])
        }
    }, [messages])


    const scrollHandler = (e) => {
        if (
            e.target.scrollTop < 100 &&
            currentPage !== -1
        ) {
            setFetching(true)
            let elem = document.getElementById('chat-window')
            elem.scrollTop = e.target.scrollHeight - scrollHeights[scrollHeights.length - 2]
        }
    }


    if ((messages || newMessages) && currentUserData?.isAuth) {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={true}
                    members={members}
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat}
                    ws={ws.current}
                    service={service.current}
                    currentUserData={currentUserData}
                    scrollHandler={scrollHandler}
                 />
                <button onClick={() => console.log(scrollHeights, currentPage)}>
                    click here!
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default GroupMessageChatPage;
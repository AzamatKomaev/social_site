import React, { useState, useEffect, useRef } from 'react';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import MessageChatWindow from './include/message/MessageChatWindow';
import {CurrentUserDataI} from "../../services/service";
import {PersonalChatService} from "../../services/chatServices";
import {AuthService} from "../../services/authService";
import {WebSocketChatPath} from "../../backpaths/chatPaths";
import Spinner from "../extend/Spinner";



const PersonalMessageChatPage = (props: any) => {
    const interlocutorUsername = props.match.params.username

    const [currentUserData, setCurrentUserData] = useState<CurrentUserDataI>({
        info: null,
        isAuth: null
    })

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState({
        data: null,
        status: null
    })

    const [newMessages, setNewMessages] = useState([])

    const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false)
    const [scrollHeights, setScrollHeights] = useState([800])

    const service: any = useRef()
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
        service.current = new PersonalChatService(interlocutorUsername)
    }, [interlocutorUsername])

    useEffect(() => {
        const fetchData = async() => {
            const response = await service.current.getDetail()
            setChat({
                data: response.status === 200 ? response.data : null,
                status: response.status
            })
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const response = await AuthService.getCurrentUser()
            setCurrentUserData({
                info: response.status === 200 ? response.data : null,
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
        ws.current = new WebSocket(WebSocketChatPath.personal(interlocutorUsername, localStorage.getItem("jwt")))
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
                } else {
                    setCurrentPage(-1)
                }
                setFetching(false)
            }
        }
        fetchData()
    }, [fetching])

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

    if ((messages || newMessages) && currentUserData.isAuth === true && chat.status === 200) {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={false}
                    members={[]}
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat.data}
                    service={service.current}
                    ws={ws.current}
                    currentUserData={currentUserData}
                    scrollHandler={scrollHandler}
                 />
            </div>
        )
    } else if (currentUserData.isAuth === false || (chat.status >= 400 && chat.status < 500)) {
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
                <Spinner/>
            </div>
        )
    }
}

export default PersonalMessageChatPage;

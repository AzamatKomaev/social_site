import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import MessageChatWindow from './include/message/MessageChatWindow';
import {getPersonalChat, getPersonalChatMessages} from "../../services/personalChatService";
import {CurrentUserDataI, getCurrentUserData} from "../../services/service";



const PersonalMessageChatPage = (props: any) => {
    const interlocutorUsername = props.match.params.username

    const [currentUserData, setCurrentUserData] = useState<CurrentUserDataI>({
        info: null,
        isAuth: false
    })

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState<any>()
    const [error, setError] = useState<any>(false)

    const [newMessages, setNewMessages] = useState([])

    const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false)
    const [scrollHeights, setScrollHeights] = useState([1355])

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
        getCurrentUserData()
            .then((result) => {
                setCurrentUserData(result)
            })

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

    useEffect(() => {
        if (fetching && currentPage !== -1) {
            console.log("fetching")
            getPersonalChatMessages(interlocutorUsername, currentPage)
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


    if (!currentUserData.isAuth || error) {
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
                    members={[]}
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat}
                    service={null}
                    ws={ws.current}
                    currentUserData={currentUserData}
                    scrollHandler={scrollHandler}
                 />
            </div>
        )
    }
}

export default PersonalMessageChatPage;

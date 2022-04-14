import React, { useState, useEffect, useRef } from 'react';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import MessageChatWindow from './include/message/MessageChatWindow';

import {GroupChatService} from "../../services/chatServices";
import {AuthService} from "../../services/authService";
import Spinner from "../extend/Spinner";
import {WebSocketChatPath} from "../../backpaths/chatPaths";


const GroupMessageChatPage = (props) => {
    const chatId = props.match.params.chatId;

    const service = useRef()
    const [currentUserData, setCurrentUserData] = useState({
        info: null,
        isAuth: null
    })
    const [chat, setChat] = useState({
        data: null,
        status: null
    })
    const [members, setMembers] = useState([])
    const [wsPath, setWsPath] = useState()

    useEffect(() => {
        service.current = new GroupChatService(chatId)
    }, [chatId])

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
            const response = await service.current.getDetail()
            setChat({
                data: response.status === 200 ? response.data : null,
                status: response.status
            })
        }
        fetchData()
    }, [service])

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
        setWsPath(WebSocketChatPath.group(chatId, localStorage.getItem('jwt')))
    }, [chatId])


    if (currentUserData.isAuth === true && chat.data) {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={true}
                    members={members}
                    service={service.current}
                    currentUserData={currentUserData}
                    wsPath={wsPath}
                    chat={chat.data}
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

export default GroupMessageChatPage;
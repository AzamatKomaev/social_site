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
    const [chat, setChat] = useState({
        data: null,
        status: null
    })
    const [wsPath, setWsPath] = useState<string>()

    const service: any = useRef()

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
    }, [service])

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
        setWsPath(WebSocketChatPath.personal(interlocutorUsername, localStorage.getItem("jwt")))
    }, [interlocutorUsername])

    if (currentUserData.isAuth === true && chat.data) {
        return (
            <div>
                <Header/>
                <MessageChatWindow
                    type_is_group={false}
                    members={[]}
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

export default PersonalMessageChatPage;

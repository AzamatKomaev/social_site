import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SettingWindow from './include/setting/SettingWindow';
import {
    fetchGettingAllChatMembers,
    fetchGettingAllChatRequest,
    fetchGettingDetailGroupChat
} from "../../store/chat/actions";
import {GroupChatService} from "../../services/chatServices";
import Spinner from "../extend/Spinner";


const ChatSettingPage = (props: any) => {
    const chatId = props.match.params.chatId;
    const dispatch = useDispatch()

    const currentUserData = useSelector((state: any) => state.user)

    const chatData = useSelector((state: any) => state.chatList.detail)
    const service: any = useRef<GroupChatService>()

    useEffect(() => {
        service.current = new GroupChatService(chatId)
    }, [chatId])

    useEffect(() => {
        dispatch(fetchGettingDetailGroupChat(service.current))
    }, [service])

    useEffect(() => {
        dispatch(fetchGettingAllChatMembers(service.current))
        dispatch(fetchGettingAllChatRequest(service.current))
    }, [dispatch])


    if (currentUserData.isAuth === true && chatData.statusCode === 200) {
        return (
            <div>
                <Header/>
                <SettingWindow service={service.current}/>
            </div>
        )
    } else if (currentUserData === false || (chatData.statusCode >= 400 && chatData.statusCode < 500)) {
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

export default ChatSettingPage;
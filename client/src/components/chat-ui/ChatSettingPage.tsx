import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SettingWindow from './include/setting/SettingWindow';

import { getChatData } from './services';
import {fetchGettingAllChatMembers, fetchGettingAllChatRequest} from "../../store/chat/actions";


const ChatSettingPage = (props: any) => {
    const chatId = props.match.params.chatId;
    const dispatch = useDispatch()

    const currentUserData = useSelector((state: any) => state.user)
    const chatRed = useSelector((state: any) => state.requestList)

    const [chatData, setChatData] = useState({
        data: null,
        error: null
    })

    useEffect(() => {
        getChatData(chatId)
            .then((result) => {
                setChatData({data: result.chat, error: result.error})
            })
    }, [])

    useEffect(() => {
        dispatch(fetchGettingAllChatMembers(chatId))
        dispatch(fetchGettingAllChatRequest(chatId))
    }, [dispatch])


    if (currentUserData.isAuth && chatData.error !== 403) {
        return (
            <div>
                <Header/>
                <SettingWindow chatData={chatData}/>
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

export default ChatSettingPage;
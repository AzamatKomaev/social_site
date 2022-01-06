import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SettingWindow from './include/setting/SettingWindow';

import { getChatData } from './services';


const ChatSettingPage = (props: any) => {
    const chatId = props.match.params.chatId;

    const currentUserData = useSelector(state => state.user)

    const [friends, setFriends] = useState([])
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

    if (currentUserData.isAuth && chatData.error != 403) {
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
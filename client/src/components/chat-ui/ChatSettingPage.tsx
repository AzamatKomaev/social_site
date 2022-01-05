import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SettingWindow from './include/setting/SettingWindow';

import { getCurrentUserData } from '../../services/service';
import { getChatData } from './services';


const ChatSettingPage = (props: any) => {
    const chatId = props.match.params.chatId;

    const [isAuth, setIsAuth] = useState()
    const [currentUserData, setCurrentUserData] = useState()

    const [friends, setFriends] = useState([])
    const [chatData, setChatData] = useState({
        data: null,
        error: null
    })

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setCurrentUserData(result.info)
            })
    }, [])

    useEffect(() => {
        getChatData(chatId)
            .then((result) => {
                setChatData({data: result.chat, error: result.error})
            })
    }, [])

    useEffect(() => {

    })

    if (isAuth && chatData.error != 403) {
        return (
            <div>
                <Header/>
                <SettingWindow chatData={chatData} currentUserData={currentUserData}/>
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
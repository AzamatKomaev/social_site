import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import ChatWindow from './include/chat/ChatWindow';
import {GroupChatService, PersonalChatService} from "../../services/chatServices";


const getUserChats = async() => {
    let chats = {
        personal: [],
        group: []
    }

    const groupListChatResponse = await GroupChatService.getList({sort_by: 'last_message'})
    const personalListChatResponse = await PersonalChatService.getList('last_message', 1)

    chats.group = groupListChatResponse.status === 200 ? groupListChatResponse.data : []
    chats.personal = personalListChatResponse.status === 200 ? personalListChatResponse.data : []
    return chats
}


const ChatListPage = () => {
    const userData = useSelector(state => state.user)

    const [groupChats, setGroupChats] = useState([])
    const [personalChats, setPersonalChats] = useState([])

    const [update, setUpdate] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setUpdate(prevState => prevState+=1)
        }, 5000)
    }, [])


    useEffect(() => {
        getUserChats()
            .then((result) => {
                setGroupChats(result.group)
                setPersonalChats(result.personal)
        })
    }, [update])

    if (userData.isAuth) {
        return (
            <div>
                <Header/>
                <ChatWindow
                    groupChats={groupChats}
                    personalChats={personalChats}
                 />
                {"\n"}
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

export default ChatListPage;

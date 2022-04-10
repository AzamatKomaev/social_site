import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SettingWindow from './include/setting/SettingWindow';
import {fetchGettingAllChatMembers, fetchGettingAllChatRequest} from "../../store/chat/actions";
import {GroupChatService} from "../../services/chatServices";


const ChatSettingPage = (props: any) => {
    const chatId = props.match.params.chatId;
    const dispatch = useDispatch()

    const currentUserData = useSelector((state: any) => state.user)

    const [chatData, setChatData] = useState({
        data: null,
        status: null
    })
    const service: any = useRef<GroupChatService>()

    useEffect(() => {
        service.current = new GroupChatService(chatId)
    }, [chatId])

    useEffect(() => {
        const fetchData = async() => {
            const response = await service.current.getDetail()
            setChatData({data: response.data, status: response.status})
        }
        fetchData()
    }, [])

    useEffect(() => {
        dispatch(fetchGettingAllChatMembers(service.current))
        dispatch(fetchGettingAllChatRequest(service.current))
    }, [dispatch])


    if (currentUserData.isAuth && chatData.status === 200) {
        return (
            <div>
                <Header/>
                <SettingWindow chatData={chatData.data} service={service.current}/>
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
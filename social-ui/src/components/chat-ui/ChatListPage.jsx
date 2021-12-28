import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import ChatWindow from './include/chat/ChatWindow';

import { getCurrentUserData } from '../../services/service';


const getUserChats = async() => {
    let chats = {
        personal: [],
        group: []
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            chats.group = response.data
        })
        .catch((error) => {
            if (error.response.status != 401) {
                alert(error.response.status + " error")
            }
        })

    await axios.get("http://127.0.0.1:8000/api/v1/personal_chats/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            chats.personal = response.data
        })
        .catch((error) => {
            if (error.response.status != 401) {
                alert(error.response.status + " error")
            }
        })

    return chats
}


const ChatListPage = () => {
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()

    const [groupChats, setGroupChats] = useState([])
    const [personalChats, setPersonalChats] = useState([])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setUserData(result.info)
            })
    }, [])

    useEffect(() => {
        getUserChats()
            .then((result) => {
                setGroupChats(result.group)
                setPersonalChats(result.personal)
            })
    }, [])

    if (isAuth) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <ChatWindow
                    groupChats={groupChats}
                    personalChats={personalChats}
                    userData={userData}
                 />
                {"\n"}
            </div>
        )
    } else {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default ChatListPage;

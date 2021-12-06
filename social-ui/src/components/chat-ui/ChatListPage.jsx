import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import ChatWindow from './include/chat/ChatWindow';

import { getCurrentUserData } from '../../services/service';


const getUserChats = async() => {
    let userChats = []

    await axios.get("http://127.0.0.1:8000/api/v1/chats/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            userChats = response.data
        })
        .catch((error) => {
            if (error.response.status != 401) {
                alert(error.response.status + " error")
            }
        })

    return userChats
}


const ChatListPage = () => {
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()
    const [chats, setChats] = useState([])

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
                setChats(result)
            })
    }, [])

    if (isAuth) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <ChatWindow chats={chats}/>
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

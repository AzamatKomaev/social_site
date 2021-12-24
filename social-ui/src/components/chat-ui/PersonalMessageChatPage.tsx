import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import MessageChatWindow from './include/message/MessageChatWindow';
import { getCurrentUserData } from '../../services/service';

interface personalChatDataI {
    info: object | null,
    error: number | null
}


const getPersonalChat = async(username: string) => {
    let data: personalChatDataI = {
        info: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/personal_chats/" + username + "/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.info = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data;
}

const getChatMessages = async(username: string, pageNumber: number) => {
    let data =  {
        messages: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/chats/" + chatId + "/messages/?page_number=" + pageNumber, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            if (response.status != 204) {
                data.messages = response.data
            } else {
                data.error = true
            }
        })
        .catch((error) => {
            data.error = true
        })

    return data
}


const PersonalMessageChatPage = (props: any) => {
    const interlocutorUsername = props.match.params.username

    const [isAuth, setIsAuth] = useState<boolean | null>()
    const [currentUserData, setCurrentUserData] = useState()

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState<any>()
    const [error, setError] = useState<any>(false)

    const [newMessages, setNewMessages] = useState([])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setCurrentUserData(result.info)
            })
        }, [])

    useEffect(() => {
        getPersonalChat(interlocutorUsername)
            .then((result) => {
                setChat(result.info)
                setError(result.error)
            })
    }, [])


    const scrollHandler = (e) => {
    }


    if (!isAuth || error) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <MessageChatWindow
                    type_is_group={false}
                    messages={messages}
                    newMessages={newMessages}
                    chat={chat}
                    ws={"null"}
                    currentUserData={currentUserData}
                    scrollHandler={scrollHandler}
                 />
            </div>
        )
    }
}

export default PersonalMessageChatPage;

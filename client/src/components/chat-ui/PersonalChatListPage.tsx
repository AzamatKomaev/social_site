import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNewChatsInChatList} from "../../store/chat/actions";
import Header from "../extend/Header";
import {GroupChatNotification} from "./include/notifications/Notifications";
import ButtonRow from "./include/button_row/ButtonRow";
import ChatFilteringInput from "./include/chat/ChatFilteringInput";
import ChatList from "./include/chat/ChatList";
import Error404NotFound from "../extend/Error404NotFound";
import {getPersonalChats} from "../../services/personalChatService";

const PersonalChatListPage = () => {
    const dispatch = useDispatch()

    const personalChats = useSelector((state: any) => state.personalChats.personalChats)
    const userData = useSelector((state: any) => state.user)

    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {
        if (fetching && page !== -1) {
            console.log("fetching")
            getPersonalChats('-name', page)
                .then(response => {
                    dispatch(addNewChatsInChatList(response.data, "personal"))
                    if (response.status === 204) {
                        setPage(-1)
                    } else {
                        setPage(prevState => prevState + 1)
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response.status) {
                        setError(
                            {
                                response: err.response.status
                            });
                    }
                })
                .finally(() => {
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
            page !== -1
        ) {
            setFetching(true)
        }
    }


    if (userData.isAuth && !error) {
        return (
            <div>
                <Header/>
                <div className="container">
                    <GroupChatNotification/>
                    {"\n"}
                    <ButtonRow/>
                    {"\n\n"}
                    <div className="card">
                        <ChatFilteringInput/>
                        <div className="row">
                            {'\n'}
                            {/*
                            <div className="col-12">
                                {filteringResult.length > 0
                                    ?
                                    <div>
                                        <p>Найдено: {filteringResult.length}.</p>
                                        <ChatList chats={filteringResult} type_is_group={true}/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            */}
                        </div>
                        <hr style={{borderTop: "1px gray solid"}}/>
                        {"\n"}
                        <div className="row">
                            {"\n"}
                            <div className="col-12">
                                {personalChats && personalChats.length > 0
                                    ? <ChatList chats={personalChats} type_is_group={false}/>
                                    : <p>У вас нет чатов... Мб создадим?</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
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


};

export default PersonalChatListPage;
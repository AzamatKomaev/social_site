import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Error404NotFound from "../extend/Error404NotFound";
import Header from "../extend/Header";
import ChatList from "./include/chat/ChatList";
import {fetchGettingChats} from "../../store/chat/actions";
import {GroupChatNotification} from "./include/notifications/Notifications";
import ButtonRow from "./include/button_row/ButtonRow";
import ChatFilteringInput from "./include/chat/ChatFilteringInput";
import {SET_FETCHING} from "../../store/chat/actionTypes";


const GroupChatListPage = () => {
    const dispatch = useDispatch()

    const chatsData = useSelector((state: any) => state.chatList.list)
    const filteredChatList = useSelector((state: any) => state.chatList.filteredChatList)
    const userData = useSelector((state: any) => state.user)

    const [error, setError] = useState(null)

    useEffect(() => {
        if (chatsData.fetching && chatsData.page !== -1) {
            dispatch(fetchGettingChats(chatsData.page, 'group'))
        }
    }, [chatsData.fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])


    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000 &&
            chatsData.page !== -1
        ) {
            dispatch({
                type: SET_FETCHING,
                payload: {
                    fetching: true
                }
            })
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
                            <div className="col-12">
                                {filteredChatList.length > 0
                                    ?
                                    <div>
                                        {"\n"}
                                        <h4 style={{textAlign: "center"}}>Найдено: {filteredChatList.length}.</h4>
                                        <ChatList chats={filteredChatList} type_is_group={true}/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <hr style={{borderTop: "1px gray solid"}}/>
                        {"\n"}
                        <div className="row">
                            {"\n"}
                            <div className="col-12">
                                {chatsData.values
                                    ? <ChatList chats={chatsData.values} type_is_group={true}/>
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
}

export default GroupChatListPage;
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Header from "../extend/Header";
import {GroupChatNotification} from "./include/notifications/Notifications";
import ButtonRow from "./include/button_row/ButtonRow";
import ChatFilteringInput from "./include/chat/ChatFilteringInput";
import ChatList from "./include/chat/ChatList";
import Error404NotFound from "../extend/Error404NotFound";
import {fetchGettingChats} from "../../store/chat/actions";
import {SET_FETCHING} from "../../store/chat/actionTypes";
import Spinner from "../extend/Spinner";


const PersonalChatListPage = () => {
    const dispatch = useDispatch()

    const chatsData = useSelector((state: any) => state.chatList.list)
    const filteredChatList = useSelector((state: any) => state.chatList.filteredChatList)
    const userData = useSelector((state: any) => state.user)

    useEffect(() => {
        if (chatsData.fetching && chatsData.page !== -1) {
            dispatch(fetchGettingChats(chatsData.page, 'personal'))
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

    if (userData.isAuth === true) {
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
                                        <h4 style={{textAlign: "center"}}>Найдено: {filteredChatList.length}.</h4>
                                        <ChatList chats={filteredChatList} type_is_group={false}/>
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
                                    ? <ChatList chats={chatsData.values} type_is_group={false}/>
                                    : <p>У вас нет чатов... Мб создадим?</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (userData.isAuth === false) {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Spinner/>
            </div>
        )
    }
};

export default PersonalChatListPage;
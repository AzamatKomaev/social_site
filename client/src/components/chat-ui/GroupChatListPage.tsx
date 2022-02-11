import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Error404NotFound from "../extend/Error404NotFound";
import Header from "../extend/Header";
import ChatList from "./include/chat/ChatList";
import {getGroupChats} from "../../services/chatService";
import {addNewChatsInChatList} from "../../store/chat/actions";
import {GroupChatNotification} from "./include/notifications/Notifications";
import ButtonRow from "./include/button_row/ButtonRow";
import ChatFilteringInput from "./include/chat/ChatFilteringInput";


const GroupChatListPage = () => {
    const dispatch = useDispatch()

    const groupChats = useSelector((state: any) => state.chatList.groupChats)
    const filteringResult = useSelector((state: any) => state.chatList.groupChatsByFilterString)
    const userData = useSelector((state: any) => state.user)

    //const [groupChats, setGroupChats] = useState([])
    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        if (fetching && page !== -1) {
            console.log("fetching")
            getGroupChats('-name', page)
                .then(response => {
                    dispatch(addNewChatsInChatList(response.data, "group"))
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
                        </div>
                        <hr style={{borderTop: "1px gray solid"}}/>
                        {"\n"}
                        <div className="row">
                            {"\n"}
                            <div className="col-12">
                                {groupChats && groupChats.length > 0
                                    ? <ChatList chats={groupChats} type_is_group={true}/>
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
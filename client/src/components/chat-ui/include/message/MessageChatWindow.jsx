import React, {useEffect, useRef, useState} from 'react';

import '../style.css';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from '../chat/ChatHeader';
import ChatUserList from '../user/ChatUserList';
import Spinner from "../../../extend/Spinner";


const MessageChatWindow = ({type_is_group, members, currentUserData, service, wsPath, chat}) => {
    const messageListRef = useRef();
    const ws = useRef();

    const [messages, setMessages] = useState(null)
    const [newMessages, setNewMessages] = useState([])
    const [scrollHeights, setScrollHeights] = useState([800])

    const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false)

    const addNewMessageInArray = (data) => {
        setNewMessages(
            newMessages => [...newMessages, data]
        )

        if (messageListRef.current.scrollHeight - messageListRef.current.scrollTop < 1000) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }

     const scrollHandler = (e) => {
        if (
            e.target.scrollTop < 100 &&
            currentPage !== -1
        ) {
            setFetching(true)
            messageListRef.current.scrollTop = e.target.scrollHeight - scrollHeights[scrollHeights.length - 2]
        }
    }

     useEffect(() => {
        const fetchData = async() => {
            const response = await service.getMessages(1)
            if (response.status === 200) {
                setMessages(response.data.reverse())
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }
        fetchData()
    }, [service])

    useEffect(() => {
        ws.current = new WebSocket(wsPath)
        ws.current.onopen = () => {
            console.log("opened")
        }

        ws.current.onclose = () => {
            console.log("closed")
        }

        ws.current.onmessage = (e) => {
            addNewMessageInArray(JSON.parse(e.data))
        }
    }, [wsPath])

    useEffect(() => {
        const fetchData = async() => {
            if (fetching && currentPage !== -1) {
                const response = await service.getMessages(currentPage)

                if (response.status === 200) {
                    setMessages([...response.data.reverse(), ...messages])
                    setCurrentPage(prevState => prevState + 1)
                } else {
                    setCurrentPage(-1)
                }
                setFetching(false)
            }
        }
        fetchData()
    }, [fetching])

    useEffect(() => {
        if (messages && messages.length > 0) {
            setScrollHeights([...scrollHeights, messageListRef.current.scrollHeight])
        }
    }, [messages])

    useEffect(() => {
        try {
            messageListRef.current.style.height = `${window.screen.height / 1.9}px`
        } catch (err) {}
    }, [])

    if (messages !== null) {
        return (
            <main className="content">
                <div className="container p-0">
                    <div className="card">
                        <div className="row g-0">
                            {type_is_group
                                ? <ChatUserList users={members}/>
                                : ""
                            }
                                <div className={type_is_group ? "col-12 col-lg-7 col-xl-9" : "col-12 col-lg-12 col-xl-12"}>
                                {type_is_group
                                    ?
                                     <ChatHeader
                                         avatar={chat?.avatar}
                                         name={chat?.name}
                                         id={chat?.id}
                                         type_is_group={true}
                                      />
                                    :
                                     <ChatHeader
                                         avatar={chat?.interlocutor.avatar.image}
                                         name={chat?.interlocutor.username}
                                         id={chat?.interlocutor.id}
                                         type_is_group={false}
                                      />
                                    }
                                <div className="position-relative">
                                    <div
                                        className="chat-messages p-4"
                                        id="chat-window"
                                        onScroll={scrollHandler}
                                        ref={messageListRef}
                                        style={{height: "550px"}}
                                    >
                                        <MessageList
                                            messages={messages}
                                            currentUserData={currentUserData}
                                            new={false}
                                         />
                                        {"\n"}
                                        <center>
                                            <p>New messages</p>
                                            <hr style={{borderColor: "red"}}/>
                                        </center>
                                        <MessageList
                                            messages={newMessages}
                                            currentUserData={currentUserData}
                                            new={true}
                                         />
                                    </div>
                                </div>
                                <MessageInput
                                    chat={chat}
                                    ws={ws.current}
                                    service={service}
                                    currentUserData={currentUserData}
                                    type_is_group={type_is_group}
                                 />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    } else {
        return (<Spinner/>)
    }
}

export default MessageChatWindow;
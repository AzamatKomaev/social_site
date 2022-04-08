import React, { useEffect, useRef } from 'react';

import '../style.css';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from '../chat/ChatHeader';
import ChatUserList from '../user/ChatUserList';


const MessageChatWindow = ({type_is_group, members, messages, newMessages, chat, ws, currentUserData, scrollHandler,
                           service}) => {

    const messageRef = useRef();


    useEffect(() => {
        try {
            let chatWindow = document.getElementById('chat-window')
            chatWindow.style.height = `${window.screen.height / 2}px`
        } catch (err) {}
    }, [window.screen.height])

    if (chat) {
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
                                        ref={messageRef}
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
                                    ws={ws}
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
        return (
            <div>
            </div>
        )
    }
}

export default MessageChatWindow;
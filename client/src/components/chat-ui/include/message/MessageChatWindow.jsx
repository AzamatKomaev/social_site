import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import '../style.css';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from '../chat/ChatHeader';
import ChatUserList from '../user/ChatUserList';

import {getChatMembers} from "../../../../services/chatService";


const MessageChatWindow = (props) => {
    const [members, setMembers] = useState([])

    const messageRef = useRef();

    useEffect(() => {
        if (props.type_is_group) {
            getChatMembers(props.chat.id)
                .then((result) => {
                    setMembers(result)
                })
        }
    }, [])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                }
            )}
    })

    if (props.chat !== undefined) {
        return (
            <main className="content">
                <div className="container p-0">
                    <div className="card">
                        <div className="row g-0">
                            {props.type_is_group
                                ? <ChatUserList users={members}/>
                                : ""
                            }
                            <hr className="d-block d-lg-none mt-1 mb-0"/>
                                <div className={props.type_is_group ? "col-12 col-lg-7 col-xl-9" : "col-12 col-lg-12 col-xl-12"}>

                                {props.type_is_group
                                    ?
                                     <ChatHeader
                                         avatar={props.chat.avatar}
                                         name={props.chat.name}
                                         id={props.chat.id}
                                         type_is_group={true}
                                      />
                                    :
                                     <ChatHeader
                                         avatar={props.chat.interlocutor.avatar.image}
                                         name={props.chat.interlocutor.username}
                                         id={props.chat.interlocutor.id}
                                         type_is_group={false}
                                      />
                                    }
                                <div className="position-relative">
                                    <div className="chat-messages p-4" id="chat-window" onScroll={props.scrollHandler} ref={messageRef} style={{height: "550px"}}>
                                        <MessageList
                                            messages={props.messages}
                                            currentUserData={props.currentUserData}
                                            new={false}
                                         />
                                        {"\n"}
                                        <center>
                                            <p>New messages</p>
                                            <hr style={{borderColor: "red"}}/>
                                        </center>
                                        <MessageList
                                            messages={props.newMessages}
                                            currentUserData={props.currentUserData}
                                            new={true}
                                         />
                                    </div>
                                </div>
                                <MessageInput
                                    chat={props.chat}
                                    ws={props.ws}
                                    currentUserData={props.currentUserData}
                                    type_is_group={props.type_is_group}
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
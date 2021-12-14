import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../style.css';

import MessageList from './MessageList';
import MessageInput from './MessageInput';


const MessageChatWindow = (props) => {

    if (props.chat != undefined) {
        return (
            <main className="content">
                <div className="container p-0">
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-12 col-lg-5 col-xl-3 d-none d-lg-block border-right">

                                <div className="px-4 d-none d-md-block">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <input type="text" className="form-control my-3" placeholder="Search..."/>
                                        </div>
                                    </div>
                                </div>

                                <a href="{% url 'profile' username=member.username %}" className="list-group-item list-group-item-action border-0">
                                    <div className="d-flex align-items-start">
                                        <img src="/main{{ member.avatar_set.get.image.url }}" className="rounded-circle mr-1" alt="..." width="40" height="40"/>
                                        <div className="flex-grow-1 ml-3">
                                            {"member.username"}
                                            <div className="small"><span className="fas fa-circle chat-offline"></span>Online</div>
                                        </div>
                                    </div>
                                </a>

                                <hr className="d-block d-lg-none mt-1 mb-0"/>
                            </div>
                            <div className="col-12 col-lg-7 col-xl-9">
                                <div className="py-2 px-4 border-bottom  d-lg-block">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="position-relative">
                                            <img src={props.chat.avatar} className="rounded-circle mr-1" alt="..." width="50" height="50"/>
                                        </div>
                                        <div className="flex-grow-1 pl-3">
                                            <strong>{props.chat.name}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <div className="chat-messages p-4" id="chat-window" style={{height: "630px"}}>
                                        <MessageList messages={props.messages} currentUserData={props.currentUserData} new={false}/>
                                        {"\n"}
                                        <center>
                                            <p>New messages</p>
                                            <hr style={{borderColor: "red"}}/>
                                        </center>
                                        <MessageList messages={props.newMessages} currentUserData={props.currentUserData} new={true}/>
                                    </div>
                                </div>
                                <MessageInput chatId={props.chat.id} ws={props.ws} currentUserData={props.currentUserData}/>
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

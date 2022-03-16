import React from 'react';
import ChatList from './ChatList';
import CreateChatWindow from "./CreateChatWindow";


const ChatWindow = (props) => {
    return (
        <div className="container">
            <div className="card">
                <b style={{margin: "0 auto", fontSize: "15pt", padding: "12px"}}>Групповые чаты</b>
                <div className="row">
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-primary my-3"
                            data-bs-target="#create-chat-modal"
                            data-bs-toggle="modal"
                            data-target=".bd-example-modal-lg"
                            style={{marginLeft: "12.5%"}}
                        >
                            Создать чат
                        </button>
                        <CreateChatWindow/>
                        {"\n"}
                        <ChatList chats={props.groupChats} type_is_group={true}/>
                        <a href="/chats/group/" style={{marginLeft: "12.5%"}}>показать все</a>
                    </div>
                </div>
                {"\n"}
                <hr style={{borderTop: "1px gray solid"}}/>
                {"\n"}
                <b style={{margin: "0 auto", fontSize: "15pt"}}>Личные чаты</b>
                <div className="row">
                    <div className="col-12">
                        <ChatList chats={props.personalChats} type_is_group={false}/>
                        <a href="/chats/personal/" style={{marginLeft: "12.5%"}}>показать все</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;
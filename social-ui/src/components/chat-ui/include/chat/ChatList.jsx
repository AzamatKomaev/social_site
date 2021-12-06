import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Chat from './Chat';


const ChatList = (props) => {
    return (
        <div>
            {props.chats.map((chat) => (
                <Chat chat={chat} key={chat.id}/>
            ))}
        </div>
    )
}

export default ChatList;

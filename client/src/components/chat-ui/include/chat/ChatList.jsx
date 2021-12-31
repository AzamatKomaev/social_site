import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Chat from './Chat';


const ChatList = (props) => {
    return (
        <div>
            {props.chats.map((chat) => (
                <Chat
                    key={chat.id}
                    chat={chat}
                    type_is_group={props.type_is_group}
                    userData={props.userData}
                 />
            ))}
        </div>
    )
}

export default ChatList;

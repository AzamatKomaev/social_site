import React from 'react';
import Chat from './Chat';


const ChatList = (props) => {
    console.log(props.chats)

    return (
        <div>
            {props.chats.map((chat) => (
                <Chat
                    key={chat.id}
                    chat={chat}
                    type_is_group={props.type_is_group}
                 />
            ))}
        </div>
    )
}

export default ChatList;

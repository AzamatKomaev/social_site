import React from 'react';
import Message from './Message';

const MessageList = (props) => {

    return (
        <div>
            {props.messages.map((message) => (
                <Message message={message} currentUserData={props.currentUserData} new={props.new}/>
            ))}
        </div>
    )
}

export default MessageList;

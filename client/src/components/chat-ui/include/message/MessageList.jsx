import React from 'react';
import Message from './Message';


const MessageList = (props) => {
    return (
        <div>
            {props.messages.map((message) => (
                <Message message={message} new={props.new}/>
            ))}
        </div>
    )
}

export default MessageList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Message from './Message';

const MessageList = (props) => {
    return (
        <div>
            {props.messages.map((message) => (
                <Message message={message} currentUserData={props.currentUserData}/>
            ))}
        </div>
    )
}

export default MessageList;

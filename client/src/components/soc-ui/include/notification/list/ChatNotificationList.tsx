import React from 'react';
import { useSelector } from 'react-redux';

import ChatNotificationCell from '../cell/ChatNotificationCell';


const ChatNotificationList = (props: any) => {
    const userData = useSelector((state: any) => state.user)

    return (
        <div>
            {userData.chatRequestNotifications.map((request) => (
                <ChatNotificationCell notification={request}/>
            ))}
        </div>
    )
}

export default ChatNotificationList;

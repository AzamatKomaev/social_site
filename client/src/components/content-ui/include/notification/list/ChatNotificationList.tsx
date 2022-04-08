import React from 'react';
import { useSelector } from 'react-redux';

import ChatNotificationCell from '../cell/ChatNotificationCell';


const ChatNotificationList = () => {
    const userData = useSelector((state: any) => state.user)

    return (
        <div>
            {userData.chatRequestNotifications.map((request) => (
                <ChatNotificationCell key={request.id} notification={request}/>
            ))}
        </div>
    )
}

export default ChatNotificationList;

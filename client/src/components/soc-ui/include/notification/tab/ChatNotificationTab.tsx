import React from 'react';
import { useSelector } from 'react-redux';
import ChatNotificationList from "../list/ChatNotificationList";


const ChatNotificationTab = (props: any) => {
    const userData = useSelector((state: any) => state.user)

    if (userData.chatRequestNotifications && userData.chatRequestNotifications.length > 0) {
        return (
            <div>
                <ChatNotificationList/>
            </div>
        )
    } else {
        return (
            <div>
                There are not notifications for you :((
            </div>
        )
    }
}

export default ChatNotificationTab;
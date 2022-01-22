import React from 'react';
import { useSelector } from 'react-redux';
import ChatNotificationList from "../list/ChatNotificationList";


const ChatNotificationTab = (props: any) => {
    const userData = useSelector((state: any) => state.user)

    if (userData.chatRequestNotifications && userData.chatRequestNotifications.length > 0) {
        return (
            <div className="tab-pane fade" id="chats" role="tabpanel" aria-labelledby="nav-home-tab">
                <ChatNotificationList/>
            </div>
        )
    } else {
        return (
            <div className="tab-pane fade" id="chats" role="tabpanel" aria-labelledby="nav-home-tab">
                There are not notifications for you :((
            </div>
        )
    }
}

export default ChatNotificationTab;
import React from 'react';

import NotificationMenu from './NotificationMenu';
import FriendNotificationTab from './tab/FriendNotificationTab';
import ChatNotificationTab from './tab/ChatNotificationTab';


const NotificationsWindow = () => {
    return (
        <div className="container">
            <div>
                <NotificationMenu/>
            </div>
            <div className="card" style={{marginTop: "5px"}}>
                <div className="tab-content" id="nav-tabContent">
                    <FriendNotificationTab/>
                    <ChatNotificationTab/>
                </div>
            </div>
        </div>
    )
}

export default NotificationsWindow;

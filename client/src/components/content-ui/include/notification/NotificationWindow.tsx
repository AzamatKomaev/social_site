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
                    <div className="tab-pane fade show active" id="friends" role="tabpanel" aria-labelledby="nav-home-tab">
                        <FriendNotificationTab/>
                    </div>
                    <div className="tab-pane fade" id="chats" role="tabpanel" aria-labelledby="nav-home-tab">
                        <ChatNotificationTab/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationsWindow;

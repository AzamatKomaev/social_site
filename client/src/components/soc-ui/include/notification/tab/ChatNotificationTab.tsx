import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import NotificationList from '../list/NotificationList';


const ChatNotificationTab = (props: any) => {
    const [notifications, setNotifications] = useState({
        list: null,
        error: null
    })


    const userData = useSelector(state => state)


    return (
        <div className="tab-pane fade" id="chats" role="tabpanel" aria-labelledby="nav-home-tab">
            Loading...
            {/*<NotificationList notifications={notifications}/>*/}
        </div>
    )
}

export default ChatNotificationTab;
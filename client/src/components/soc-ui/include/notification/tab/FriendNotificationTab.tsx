import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import NotificationList from '../list/NotificationList';



const FriendNotificationTab = (props: any) => {
    const [notifications, setNotifications] = useState({
        list: null,
        error: null
    })
    const friendRequest = useSelector(state => state.friend)

    const userData = useSelector(state => state.user)

    if (friendRequest.list && friendRequest.list.length > 0) {
        return (
            <div className="tab-pane fade show active" id="friends" role="tabpanel" aria-labelledby="nav-home-tab">
                <NotificationList type={"friend"}/>
            </div>
        )
    } else {
        return (
            <div className="tab-pane fade show active" id="friends" role="tabpanel" aria-labelledby="nav-home-tab">
                There are not notifications for you. :( you are alone.
            </div>
        )
    }
}

export default FriendNotificationTab;

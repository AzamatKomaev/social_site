import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import NotificationList from '../list/ChatNotificationList';
import FriendNotificationList from "../list/FriendNotificationList";



const FriendNotificationTab = (props: any) => {
    const friendRequest = useSelector((state: any) => state.friendRequest)

    if (friendRequest && friendRequest.list && friendRequest.list.length > 0) {
        return (
            <div className="tab-pane fade show active" id="friends" role="tabpanel" aria-labelledby="nav-home-tab">
                <FriendNotificationList/>
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

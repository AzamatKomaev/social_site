import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import NotificationList from '../list/ChatNotificationList';
import FriendNotificationList from "../list/FriendNotificationList";



const FriendNotificationTab = () => {
    const friendRequest = useSelector((state: any) => state.friendRequest)

    if (friendRequest && friendRequest.list && friendRequest.list.length > 0) {
        return (<FriendNotificationList/>)
    } else {
        return (
            <p>
                There are not notifications for you. :( you are alone.
            </p>
        )
    }
}

export default FriendNotificationTab;

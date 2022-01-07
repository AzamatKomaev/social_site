import React from 'react';
import { useSelector } from 'react-redux';

import FriendNotificationCell from '../cell/FriendNotificationCell';
import ChatNotificationCell from '../cell/ChatNotificationCell';


const NotificationList = (props: any) => {
    const friendRequest = useSelector(state => state.friend)

    if (props.type === "friend") {
        return (
            <div>
                {friendRequest.list.map((notification) => (
                    <FriendNotificationCell notification={notification}/>
                ))}
            </div>
        )
    } else if (props.type === "chat") {
        return (
            <div>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default NotificationList

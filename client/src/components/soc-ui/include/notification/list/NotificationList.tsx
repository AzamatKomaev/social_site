import React from 'react';

import FriendNotificationCell from '../cell/FriendNotificationCell';
import ChatNotificationCell from '../cell/ChatNotificationCell';


const NotificationList = (props: any) => {
    if (props.type == "friend") {
        return (
            <div>
                {props.notifications.list.map((notification) => (
                    <FriendNotificationCell notification={notification}/>
                ))}
            </div>
        )
    } else if (props.type == "chat") {
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

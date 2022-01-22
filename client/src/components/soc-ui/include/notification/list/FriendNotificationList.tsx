import React from 'react';
import {useSelector} from "react-redux";
import FriendNotificationCell from "../cell/FriendNotificationCell";

const FriendNotificationList = (props) => {
    const friendRequest = useSelector((state: any) => state.friendRequest)

    return (
        <div>
            {friendRequest.list.map((notification) => (
                <FriendNotificationCell notification={notification}/>
            ))}
        </div>
    );
};

export default FriendNotificationList;
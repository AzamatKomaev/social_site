import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import NotificationList from '../list/NotificationList';


const getFriendNotifications = async(userId: number) => {
    let data: any = {
        notifications: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/request-notifications/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.notifications = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data
}


const FriendNotificationTab = (props: any) => {
    const [notifications, setNotifications] = useState({
        list: null,
        error: null
    })


    const userData = useSelector(state => state)


    useEffect(() => {
        getFriendNotifications(userData.info.id)
            .then((result) => {
                if (result.error) {
                    alert(result.error + " error")
                }
                setNotifications({
                    list: result.notifications,
                    error: result.error
                })
            })
    }, [])

    if (notifications.list && notifications.list.length > 0) {
        return (
            <div className="tab-pane fade show active" id="friends" role="tabpanel" aria-labelledby="nav-home-tab">
                <NotificationList notifications={notifications} type={"friend"}/>
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

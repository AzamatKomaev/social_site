import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import NotificationWindow from './include/notification/NotificationWindow';


const NotificationsPage = (props: any) => {
    const [categories, setCategories] = useState([])


    const userData = useSelector(state => state.user)


    if (userData.isAuth && userData.info) {
        return (
            <div>
                <Header/>
                <NotificationWindow/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default NotificationsPage;

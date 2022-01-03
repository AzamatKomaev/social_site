import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import NotificationWindow from './include/notification/NotificationWindow';

import { getCurrentUserData } from '../../services/service';


const NotificationsPage = (props: any) => {
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setUserData(result.info)
            })
    }, [])

    if (isAuth && userData) {
        return (
            <div>
                <Header/>
                <NotificationWindow userData={userData}/>
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

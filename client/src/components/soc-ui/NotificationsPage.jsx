import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGettingAllFriendRequests } from '../../store/friend/actions';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import NotificationWindow from './include/notification/NotificationWindow';


const NotificationsPage = (props: any) => {
    const [categories, setCategories] = useState([])

    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)

    useEffect(() => {
        if (userData.info) {
            dispatch(fetchGettingAllFriendRequests(userData.info.id))
        }
    }, [dispatch, userData])

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

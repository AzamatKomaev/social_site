import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGettingAllFriendRequests } from '../../store/friend/actions';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import NotificationWindow from './include/notification/NotificationWindow';
import {fetchGettingAllChatRequestsToUser} from "../../store/user/actions";


const NotificationsPage = (props) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)

    useEffect(() => {
        if (userData.info) {
            dispatch(fetchGettingAllFriendRequests(userData.info.id))
        }
    }, [userData.info])


    useEffect(() => {
        if (userData.info) dispatch(fetchGettingAllChatRequestsToUser(userData.info.id));
    }, [userData.info])

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

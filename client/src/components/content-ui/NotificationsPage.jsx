import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGettingAllFriendRequests } from '../../store/friend/actions';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import NotificationWindow from './include/notification/NotificationWindow';
import {fetchGettingAllChatRequestsToUser} from "../../store/user/actions";
import Spinner from "../extend/Spinner";


const NotificationsPage = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)

    useEffect(() => {
        if (userData.info) {
            dispatch(fetchGettingAllFriendRequests(userData.info.id))
            dispatch(fetchGettingAllChatRequestsToUser(userData.info.id));
        }
    }, [userData.info])

    if (userData.isAuth && userData.info) {
        return (
            <div>
                <Header/>
                <NotificationWindow/>
            </div>
        )
    } else if (userData.isAuth === false) {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Spinner/>
            </div>
        )
    }
}

export default NotificationsPage;

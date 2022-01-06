import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findUserAndGetData } from '../../services/service';
import { fetchGettingFriendRequest } from '../../store/friend/actions';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import PostList from '../soc-ui/include/post/PostList';

import SwitchMenu from './include/menu/SwitchMenu';
import InfoTab from './include/tab/InfoTab';
import SettingTab from './include/tab/SettingTab'


const UserPage = (props) => {
    let username = props.match.params.username;

    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const currentUserData = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            dispatch(fetchGettingFriendRequest(user.id))
            console.log('I WAS WORKING!!')
        }
    }, [dispatch, user])

    useEffect(() => {
        findUserAndGetData(username)
            .then((result) => {
                setUser(result)
            })
    }, [])

    if (user && currentUserData !== undefined) {
        return (
            <div>
                <Header/>
                <div className="container">
                    <SwitchMenu/>
                    <div className="tab-content">
                        {"\n"}
                        <InfoTab user={user}/>
                        <SettingTab/>
                    </div>
                </div>
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

export default UserPage;

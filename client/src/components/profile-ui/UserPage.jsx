import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {fetchGettingFriendRequest} from '../../store/friend/actions';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import SwitchMenu from './include/menu/SwitchMenu';
import InfoTab from './include/tab/InfoTab';
import SettingTab from './include/tab/SettingTab'
import {UserService} from "../../services/userService";


const UserPage = (props) => {
    let username = props.match.params.username;

    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const currentUserData = useSelector(state => state.user)

    useEffect(() => {
        const fetchData = async() => {
            const response = await UserService.getUser(username)
            if (response.status === 200 && response.data.length === 1) setUser(response.data[0])
        }
        fetchData()
    }, [username])

    useEffect(() => {
        if (user?.id) dispatch(fetchGettingFriendRequest(user.id))
    }, [user])

    if (user && currentUserData) {
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

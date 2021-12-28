import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../App.css';
import { findUserAndGetData, getCurrentUserData } from '../../services/service';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import PostList from '../soc-ui/include/post/PostList';

import SwitchMenu from './include/menu/SwitchMenu';
import InfoTab from './include/tab/InfoTab';
import SettingTab from './include/tab/SettingTab'


const UserPage = (props) => {
    let username = props.match.params.username;

    const [user, setUser] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [isAuth, setIsAuth] = useState()

    useEffect(() => {
        findUserAndGetData(username)
            .then((result) => {
                setUser(result)
            })
    }, [])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setCurrentUser(result.info)
                setIsAuth(result.isAuth)
            })
    }, [])

    if (user && currentUser !== undefined) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <div className="container">
                    <SwitchMenu/>
                    <div className="tab-content">
                        {"\n"}
                        <InfoTab
                            user={user}
                            currentUser={currentUser}
                         />
                        <SettingTab/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header isAuth={isAuth}/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default UserPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../App.css';
import { findUserAndGetData } from '../../services/service';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import SwitchMenu from './include/menu/SwitchMenu';
import InfoTab from './include/tab/InfoTab';
import SettingTab from './include/tab/SettingTab'


const UserPage = (props) => {
    let username = props.match.params.username;
    const [user, setUser] = useState()

    useEffect(() => {
        findUserAndGetData(username)
            .then((result) => {
                setUser(result)
            })
    }, [])


    if (user) {
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

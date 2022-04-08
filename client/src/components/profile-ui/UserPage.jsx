import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {fetchGettingFriendRequest} from '../../store/friend/actions';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import SwitchMenu from './include/menu/SwitchMenu';
import InfoTab from './include/tab/InfoTab';
import SettingTab from './include/tab/SettingTab'
import {UserService} from "../../services/userService";
import {fetchGettingListPost} from "../../store/content/actions";
import {SET_FETCHING} from "../../store/content/actionTypes";


const UserPage = (props) => {
    let username = props.match.params.username;

    const dispatch = useDispatch()
    const postListData = useSelector((state) => state.post.list)
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

    useEffect(() => {
        if (postListData.fetching && postListData !== -1 && user?.id) {
            let params = {
                user__id: user.id,
                page: postListData.page
            }
            dispatch(fetchGettingListPost(params))
        }
    }, [postListData.fetching, user])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000 &&
            postListData.page !== -1
        ) {
            dispatch({
                type: SET_FETCHING,
                payload: {
                    fetching: true
                }
            })
        }
    }

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

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
import Spinner from "../extend/Spinner";


const UserPage = (props) => {
    let username = props.match.params.username;

    const dispatch = useDispatch()
    const postListData = useSelector((state) => state.post.list)
    const [user, setUser] = useState({
        value: null,
        statusCode: null
    })

    useEffect(() => {
        const fetchData = async() => {
            const response = await UserService.getUser(username)
            setUser({
                value: response.status === 200 ? response.data[0] : null,
                statusCode: response.status
            })
        }
        fetchData()
    }, [username])

    useEffect(() => {
        if (user.value?.id) dispatch(fetchGettingFriendRequest(user.value.id))
    }, [user])

    useEffect(() => {
        if (postListData.fetching && postListData !== -1 && user.value?.id) {
            let params = {
                user__id: user.value.id,
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

    if (user.value) {
        return (
            <div>
                <Header/>
                <div className="container">
                    <SwitchMenu/>
                    <div className="tab-content">
                        {"\n"}
                        <InfoTab user={user.value}/>
                        <SettingTab/>
                    </div>
                </div>
            </div>
        )
    } else if (!user.value && !user.statusCode) {
        return (
            <div>
                <Header/>
                <Spinner/>
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

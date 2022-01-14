import React, {useEffect, useState} from "react";
import {findUserAndGetData} from "../../services/service";
import axios from "axios";
import Error404NotFound from "../extend/Error404NotFound";
import Header from "../extend/Header";
import {UserI} from "../../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {fetchGettingAllUserFriends} from "../../store/friend/actions";
import FriendList from "./include/friend/FriendList";


const FriendListUser = (props) => {
    const username = props.match.params.username;

    const dispatch = useDispatch()
    const friendListData = useSelector((state: any) => state.friendList)

    const [user, setUser] = useState<UserI>()


    useEffect(() => {
        if (user) {
            dispatch(fetchGettingAllUserFriends(user.id))
        }
    }, [dispatch, user])

    useEffect(() => {
        findUserAndGetData(username)
            .then((result) => {
                setUser(result)
            })
    }, [username])


    if (friendListData.status >= 400 && friendListData.status < 600) {
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
                <div className="container">
                    <FriendList user={user}/>
                </div>
            </div>
        )
    }
}

export default FriendListUser;

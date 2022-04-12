import React, {useEffect, useState} from "react";
import Error404NotFound from "../extend/Error404NotFound";
import Header from "../extend/Header";
import {useDispatch, useSelector} from "react-redux";
import {fetchGettingAllUserFriends} from "../../store/friend/actions";
import FriendList from "./include/friend/FriendList";
import {UserService} from "../../services/userService";
import Spinner from "../extend/Spinner";


const FriendListUser = (props) => {
    const username = props.match.params.username;

    const dispatch = useDispatch()
    const friendListData = useSelector((state: any) => state.friendList)

    const [user, setUser] = useState({
        value: null,
        statusCode: null
    })

    useEffect(() => {
        const fetchData =  async() => {
            const response = await UserService.getUser(username)
            setUser({
                value: response.status === 200 ? response.data[0] : null,
                statusCode: response.status
            })
        }
        fetchData()
    }, [username])

    useEffect(() => {
        if (user.value) dispatch(fetchGettingAllUserFriends(user.value.id));
    }, [dispatch, user])

    if (user.value) {
        return (
            <div>
                <Header/>
                    <div className="container">
                        <FriendList user={user.value}/>
                    </div>
                </div>
        )
    } else if (!user.statusCode) {
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

export default FriendListUser;

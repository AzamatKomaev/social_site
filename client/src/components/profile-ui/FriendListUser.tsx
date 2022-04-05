import React, {useEffect, useState} from "react";
import {findUserAndGetData} from "../../services/service";
import Error404NotFound from "../extend/Error404NotFound";
import Header from "../extend/Header";
import {UserI} from "../../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {fetchGettingAllUserFriends} from "../../store/friend/actions";
import FriendList from "./include/friend/FriendList";
import {UserService} from "../../services/userService";


const FriendListUser = (props) => {
    const username = props.match.params.username;

    const dispatch = useDispatch()
    const friendListData = useSelector((state: any) => state.friendList)

    const [user, setUser] = useState<UserI | null>()

    useEffect(() => {
        const fetchData =  async() => {
            const response = await UserService.getUser(username)
            setUser(response.status === 200 && response.data.length > 0 ? response.data[0] : null)
        }
        fetchData()
    }, [username])

    useEffect(() => {
        if (user) dispatch(fetchGettingAllUserFriends(user.id));
    }, [dispatch, user])

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

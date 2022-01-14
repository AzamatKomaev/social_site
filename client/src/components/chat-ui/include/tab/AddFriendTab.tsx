import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import FriendList from '../friend/FriendList';
import {fetchGettingAllUserFriends} from "../../../../store/friend/actions";




const AddFriendTab = (props: any) => {
    const dispatch = useDispatch()

    const currentUserData = useSelector((state: any) => state.user)
    const friendListData = useSelector((state: any) => state.friendList)

    useEffect(() => {
        if (currentUserData.isAuth) {
            dispatch(fetchGettingAllUserFriends(currentUserData.info.id))
        }
    }, [dispatch, currentUserData])


    if (friendListData.list.length > 0 && currentUserData.isAuth) {
        return (
            <div className="tab-pane fade" id="friend-tab" role="tabpanel" aria-labelledby="nav-home-tab">
                <FriendList chatData={props.chatData}/>
            </div>
        )
    } else {
        return (
            <div className="tab-pane fade" id="friend-tab" role="tabpanel" aria-labelledby="nav-home-tab">
                You don't have friends.
            </div>
        )
    }
}

export default AddFriendTab;
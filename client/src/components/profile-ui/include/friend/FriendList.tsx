import React from "react";
import {useSelector} from "react-redux";
import FriendCell from "../cell/FriendCell";


const FriendList = ({user}) => {
    const friendListData = useSelector((state: any) => state.friendList)

    if (friendListData && friendListData.list.length > 0) {
        return (
            <div>
                {friendListData.list.map((friend) => (
                    <FriendCell key={friend.id} friend={friend} user={user}/>
                ))}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default FriendList;

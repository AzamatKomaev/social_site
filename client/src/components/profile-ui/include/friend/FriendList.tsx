import React from "react";
import {useSelector} from "react-redux";
import FriendCell from "../cell/FriendCell";


const FriendList = (props) => {
    const friendListData = useSelector((state: any) => state.friendList)

    if (friendListData && friendListData.list.length > 0) {
        return (
            <div>
                {friendListData.list.map((friend) => (
                    <FriendCell key={friend.id} friend={friend} user={props.user}/>
                ))}
            </div>
        )
    } else {
        return (
            <div style={{textAlign: "center"}}>
                <b>This user doesnt have friends.</b>
            </div>
        )
    }
}

export default FriendList;

import React from 'react';
import Friend from './Friend';
import {useSelector} from "react-redux";


const FriendList = ({chatData, service}) => {
    const friendListData = useSelector((state: any) => state.friendList)

    return (
        <div className="container" style={{padding: "10px"}}>
            {friendListData.list.map((friend) => (
                <Friend friendData={friend} chatData={chatData} service={service}/>
            ))}
        </div>
    )
}

export default FriendList;

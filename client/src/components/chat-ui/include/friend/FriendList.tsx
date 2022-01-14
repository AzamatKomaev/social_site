import React, {useEffect} from 'react';
import Friend from './Friend';
import {useSelector} from "react-redux";


const FriendList = () => {
    const friendListData = useSelector((state: any) => state.friendList)
    const chatRed = useSelector((state: any) => state.requestList)

    useEffect(() => {
        console.log(chatRed)
    }, [])

    return (
        <div className="container" style={{padding: "10px"}}>
            {friendListData.list.map((friend) => (
                <Friend friendData={friend}/>
            ))}
        </div>
    )
}

export default FriendList;

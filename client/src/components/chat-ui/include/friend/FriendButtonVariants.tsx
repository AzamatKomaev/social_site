import React from "react";
import {useSelector} from "react-redux";
import {GroupChatRequestI} from "../../../../interfaces";


const getRequestIfExist = (groupRequestList: Array<GroupChatRequestI>, userId: number): GroupChatRequestI => {
    let groupRequest: GroupChatRequestI

    groupRequestList.forEach(request => {
        if (request.to_user === userId) groupRequest = request
    })

    return groupRequest
}


const FriendButtonVariants = (props) => {
    const chatRed = useSelector((state: any) => state.requestList)
    const friendListData = useSelector((state: any) => state.friendList)


    if (chatRed.requestList.find(req => req.to_user === props.friendData.id)) {
        return (
            <div>
                <button className="btn btn-danger">
                    Отозвать
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="btn btn-info">
                    Пригласить
                </button>
            </div>
        )
    }
}

export default FriendButtonVariants

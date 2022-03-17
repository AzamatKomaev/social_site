import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCreatingRequest,
    fetchDeletingRequest,
    fetchGettingAllChatMembers,
    fetchGettingAllChatRequest
} from "../../../../store/chat/actions";
import friend from "./Friend";
import {fetchGettingAllUserFriends} from "../../../../store/friend/actions";


const FriendButtonVariants = ({friendData, chatData, service}) => {
    const chatRed = useSelector((state: any) => state.requestList)
    const currentUserData = useSelector((state: any) => state.user)

    const dispatch = useDispatch()

    const handleCreateRequestButton = () => {
        dispatch(fetchCreatingRequest(friendData.id, service))
    }

    const handleDeleteRequestButton = () => {
        dispatch(fetchDeletingRequest(friendData.id, service))
    }

    if (chatRed.requestList.find(req => req.to_user.id === friendData.id && !req.is_accepted)) {
        return (
            <div>
                <button className="btn btn-warning" onClick={handleDeleteRequestButton}>
                    Отозвать
                </button>
            </div>
        )
    } else if (chatRed.requestList.find(req => req.to_user.id === friendData.id && req.is_accepted)) {
        return (
            <div>
                <button className="btn btn-danger" onClick={handleDeleteRequestButton}>
                    Удалить
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="btn btn-info" onClick={handleCreateRequestButton}>
                    Пригласить
                </button>
            </div>
        )
    }
}

export default FriendButtonVariants

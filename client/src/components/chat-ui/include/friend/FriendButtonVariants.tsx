import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCreatingRequest, fetchDeletingRequest} from "../../../../store/chat/actions";


const FriendButtonVariants = (props) => {
    const chatRed = useSelector((state: any) => state.requestList)
    const dispatch = useDispatch()

    const handleCreateRequestButton = () => {
        dispatch(fetchCreatingRequest(props.chatData.data.id, props.friendData.id))
    }

    const handleDeleteRequestButton = () => {
        dispatch(fetchDeletingRequest(props.chatData.data.id, props.friendData.id))
    }

    if (chatRed.requestList.find(req => req.to_user.id === props.friendData.id && !req.is_accepted)) {
        return (
            <div>
                <button className="btn btn-warning" onClick={() => handleDeleteRequestButton()}>
                    Отозвать
                </button>
            </div>
        )
    } else if (chatRed.requestList.find(req => req.to_user.id === props.friendData.id && req.is_accepted)) {
        return (
            <div>
                <button className="btn btn-danger" onClick={() => handleDeleteRequestButton()}>
                    Удалить
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="btn btn-info" onClick={() => handleCreateRequestButton()}>
                    Пригласить
                </button>
            </div>
        )
    }
}

export default FriendButtonVariants

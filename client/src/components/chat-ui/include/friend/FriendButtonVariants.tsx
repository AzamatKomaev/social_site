import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCreatingRequest,
    fetchDeletingRequest
} from "../../../../store/chat/actions";


const FriendButtonVariants = ({friendData, service}) => {
    const chatRed = useSelector((state: any) => state.requestList)

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
                <button style={{fontSize: "10pt"}} className="btn btn-warning" onClick={handleDeleteRequestButton}>
                    Отозвать
                </button>
            </div>
        )
    } else if (chatRed.requestList.find(req => req.to_user.id === friendData.id && req.is_accepted)) {
        return (
            <div>
                <button style={{fontSize: "10pt"}} className="btn btn-danger" onClick={handleDeleteRequestButton}>
                    Удалить
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button style={{fontSize: "10pt"}} className="btn btn-info" onClick={handleCreateRequestButton}>
                    Пригласить
                </button>
            </div>
        )
    }
}

export default FriendButtonVariants

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteFriendRequestFromList,
    fetchDeletingFriendRequest,
    fetchPatchingFriendRequest
} from "../../../../../../store/friend/actions";

const AcceptDeleteButtons = ({notification, acceptButtonStyles, deleteButtonStyles}) => {
    const fromUserData = notification.from_user;
    const dispatch = useDispatch()
    const friendRequest = useSelector((state: any) => state.friendRequest)

    const handleAcceptFriendRequest = () => {
        dispatch(fetchPatchingFriendRequest(fromUserData.id, 1))
        dispatch(deleteFriendRequestFromList(friendRequest.list, fromUserData.id))
    }

    const handleDeleteFriendRequest = () => {
        dispatch(fetchDeletingFriendRequest(fromUserData.id))
        dispatch(deleteFriendRequestFromList(friendRequest.list, fromUserData.id))
    }

    return (
        <>
            <button className="btn btn-primary" style={acceptButtonStyles} onClick={handleAcceptFriendRequest}>
                Принять
            </button>
            <button className="btn btn-warning" style={deleteButtonStyles} onClick={handleDeleteFriendRequest}>
                Отклонить
            </button>
        </>
    );
};

export default AcceptDeleteButtons;
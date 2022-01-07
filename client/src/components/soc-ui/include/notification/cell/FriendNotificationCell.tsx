import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    fetchDeletingFriendRequest,
    fetchPatchingFriendRequest,
    deleteFriendRequestFromList
} from '../../../../../store/friend/actions';


const FriendNotificationCell = (props: any) => {
    const fromUserData = props.notification.from_user;
    const dispatch = useDispatch()
    const friendRequest = useSelector(state => state.friend)

    const handleAcceptFriendRequest = () => {
        dispatch(fetchPatchingFriendRequest(fromUserData.id, 1))
        dispatch(deleteFriendRequestFromList(friendRequest.list, fromUserData.id))
    }

    const handleDeleteFriendRequest = () => {
        dispatch(fetchDeletingFriendRequest(fromUserData.id))
        dispatch(deleteFriendRequestFromList(friendRequest.list, fromUserData.id))
    }

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={fromUserData.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                    />
                    <div className="flex-grow-1 ml-3">
                        <a href={"/users/" + fromUserData.username + "/"}>
                            <p style={{fontSize: "14pt"}}>{fromUserData.username}</p>
                        </a>
                        <div className="small" style={{marginTop: "-15px"}}>
                            <p className="text-info">{fromUserData.group_data.name}</p>
                            <u>Почта: </u>{" " + fromUserData.email}
                        </div>
                    </div>
                    <div className="d-none d-lg-block" style={{marginLeft: "auto"}}>
                        <button className="btn btn-primary" onClick={handleAcceptFriendRequest}>
                            Принять
                        </button>
                        <button className="btn btn-warning" style={{marginLeft: "10px"}} onClick={handleDeleteFriendRequest}>
                            Отклонить
                        </button>
                    </div>
                    <div className="d-none d-sm-block d-lg-none" style={{marginLeft: "auto"}}>
                        <button className="btn btn-primary" style={{width: "100%"}} onClick={handleAcceptFriendRequest}>
                            Принять
                        </button>
                        <button className="btn btn-warning" style={{width: "100%"}} onClick={handleDeleteFriendRequest}>
                            Отклонить
                        </button>
                    </div>
                </div>
                <div className="d-none d-block d-sm-none" style={{marginTop: "10px"}}>
                    <center>
                        <button className="btn btn-primary" style={{width: "75%"}} onClick={handleAcceptFriendRequest}>
                            Принять
                        </button>
                        <button className="btn btn-warning" style={{width: "75%"}} onClick={handleDeleteFriendRequest}>
                            Отклонить
                        </button>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default FriendNotificationCell;

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    fetchDeletingFriendRequest,
    fetchPatchingFriendRequest,
    deleteFriendRequestFromList
} from '../../../../../store/friend/actions';
import {UserFrontPath} from "../../../../../frontpaths/frontPath";
import AcceptDeleteButtons from "./buttons/AcceptDeleteButtons";


const FriendNotificationCell = (props: any) => {
    const fromUserData = props.notification.from_user;
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
        <div className="card col-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={fromUserData.avatar.image}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="53"
                        height="53"
                        style={{marginLeft: "-10px"}}
                    />
                    <div className="flex-grow-1 ms-3" style={{fontSize: "10pt"}}>
                        <a
                            href={UserFrontPath.userDetail(fromUserData.username)}
                            className="text-dark"
                            style={{textDecoration: "none"}}>
                            <p>{fromUserData.username}</p>
                        </a>
                        <div style={{marginTop: "-15px"}}>
                            <p className="text-info">{fromUserData.group_data.name}</p>
                        </div>
                    </div>
                    <div className="d-none d-lg-block" style={{marginLeft: "auto"}}>
                        <AcceptDeleteButtons
                            notification={props.notification}
                            acceptButtonStyles={{fontSize: "10pt"}}
                            deleteButtonStyles={{marginLeft: "10px", fontSize: "10pt"}}
                        />
                    </div>
                    <div className="d-none d-sm-block d-lg-none" style={{marginLeft: "auto"}}>
                        <AcceptDeleteButtons
                            notification={props.notification}
                            acceptButtonStyles={{width: "100%", fontSize: "10pt"}}
                            deleteButtonStyles={{width: "100%", fontSize: "10pt"}}
                        />
                    </div>
                </div>
                <div className="d-sm-none" style={{marginTop: "15px"}}>
                    <div style={{textAlign: "center"}}>
                        <AcceptDeleteButtons
                            notification={props.notification}
                            acceptButtonStyles={{width: "90%", fontSize: "10pt"}}
                            deleteButtonStyles={{width: "90%", fontSize: "10pt"}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendNotificationCell;

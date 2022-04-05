import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserFromFriendList, fetchDeletingUserFromFriendList} from "../../../../store/friend/actions";
import {UserFrontPath} from "../../../../frontpaths/frontPath";


const FriendCell = (props) => {
    const currentUserData = useSelector((state: any) => state.user)
    const friendListData = useSelector((state: any) => state.friendList)

    const dispatch = useDispatch()

    const handleDeleteUserFromFriendList = () => {
        dispatch(fetchDeletingUserFromFriendList(props.friend.id))
        dispatch(deleteUserFromFriendList(friendListData.list, props.friend.id))
    }

    return (
        <div className="card col-10 col-md-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start">
                    <img
                        src={props.friend.avatar.image}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="53"
                        height="53"
                    />
                    <div className="flex-grow-1 ms-3" style={{fontSize: "10pt"}}>
                        <a
                            href={UserFrontPath.userDetail(props.friend.username)}
                            style={{textDecoration: "none"}}
                            className="text-dark">
                            <p>{props.friend.username}</p>
                        </a>
                        <div style={{marginTop: "-15px"}}>
                            <p className="text-info">{props.friend.group_data.name}</p>
                        </div>
                    </div>
                    {currentUserData?.info?.id === props.user.id
                        ?
                        <div style={{marginLeft: "auto"}} className="d-none d-lg-block">
                            <button style={{fontSize: "10pt"}} className="btn btn-danger" onClick={handleDeleteUserFromFriendList}>
                                Удалить
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
                {currentUserData?.info?.id === props.user.id
                    ?
                    <div className="d-lg-none">
                        <button
                            className="btn btn-danger"
                            style={{marginTop: "10px", width: "100%", fontSize: "10pt"}}
                            onClick={handleDeleteUserFromFriendList}
                        >
                            Удалить
                        </button>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default FriendCell;

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserFromFriendList, fetchDeletingUserFromFriendList} from "../../../../store/friend/actions";
import friendListUser from "../../FriendListUser";


const FriendCell = (props) => {
    const currentUserData = useSelector((state: any) => state.user)
    const friendListData = useSelector((state: any) => state.friendList)

    const dispatch = useDispatch()

    const handleDeleteUserFromFriendList = () => {
        dispatch(fetchDeletingUserFromFriendList(props.friend.id))
        dispatch(deleteUserFromFriendList(friendListData.list, props.friend.id))
    }

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.friend.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                    />
                    <div className="flex-grow-1 ml-3">
                        <a href={"/users/" + props.friend.username + "/"}>
                            <p style={{fontSize: "14pt"}}>{props.friend.username}</p>
                        </a>
                        <div className="small" style={{marginTop: "-15px"}}>
                            <p className="text-info">{props.friend.group_data.name}</p>
                            <u>Почта: </u>{" " + props.friend.email}
                        </div>
                    </div>
                    {currentUserData?.info?.id === props.user.id
                        ?
                        <div style={{marginLeft: "auto"}} className="d-none d-lg-block" onClick={handleDeleteUserFromFriendList}>
                            <button className="btn btn-danger">
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
                        <button className="btn btn-danger" style={{marginTop: "10px", width: "100%"}} onClick={() => fetchDeletingUserFromFriendList(props.friend.id)}>
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

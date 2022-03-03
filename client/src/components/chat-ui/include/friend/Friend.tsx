import React, {useEffect, useState} from 'react';
import FriendButtonVariants from "./FriendButtonVariants";
import {useDispatch, useSelector} from "react-redux";

const Friend = (props: any) => {
    const [userIsMember, setUserIsMember] = useState(false)

    const dispatch = useDispatch()

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <div
                className="list-group-item list-group-item-action border-0"
                >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.friendData.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <a href={"/users/" + props.friendData.username + "/"} className="flex-grow-1 ms-3 text-dark" style={{textDecoration: "none"}}>
                       <p style={{fontSize: "14pt"}}>{props.friendData.username}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">{props.friendData.group_data.name}</p>
                           <u>Почта: </u>{" " + props.friendData.email}
                       </div>
                    </a>
                    <div style={{marginLeft: "auto"}}>
                        <FriendButtonVariants friendData={props.friendData} chatData={props.chatData}/>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Friend;

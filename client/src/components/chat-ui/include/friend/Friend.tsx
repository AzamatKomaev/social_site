import React, {useEffect, useState} from 'react';
import FriendButtonVariants from "./FriendButtonVariants";
import {useDispatch, useSelector} from "react-redux";

const Friend = ({friendData, chatData, service}) => {
    return (
        <div className="card col-10 col-md-9 my-3 mx-auto border border-primary">
            <div
                className="list-group-item list-group-item-action border-0"
                >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={friendData.avatar.image}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <a href={"/users/" + friendData.username + "/"} className="flex-grow-1 ms-3 text-dark" style={{textDecoration: "none"}}>
                       <p style={{fontSize: "14pt"}}>{friendData.username}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">{friendData.group_data.name}</p>
                           <u>Почта: </u>{" " + friendData.email}
                       </div>
                    </a>
                    <div className="d-none d-sm-block" style={{marginLeft: "auto"}}>
                        <FriendButtonVariants friendData={friendData} chatData={chatData} service={service}/>
                   </div>
                </div>
                <div className="d-sm-none" style={{margin: "0 auto", width: "85%"}}>
                    <FriendButtonVariants friendData={friendData} chatData={chatData} service={service}/>
               </div>
            </div>
        </div>
    )
}

export default Friend;

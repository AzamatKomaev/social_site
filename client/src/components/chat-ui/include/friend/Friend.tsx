import React from 'react';
import FriendButtonVariants from "./FriendButtonVariants";
import {UserFrontPath} from "../../../../frontpaths/frontPath";

const Friend = ({friendData, service}) => {
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
                        width="53"
                        height="53"
                        style={{marginLeft: "-10px"}}
                     />
                    <a
                        href={UserFrontPath.userDetail(friendData.username)}
                        className="flex-grow-1 ms-3 text-dark"
                        style={{textDecoration: "none", fontSize: "10pt"}}
                    >
                       <p>{friendData.username}</p>
                       <div style={{marginTop: "-15px"}}>
                           <p className="text-info">{friendData.group_data.name}</p>
                       </div>
                    </a>
                    <div className="d-none d-sm-block" style={{marginLeft: "auto"}}>
                        <FriendButtonVariants friendData={friendData} service={service}/>
                   </div>
                </div>
                <div className="d-sm-none" style={{margin: "0 auto", width: "85%"}}>
                    <FriendButtonVariants friendData={friendData} service={service}/>
               </div>
            </div>
        </div>
    )
}

export default Friend;

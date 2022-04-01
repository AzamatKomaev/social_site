import React from 'react';
import {UserFrontPath} from "../../../../frontpaths/frontPath";



const UserCell = (props: any) => {
    return (
        <div>
            {props.users.map((user) => (
                <a href={UserFrontPath.userDetail(user.username)} className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                        <img
                            src={user.user_data.avatar.image}
                            className="rounded-circle ms-1"
                            alt="..."
                            width="40"
                            height="40"/>
                        <div className="flex-grow-1 ms-3" style={{fontSize: "11pt"}}>
                            {user.user_data.username}
                            <div className="small"><span className="fas fa-circle chat-offline"></span>{user.name}</div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default UserCell;

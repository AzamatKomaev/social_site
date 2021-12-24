import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserCell = (props: any) => {
    return (
        <div>
            {props.users.map((user) => (
                <a href={"/users/" + user.username + "/"} className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                        <img src={user.avatar.image} className="rounded-circle mr-1" alt="..." width="40" height="40"/>
                        <div className="flex-grow-1 ml-3">
                            {user.username}
                            <div className="small"><span className="fas fa-circle chat-offline"></span>Online</div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default UserCell;

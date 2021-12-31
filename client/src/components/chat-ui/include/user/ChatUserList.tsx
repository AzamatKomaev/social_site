import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserCell from './UserCell';


interface ChatUserListI {
    users: object[]
}

const ChatUserList = (props: ChatUserListI) => {
    return (
        <div className="col-12 col-lg-5 col-xl-3 d-none d-lg-block border-right">
            <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <input type="text" className="form-control my-3" placeholder="Search..."/>
                    </div>
                </div>
            </div>
            <UserCell users={props.users}/>
        </div>
    )
}

export default ChatUserList;

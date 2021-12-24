import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ChatHeader = (props: any) => {
    return (
        <div className="py-2 px-4 border-bottom  d-lg-block">
            <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                    <img src={props.avatar} className="rounded-circle mr-1" alt="..." width="50" height="50"/>
                </div>
                <div className="flex-grow-1 pl-3">
                    <strong>{props.name}</strong>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;

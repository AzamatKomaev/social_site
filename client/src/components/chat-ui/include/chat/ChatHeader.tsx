import React from 'react';

import 'simple-line-icons';


const ChatHeader = (props: any) => {
    return (
        <div className="py-2 px-4 border-bottom  d-lg-block">
            <a
                href={props.type_is_group ? `/chats/group/${props.id}/settings/` : `/users/${props.name}/`}
                className="d-flex align-items-center py-1 text-dark" style={{textDecoration: "none"}}>
                <div className="position-relative">
                    <img src={props.avatar} className="rounded-circle mr-1" alt="..." width="50" height="50"/>
                </div>
                <div className="flex-grow-1 pl-3">
                    <strong>{props.name}</strong>
                </div>
            </a>
        </div>
    )
}

export default ChatHeader;

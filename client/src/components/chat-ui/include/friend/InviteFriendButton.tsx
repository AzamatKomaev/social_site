import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const InviteFriendButton = (props: any) => {
    return (
        <button className="btn btn-info">
            {props.children}
        </button>
    )
}


export default InviteFriendButton;

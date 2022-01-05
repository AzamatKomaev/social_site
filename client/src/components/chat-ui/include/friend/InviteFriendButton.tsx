import React from 'react';



const InviteFriendButton = (props: any) => {
    return (
        <button className="btn btn-info">
            {props.children}
        </button>
    )
}


export default InviteFriendButton;

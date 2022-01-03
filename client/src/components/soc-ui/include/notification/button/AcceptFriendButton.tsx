import React from 'react';
import axios from 'axios';

import { patchFriendRequest } from '../../../../services/friendRequestService';


const AcceptFriendButton = (props: any) => {
    const handleAcceptFriendRequest


    return (
        <div>
            <button className="btn btn-primary" onClick={handleAcceptFriendRequest}>
                Принять
            </button>
        </div>
    )
}

export default AcceptFriendButton

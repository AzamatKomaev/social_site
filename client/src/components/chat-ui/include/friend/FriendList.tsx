import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Friend from './Friend';



const FriendList = (props: any) => {
    return (
        <div className="container" style={{padding: "10px"}}>
            {props.friends.map((friend) => (
                <Friend friendData={friend}/>
            ))}
        </div>
    )
}

export default FriendList;

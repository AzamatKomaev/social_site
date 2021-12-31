import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Friend = (props: any) => {
    return (
        <div className="card">
            <p>{props.friendData.username}</p>
            <img src={props.friendData.avatar.image} alt="" width="100"/>
        </div>
    )
}

export default Friend;

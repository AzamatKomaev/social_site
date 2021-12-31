import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../App.css';

import InviteFriendButton from './InviteFriendButton';


const Friend = (props: any) => {
    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href={"/users/" + props.friendData.username + "/"}
                className="list-group-item list-group-item-action border-0"
                >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.friendData.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ml-3">
                       <p style={{fontSize: "14pt"}}>{props.friendData.username}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">{props.friendData.group_data.name}</p>
                           <u>Почта: </u>{" " + props.friendData.email}
                       </div>
                    </div>
                    <div style={{marginLeft: "auto"}}>
                        <InviteFriendButton friendData={props.friendData}>
                            Пригласить.
                        </InviteFriendButton>
                   </div>
                </div>
            </a>
        </div>
    )
}

export default Friend;

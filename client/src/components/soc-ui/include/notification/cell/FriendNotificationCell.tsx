import React from 'react';


const FriendNotificationCell = (props: any) => {
    const fromUserData = props.notification.from_user;


    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href={"/users/" + fromUserData.username + "/"}
                className="list-group-item list-group-item-action border-0"
             >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={fromUserData.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ml-3">
                       <p style={{fontSize: "14pt"}}>{fromUserData.username}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">{fromUserData.group_data.name}</p>
                           <u>Почта: </u>{" " + fromUserData.email}
                       </div>
                    </div>
                    <div style={{marginLeft: "auto"}}>
                        <button>
                            Принять
                        </button>
                   </div>
                </div>
            </a>
        </div>
    )
}

export default FriendNotificationCell;

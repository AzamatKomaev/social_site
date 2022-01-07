import React from 'react';


const ChatNotificationTab = (props: any) => {
    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href="#"
                className="list-group-item list-group-item-action border-0"
                >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.chatData.avatar}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ml-3">
                       <p style={{fontSize: "14pt"}}>{props.chatData.name}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">pass</p>
                           pass
                       </div>
                    </div>
                    <div style={{marginLeft: "auto"}}>
                        <button>
                            Вступить
                        </button>
                        <button>
                            Отклонить
                        </button>
                   </div>
                </div>
            </a>
        </div>
    )
}

export default FriendNotificationCell;
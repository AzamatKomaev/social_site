import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchAcceptingChatRequest, fetchDeletingChatRequestNotification} from "../../../../../store/user/actions";
import ChatCellButtons from "./ChatCellButtons";
import {GroupChatService} from "../../../../../services/chatServices";


const ChatNotificationCell = (props: any) => {
    const [service, setService] = useState<GroupChatService>()

    useEffect(() => {
        if (props.notification?.from_chat) setService(new GroupChatService(props.notification.from_chat.id))
    }, [props.notification])

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href="#"
                className="list-group-item list-group-item-action border-0"
            >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.notification.from_chat.avatar}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ms-3">
                       <p style={{fontSize: "14pt"}}>{props.notification.from_chat.name}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">Участников: {props.notification.from_chat.members_count}</p>
                           pass
                       </div>
                    </div>
                    <div className="d-none d-lg-block" style={{marginLeft: "auto"}}>
                        <ChatCellButtons notification={props.notification} size={"lg-block"} service={service}/>
                    </div>
                    <div className="d-none d-sm-block d-lg-none" style={{marginLeft: "auto"}}>
                        <ChatCellButtons notification={props.notification} size={"sm-block"} service={service}/>
                    </div>
                </div>
                <div className="d-block d-sm-none" style={{marginTop: "10px"}}>
                    <ChatCellButtons notification={props.notification} size={"sm-none"} service={service}/>
                </div>
            </a>
        </div>
    )
}

export default ChatNotificationCell;

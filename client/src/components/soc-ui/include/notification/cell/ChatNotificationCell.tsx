import React from 'react';
import {useDispatch} from "react-redux";
import {fetchAcceptingChatRequest} from "../../../../../store/user/actions";

const ChatNotificationCell = (props: any) => {
    const dispatch = useDispatch()

    const handleAcceptChatRequestButton = () => {
        dispatch(fetchAcceptingChatRequest(props.notification.from_chat.id))
    }

    const handleDeleteChatRequestButton = () => {

    }

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href="#"
                className="list-group-item list-group-item-action border-0"
            >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.notification.from_chat.avatar}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ml-3">
                       <p style={{fontSize: "14pt"}}>{props.notification.from_chat.name}</p>
                       <div className="small" style={{marginTop: "-15px"}}>
                           <p className="text-info">pass</p>
                           pass
                       </div>
                    </div>
                    <div className="d-none d-lg-block" style={{marginLeft: "auto"}}>
                        <button className="btn btn-primary" onClick={() => handleAcceptChatRequestButton()}>
                            Вступить
                        </button>
                        <button className="btn btn-danger" style={{marginLeft: "10px"}}>
                            Отклонить
                        </button>
                    </div>
                    <div className="d-none d-sm-block d-lg-none" style={{marginLeft: "auto"}}>
                        <button className="btn btn-primary" style={{width: "100%"}} onClick={() => handleAcceptChatRequestButton()}>
                            Вступить
                        </button>
                        <button className="btn btn-danger" style={{width: "100%"}}>
                            Отклонить
                        </button>
                    </div>
                </div>
                <div className="d-none d-block d-sm-none" style={{marginTop: "10px"}}>
                    <div style={{textAlign: "center"}}>
                        <button className="btn btn-primary" style={{width: "75%"}} onClick={() => handleAcceptChatRequestButton()}>
                            Вступить
                        </button>
                        <button className="btn btn-danger" style={{width: "75%"}}>
                            Отклонить
                        </button>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default ChatNotificationCell;
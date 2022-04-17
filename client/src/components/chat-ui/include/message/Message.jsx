import React from 'react';
import '../style.css';
import { getReadableDateFormat } from '../../../../services/service';
import {UserFrontPath} from "../../../../frontpaths/frontPath";


const Message = (props) => {
    if (props?.message?.user_data) {
        return (
            <div>
                {props.currentUserData.info.id === props.message.user_data.id
                ?
                    <div
                        className="chat-message-right pb-4"
                        style={{width: "85%"}}
                    >
                        <div>
                            <img src={props.message.user_data.avatar === null ? 'another' : props.message.user_data.avatar} className="rounded-circle ms-1" alt="you" width="40" height="40"/>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 me-2" style={{fontSize: "10pt"}}>
                            <div className="font-weight-bold mb-1"><a href="#" style={{textDecoration: "none", color: "black"}}>Вы</a></div>
                            {props.message.text}
                            <div className="text-muted small text-nowrap mt-2">{getReadableDateFormat(props.message.created_at)}</div>
                        </div>
                    </div>
                :
                    <div
                        className="chat-message-left pb-4"
                        style={{width: "85%"}}>
                        <div>
                            <img src={props.message.user_data.avatar === null ? 'another' : props.message.user_data.avatar} className="rounded-circle ms-1" alt="..." width="40" height="40"/>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ms-2" style={{fontSize: "10pt"}}>
                            <div className="font-weight-bold mb-1">
                                <a
                                    href={UserFrontPath.userDetail(props.message.user_data.username)}
                                    style={{textDecoration: "none", color: "black"}}
                                >{props.message.user_data.username}
                            </a>
                            </div>
                            {props.message.text}
                            <div className="text-muted small text-nowrap mt-2">{getReadableDateFormat(props.message.created_at)}</div>
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default Message;
import React from 'react';
import '../style.css';
import { getReadableDateFormat } from '../../../../services/service';


const Message = (props) => {
    if (props.message.user_data !== undefined) {
        return (
            <div>
                {props.currentUserData.id == props.message.user_data.id
                ?
                    <div className="chat-message-right pb-4" style={{width: "70%"}}>
                        <div>
                            <img src={props.message.user_data.avatar.image} className="rounded-circle mr-1" alt="you" width="40" height="40"/>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            <div className="font-weight-bold mb-1"><a href="#" style={{textDecoration: "none", color: "black"}}>Вы</a></div>
                            {props.message.text}
                            <div className="text-muted small text-nowrap mt-2">{getReadableDateFormat(props.message.created_at)}</div>
                        </div>
                    </div>
                :
                    <div className="chat-message-left pb-4" style={{width: "70%"}}>
                        <div>
                            <img src={props.message.user_data.avatar.image} className="rounded-circle mr-1" alt="..." width="40" height="40"/>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div className="font-weight-bold mb-1"><a href="#" style={{textDecoration: "none", color: "black"}}>{props.message.user_data.username}</a></div>
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
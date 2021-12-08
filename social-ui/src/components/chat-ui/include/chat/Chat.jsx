import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../../App.css';
import { getReadableDateFormat } from '../../../../services/service';


const Chat = (props) => {

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a href={"/chats/" + props.chat.id + "/"} className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img src={props.chat.avatar} className="rounded-circle mr-1" alt="lol" width="60" height="60" style={{marginLeft: "-10px"}}/>
                    <div className="flex-grow-1 ml-3" id={props.chat.id}>
                        <p style={{fontSize: "14pt", marginLeft: "-10px"}}>{props.chat.name}</p>
                        <div className="small" style={{marginTop: "-10px"}}>
                            <p >
                                {props.chat.last_message.text ?
                                <div>
                                    <b>{props.chat.last_message.user_data.username}</b>{"\n"}
                                    {props.chat.last_message.text.substr(0, 20) + "..."}{"\n"}
                                    {getReadableDateFormat(props.chat.last_message.created_at)}
                                </div>
                                :
                                <div>
                                    Нету сообщений
                                </div>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Chat;

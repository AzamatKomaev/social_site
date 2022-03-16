import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReadableDateFormat } from '../../../../services/service';


const Chat = (props) => {
    const [lastMessage, setLastMessage] = useState(props.chat.last_message)
    const userData = useSelector(state => state.user)


    console.log()
    return (
        <div className="card col-10 col-md-9 my-3 mx-auto border border-primary">
            <a
                href={props.type_is_group
                        ? "/chats/group/" + props.chat.id + "/"
                        : "/chats/personal/" + props.chat.interlocutor.username + "/"
                }
                className="list-group-item list-group-item-action border-0"
            >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.type_is_group ? props.chat.avatar : props.chat.interlocutor.avatar.image}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ms-3" id={props.chat.id}>
                        <p style={{fontSize: "14pt"}}>{props.type_is_group ? props.chat.name : props.chat.interlocutor.username}</p>
                        <div className="small" style={{marginTop: "-10px"}}>
                            <p>
                                {props.chat.last_message.text
                                ?
                                    <div>
                                        <b>
                                            {userData.info.id === props.chat.last_message.user_data.id ? "Вы" : props.chat.last_message.user_data.username}
                                        </b>{"\n"}
                                        {props.chat.last_message.text.substr(0, 20) + "..."}{"\n"}
                                        {getReadableDateFormat(props.chat.last_message.created_at)}
                                    </div>
                                :
                                    <div>
                                        Нет сообщений
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

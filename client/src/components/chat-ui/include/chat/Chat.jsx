import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReadableDateFormat } from '../../../../services/service';


const Chat = (props) => {
    const [lastMessage, setLastMessage] = useState(props.chat.last_message)
    const userData = useSelector(state => state)

    useEffect(() => {
        let ws = new WebSocket(
            props.type_is_group
                ? "ws://127.0.0.1:8000/ws/group_chat/" + props.chat.id + "/?token=" + localStorage.getItem("jwt") + "/"
                : "ws://127.0.0.1:8000/ws/personal_chat/" + props.chat.interlocutor.username + "/?token=" + localStorage.getItem("jwt") + "/"
        )

        ws.onopen = () => {
            console.log("opened")
        }

        ws.onclose = () => {
            console.log("closed")
        }

        ws.onmessage = (e) => {
            setLastMessage(JSON.parse(e.data))
            console.log(JSON.parse(e.data))
        }
    }, [])

    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <a
                href={props.type_is_group
                        ? "/chats/" + props.chat.id + "/"
                        : "/personal_chats/" + props.chat.interlocutor.username + "/"
                }
                className="list-group-item list-group-item-action border-0"
            >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.type_is_group ? props.chat.avatar : props.chat.interlocutor.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                     />
                    <div className="flex-grow-1 ml-3" id={props.chat.id}>
                        <p style={{fontSize: "14pt"}}>{props.type_is_group ? props.chat.name : props.chat.interlocutor.username}</p>
                        <div className="small" style={{marginTop: "-10px"}}>
                            <p >
                                {props.chat.last_message.text
                                ?
                                    <div>
                                        <b>
                                            {userData.info.id == lastMessage.user_data.id ? "Вы" : lastMessage.user_data.username}
                                        </b>{"\n"}
                                        {lastMessage.text.substr(0, 20) + "..."}{"\n"}
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

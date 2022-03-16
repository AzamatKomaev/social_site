import React from 'react';
import {useDispatch} from "react-redux";
import {fetchAcceptingChatRequest, fetchDeletingChatRequestNotification} from "../../../../../store/user/actions";

const ChatCellButtons = ({notification, size, service}) => {
    const dispatch = useDispatch()

    const handleAcceptChatRequestButton = () => {
        dispatch(fetchAcceptingChatRequest(notification.from_chat.id))
    }

    const handleDeleteChatRequestButton = () => {
        dispatch(fetchDeletingChatRequestNotification(notification.to_user.id, service))
    }

    if (size === "lg-block") {
        return (
            <div>
                <button
                    className="btn btn-primary"
                    style={{}}
                    onClick={() => handleAcceptChatRequestButton()}
                >
                    Вступить
                </button>
                <button
                    className="btn btn-danger"
                    style={{marginLeft: "10px"}}
                    onClick={() => handleDeleteChatRequestButton()}
                >
                    Отклонить
                </button>
            </div>
        )
    } else if (size === "sm-block") {
        return (
            <div>
                <button className="btn btn-primary" style={{width: "100%"}} onClick={() => handleAcceptChatRequestButton()}>
                    Вступить
                </button>
                <button className="btn btn-danger" style={{width: "100%"}} onClick={() => handleDeleteChatRequestButton()}>
                    Отклонить
                </button>
            </div>
        )
    } else if (size === "sm-none") {
        return (
            <div style={{textAlign: "center"}}>
                <button className="btn btn-primary" style={{width: "75%"}} onClick={() => handleAcceptChatRequestButton()}>
                    Вступить
                </button>
                <button className="btn btn-danger" style={{width: "75%"}} onClick={() => handleDeleteChatRequestButton()}>
                    Отклонить
                </button>
            </div>
        )
    } else {
        return (<div></div>)
    }
};

export default ChatCellButtons;
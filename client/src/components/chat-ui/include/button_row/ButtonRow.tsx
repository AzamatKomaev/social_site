import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    FILTER_CHATS_BY_STRING,
    SORT_CHATS_BY_LAST_MESSAGE,
    SORT_CHATS_BY_NAME
} from "../../../../store/chat/actionTypes";


const ButtonRow = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state: any) => state.user.info.id)

    const sortByName = () => {
        dispatch({type: SORT_CHATS_BY_NAME})
    }

    const sortByLastMessages = () => {
        dispatch({type: SORT_CHATS_BY_LAST_MESSAGE})
    }

    const clearFilteredChatList = () => {
        dispatch({
            type: FILTER_CHATS_BY_STRING,
            payload: {
                string: null
            }
        })
    }

    const buttons = [
        {
            onClick: sortByName,
            content: "По названию",
            className: "btn btn-outline-primary"
        },
        {
            onClick: sortByLastMessages,
            content: "По дате создания последнего сообщения",
            className: "btn btn-outline-primary"
        },
        {
            onClick: clearFilteredChatList,
            content: "Очистить резултат поиска",
            className: "btn btn-outline-warning"
        }
    ]

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            {buttons.map(button => (
                <button
                    type="button"
                    className={button.className}
                    style={{fontSize: "10pt"}}
                    onClick={button.onClick}
                >
                    {button.content}
                </button>
            ))}
        </div>
    );
};

export default ButtonRow;

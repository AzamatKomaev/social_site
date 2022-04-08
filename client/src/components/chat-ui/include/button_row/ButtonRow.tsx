import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SORT_CHATS_BY_LAST_MESSAGE, SORT_CHATS_BY_NAME} from "../../../../store/chat/actionTypes";


const ButtonRow = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state: any) => state.user.info.id)

    const sortByName = () => {
        dispatch({type: SORT_CHATS_BY_NAME})
    }

    const sortByLastMessages = () => {
        dispatch({type: SORT_CHATS_BY_LAST_MESSAGE})
    }

    const buttons = [
        {
            onClick: sortByName,
            content: "По названию"
        },
        {
            onClick: sortByLastMessages,
            content: "По дате создания последнего сообщения"
        }
    ]

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            {buttons.map(button => (
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{fontSize: "10pt"}}
                    onClick={button.onClick}
                >
                    {button.content}
                </button>
            ))}

            {/*<button type="button" className="btn btn-outline-primary" style={{fontSize: "10pt"}} onClick={sortByLastMessages}>С сообщениями</button>*/}
            {/*<button type="button" className="btn btn-outline-primary" style={{fontSize: "10pt"}} onClick={filterByEmptyMessages}>Без сообщений</button>*/}
        </div>
    );
};

export default ButtonRow;

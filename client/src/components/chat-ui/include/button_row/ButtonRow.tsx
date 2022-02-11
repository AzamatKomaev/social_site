import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    CLEAR_FILTERED_CHAT_LIST,
    FILTER_GROUP_CHAT_LIST_BY_EMPTY_MESSAGES, GET_CURRENT_USER_CHAT_LIST,
    GET_GROUP_CHAT_LIST,
    GET_GROUP_CHAT_LIST_WITH_MESSAGES,
    GET_GROUP_CHAT_LIST_WITHOUT_MESSAGES,
    SORT_GROUP_CHAT_LIST_BY_LAST_MESSAGES
} from "../../../../store/chat/actionTypes";


const ButtonRow = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state: any) => state.user.info.id)

    const filterByEmptyMessages = () => {
        dispatch({type: GET_GROUP_CHAT_LIST_WITHOUT_MESSAGES})
    }

    const sortByLastMessages = () => {
        dispatch({type: GET_GROUP_CHAT_LIST_WITH_MESSAGES})
    }

    const filterByCreatorUser = () => {
        dispatch({
            type: GET_CURRENT_USER_CHAT_LIST,
            payload: {
                userId: currentUserId
            }
        })
    }

    const reset = () => {
        dispatch({type: CLEAR_FILTERED_CHAT_LIST})
        dispatch({type: GET_GROUP_CHAT_LIST})
    }

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-primary" onClick={sortByLastMessages}>С сообщениями</button>
            <button type="button" className="btn btn-outline-primary" onClick={filterByEmptyMessages}>Без сообщений</button>
            <button type="button" className="btn btn-outline-primary" onClick={filterByCreatorUser}>Ваши</button>
            <button type="button" className="btn btn-outline-warning" onClick={reset}>Сбросить</button>
        </div>

    );
};

export default ButtonRow;

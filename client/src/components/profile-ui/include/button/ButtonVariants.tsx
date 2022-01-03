import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './style.css';
import {
    getFriendRequest,
    sendFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
} from '../../../../services/friendRequestService';


const ButtonVariants = (props: any) => {
    const [friendRequest, setFriendRequest] = useState({
        data: null,
        error: null
    })

    const handleSendFriendRequest = (e: any) => {
        sendFriendRequest(props.user)
            .then((result) => {
                setFriendRequest({
                    data: result.friendRequest,
                    error: result.error
                })
            })
    }

    const handleDeleteFriendRequest = (e: any) => {
        deleteFriendRequest(props.user)
            .then((result) => {
                if (result == 204) {
                    setFriendRequest({
                        data: null,
                        error: null
                    })
                }
            })
    }

    const handleAcceptFriendRequest = (e: any) => {
        patchFriendRequest(props.user, 1)
            .then((result) => {
                setFriendRequest({
                    data: result.friendRequest,
                    error: result.error
                })
            })
    }

    useEffect(() => {
        getFriendRequest(props.user)
            .then((result) => {
                setFriendRequest({
                    data: result.friendRequest,
                    error: result.error
                })
            })
    }, [])


    if (!props.isAuth) {
        return (
            <div>
                <a href="/auth/login/"  className="btn btn-outline-primary btn-block default-button">Хотите войти?</a>
            </div>
        )
    } else if (props.user.id == props.currentUser.id) {
        return (
            <div>
                <a href="/redac/" className="btn btn-outline-secondary btn-block default-button">Редактировать</a>
            </div>
        )
    } else if ((friendRequest.data) && (friendRequest.data.is_accepted == false) && (!friendRequest.error)) {
        return (
            <div>
                {friendRequest.data.to_user == props.user.id
                    ?
                        <button
                            type="button"
                            className="btn btn-warning default-button"
                            onClick={handleDeleteFriendRequest}
                            style={{width: "100%"}}
                         >
                            Отозвать запрос.
                        </button>
                    :
                        <button
                            type="button"
                            className="btn btn-success default-button"
                            onClick={handleAcceptFriendRequest}
                         >
                            Принять заявку в друзья.
                        </button>
                }
            </div>
        )
    } else if (props.currentUser.friends.indexOf(props.user.id) == -1) {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-block default-button"
                    onClick={handleSendFriendRequest}
                    style={{width: "100%"}}
                 >
                    Добавить в друзья.
                </button>
            </div>
        )
    } else if (props.currentUser.friends.indexOf(props.user.id) != -1) {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-block default-button"
                    onClick={handleDeleteFriendRequest}
                    style={{width: "100%"}}
                 >
                    Удалить из друзей.
                </button>
            </div>
        )
    } else {
        return (
            <div>
                Какая то дичь
            </div>
        )
    }
}

export default ButtonVariants;

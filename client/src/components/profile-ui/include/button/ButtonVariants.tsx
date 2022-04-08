import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchGettingFriendRequest,
    fetchSendingFriendRequest,
    fetchPatchingFriendRequest, fetchDeletingUserFromFriendList
} from '../../../../store/friend/actions';
import { fetchUserData } from '../../../../store/user/actions';
import {AuthFrontPath} from "../../../../frontpaths/frontPath";



const ButtonVariants = (props: any) => {
    const friendRequest = useSelector((state: any) => state.friendRequest)
    const currentUserData = useSelector((state: any) => state.user)
    const dispatch = useDispatch()


    const handleDeleteFriendRequest = () => {
        dispatch(fetchDeletingUserFromFriendList(props.user.id))
        dispatch(fetchGettingFriendRequest(props.user.id))
        dispatch(fetchUserData())
    }

    const handleAcceptFriendRequest = () => {
        dispatch(fetchPatchingFriendRequest(props.user.id, 1))
        dispatch(fetchGettingFriendRequest(props.user.id))
        dispatch(fetchUserData())
    }

    if (!currentUserData.isAuth) {
        return (
            <div>
                <a
                    href={AuthFrontPath.login()}
                    className="btn btn-outline-primary btn-block default-button"
                    style={{width: "100%"}}
                >
                    Хотите войти?
                </a>
            </div>
        )
    } else if (props.user.id === currentUserData.info.id) {
        return (
            <div>
                <a
                    href="/redac/"
                    style={{width: "100%"}}
                    className="btn btn-outline-secondary btn-block default-button"
                >Редактировать
                </a>
            </div>
        )
    } else if ((friendRequest.detail) && (friendRequest.detail.is_accepted === false)) {
        return (
            <div>
                <a
                    href={`/chats/personal/${props.user.username}/`}
                    className="btn btn-info default-button"
                    style={{width: "100%"}}
                >
                    Отправить сообщение
                </a>
                {'\n'}
                {friendRequest.detail.to_user.id === props.user.id
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
                            style={{width: "100%"}}
                        >
                            Принять заявку в друзья.
                        </button>
                }
            </div>
        )
    } else if (currentUserData.info.friends.indexOf(props.user.id) === -1) {
        return (
            <div>
                <a
                    href={`/chats/personal/${props.user.username}/`}
                    className="btn btn-info default-button"
                    style={{width: "100%"}}
                >
                    Отправить сообщение
                </a>
                {'\n'}
                <button
                    type="button"
                    className="btn btn-outline-primary btn-block default-button"
                    onClick={() => dispatch(fetchSendingFriendRequest(props.user.id))}
                    style={{width: "100%"}}
                >
                    Добавить в друзья.
                </button>
            </div>
        )
    } else if (currentUserData.info.friends.indexOf(props.user.id) !== -1) {
        return (
            <div>
                <a
                    href={`/chats/personal/${props.user.username}/`}
                    className="btn btn-info default-button"
                    style={{width: "100%"}}
                >
                    Отправить сообщение
                </a>
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

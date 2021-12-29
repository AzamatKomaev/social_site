import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


interface friendRequestI {
    friendRequest: object | null,
    error: number | null
}

const getFriendRequest = async(currentUser: any, user: any) => {
    let data: friendRequestI = {
        friendRequest: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.friendRequest = response.data
        })
        .catch((err) => {
            data.error = err.response.status
        })

    return data
}


const sendFriendRequest = async(currentUser: any, user: any) => {
    let data: friendRequestI = {
        friendRequest: null,
        error: null
    };

    await axios.post("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/", {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.friendRequest = response.data
        })
        .catch((err) => {
            data.error = err.response.status
        })

    return data;
}


const ButtonVariants = (props: any) => {
    const [friendRequest, setFriendRequest] = useState({
        data: null,
        error: null
    })

    const handleDeleteFriendRequest = (e: any) => {
        alert("загулшка хуле")
    }

    const handleSendFriendRequest = (e: any) => {
        sendFriendRequest(props.currentUser, props.user)
            .then((result) => {
                setFriendRequest({
                    data: result.friendRequest,
                    error: result.error
                })
            })
    }

    useEffect(() => {
        getFriendRequest(props.currentUser, props.user)
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
                <a href="/auth/login/"  className="btn btn-outline-primary btn-block">Хотите войти?</a>
            </div>
        )
    } else if (props.user.id == props.currentUser.id) {
        return (
            <div>
                <a href="/redac/" className="btn btn-outline-secondary btn-block">Редактировать</a>
            </div>
        )
    } else if (friendRequest.data && !friendRequest.error) {
        return (
            <div>
                {friendRequest.data.to_user == props.user.id
                    ?
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleDeleteFriendRequest}
                            style={{width: "100%"}}
                         >
                            Отозвать запрос..
                        </button>
                    :
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleDeleteFriendRequest}
                            style={{width: "100%"}}
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
                    className="btn btn-outline-primary btn-block"
                    onClick={handleSendFriendRequest}
                    style={{width: "100%"}}
                 >
                    Добавить в друзья.
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

import {
    GET_FRIEND_REQUEST,
    GET_FRIEND_REQUESTS,
    REMOVE_FRIEND_REQUEST_FROM_LIST,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DELETE_FRIEND_REQUEST, GET_ALL_FRIENDS, DELETE_USER_FROM_FRIEND_LIST
} from './actionTypes';

import {
    getFriendRequest,
    getAllFriendNotifications,
    sendFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
} from '../../services/friendRequestService';
import axios from "axios";
import {UserI} from "../../interfaces";


export const fetchGettingFriendRequest = (userId: number) => {
    //action to get one friend request.
    return function(dispatch) {
        getFriendRequest(userId)
            .then((result) => {
                dispatch({
                    type: GET_FRIEND_REQUEST,
                    payload: {
                        detail: result.friendRequest
                    }
                })
            })
    }
}

export const fetchGettingAllFriendRequests = (userId: number) => {
    //action to get all friend requests by user id.
    return function(dispatch) {
        getAllFriendNotifications(userId)
            .then((result) => {
                dispatch({
                    type: GET_FRIEND_REQUESTS,
                    payload: {
                        list: result.notifications
                    }
                })
            })
    }
}

export const fetchSendingFriendRequest = (userId: number) => {
    return function(dispatch) {
        sendFriendRequest(userId)
            .then((result) => {
                dispatch({
                    type: SEND_FRIEND_REQUEST,
                    payload: {
                        detail: result.friendRequest
                    }
                })
            })
    }
}

export const fetchDeletingFriendRequest = (userId: number) => {
    return function(dispatch) {
        deleteFriendRequest(userId)
            .then((result) => {
                dispatch({
                    type: DELETE_FRIEND_REQUEST,
                    payload: {
                        statusCode: result
                    }
                })
            })
    }
}

export const fetchPatchingFriendRequest = (userId: number, isAccepted: number) => {
    return function(dispatch) {
        patchFriendRequest(userId, isAccepted)
            .then((result) => {
                dispatch({
                    type: ACCEPT_FRIEND_REQUEST,
                    payload: {
                        detail: result.friendRequest
                    }
                })
            })
    }
}

export const deleteFriendRequestFromList = (friendRequestList: Array<any>, userId: number) => {
    return function (dispatch) {
        let newFriendRequestList = friendRequestList.filter(friendRequest => friendRequest.from_user.id !== userId)
        dispatch({
            type: REMOVE_FRIEND_REQUEST_FROM_LIST,
            payload: {
                list: newFriendRequestList
            }
        })
    }
}

export const fetchGettingAllUserFriends = (userId: number) => {
    return function (dispatch) {
        axios.get("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/friends/")
            .then((response) => {
                dispatch({
                    type: GET_ALL_FRIENDS,
                    payload: {
                        list: response.data,
                        statusCode: response.status
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_ALL_FRIENDS,
                    payload: {
                        list: [],
                        statusCode: error.response.status
                    }
                })
            })
    }
}

export const fetchDeletingUserFromFriendList = (userId: number) => {
    return function(dispatch) {
        deleteFriendRequest(userId)
            .then((result) => {
                dispatch({
                    type: DELETE_USER_FROM_FRIEND_LIST,
                    payload: {
                        statusCode: result
                    }
                })
            })
    }
}

export const deleteUserFromFriendList = (friendList: Array<UserI>, userId: number) => {
    return function (dispatch) {
        let newFriendList = friendList.filter(friend => friend.id !== userId)
        dispatch({
            type: DELETE_USER_FROM_FRIEND_LIST,
            payload: {
                list: newFriendList
            }
        })
    }
}

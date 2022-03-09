import {
    GET_FRIEND_REQUEST,
    GET_FRIEND_REQUESTS,
    REMOVE_FRIEND_REQUEST_FROM_LIST,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DELETE_FRIEND_REQUEST, GET_ALL_FRIENDS, DELETE_USER_FROM_FRIEND_LIST
} from './actionTypes';

import {
    FriendRequestService
} from '../../services/friendRequestService';
import {UserI} from "../../interfaces";
import {UserService} from "../../services/userService";


export const fetchGettingFriendRequest = (userId: number) => {
    return async function(dispatch) {
        const response = await FriendRequestService.getFriendRequestDetail(userId)

        if (response.status === 200) {
            dispatch({
                type: GET_FRIEND_REQUEST,
                payload: {
                    detail: response.data
                }
            })
        }
    }
}

export const fetchGettingAllFriendRequests = () => {
    return async function(dispatch) {
        const response = await FriendRequestService.getFriendRequestList()
        if (response.status === 200) {
            dispatch({
                type: GET_FRIEND_REQUESTS,
                payload: {
                    list: response.data
                }
            })
        }
    }
}

export const fetchSendingFriendRequest = (userId: number) => {
    return async function(dispatch) {
        const response = await FriendRequestService.sendFriendRequest(userId)
        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: SEND_FRIEND_REQUEST,
                payload: {
                    detail: response.data
                }
            })
        }
    }
}

export const fetchDeletingFriendRequest = (userId: number) => {
    return async function(dispatch) {
        const response = await FriendRequestService.deleteFriend(userId)

        if (response.status === 204) {
            dispatch({
                type: DELETE_FRIEND_REQUEST,
                payload: {
                    statusCode: response.status
                }
            })
        }
    }
}

export const fetchPatchingFriendRequest = (userId: number, isAccepted: number) => {
    return async function(dispatch) {
        const response = await FriendRequestService.acceptFriendRequest(userId, isAccepted)

        if (response.status === 200) {
            dispatch({
                type: ACCEPT_FRIEND_REQUEST,
                payload: {
                    detail: response.data
                }
            })
        }
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
    return async function (dispatch) {
        const response = await UserService.getFriendList(userId)

        switch (response.status) {
            case 200:
                dispatch({
                    type: GET_ALL_FRIENDS,
                    payload: {
                        list: response.data,
                        statusCode: response.status
                    }
                })
                break;

            default:
                dispatch({
                    type: GET_ALL_FRIENDS,
                    payload: {
                        list: [],
                        statusCode: response.status
                    }
                })
                break;
        }
    }
}

export const fetchDeletingUserFromFriendList = (userId: number) => {
    return async function(dispatch) {
        const response = await FriendRequestService.deleteFriend(userId)
        dispatch({
            type: DELETE_USER_FROM_FRIEND_LIST,
            payload: {
                statusCode: response.status
            }
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

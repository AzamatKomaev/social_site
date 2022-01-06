import {
    GET_FRIEND_REQUEST,
    GET_FRIEND_REQUESTS,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DELETE_FRIEND_REQUEST
} from './actionTypes';

import {
    getFriendRequest,
    getAllFriendNotifications,
    sendFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
} from '../../services/friendRequestService';


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


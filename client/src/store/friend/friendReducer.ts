import {
    GET_FRIEND_REQUEST,
    GET_FRIEND_REQUESTS,
    REMOVE_FRIEND_REQUEST_FROM_LIST,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DELETE_FRIEND_REQUEST,
    GET_ALL_FRIENDS,
    DELETE_USER_FROM_FRIEND_LIST
} from './actionTypes';
import {FriendRequestI, UserI} from "../../interfaces";


interface FriendRequestStateI {
    list: Array<FriendRequestI>,
    detail: FriendRequestI,
    statusCode: number | null
}

interface FriendListStateI {
    list: Array<UserI>,
    statusCode: number | boolean
}


const defaultRequestState: FriendRequestStateI = {
    list: [],
    detail: null,
    statusCode: null
}

const defaultListState: FriendListStateI = {
    list: [],
    statusCode: null
}


export const friendRequestReducer = (state: FriendRequestStateI = defaultRequestState, action: any) => {
    switch (action.type) {
        case GET_FRIEND_REQUEST:
            return {...state, ...action.payload}
        case GET_FRIEND_REQUESTS:
            return {...state, ...action.payload}
        case REMOVE_FRIEND_REQUEST_FROM_LIST:
            return {...state, ...action.payload}
        case SEND_FRIEND_REQUEST:
            return {...state, ...action.payload}
        case ACCEPT_FRIEND_REQUEST:
            return {...state, ...action.payload}
        case DELETE_FRIEND_REQUEST:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const friendListReducer = (state: FriendListStateI = defaultListState, action: any) => {
    switch (action.type) {
        case GET_ALL_FRIENDS:
            return {...state, ...action.payload}
        case DELETE_USER_FROM_FRIEND_LIST:
            return {...state, ...action.payload}
        default:
            return state
    }
}

import {
    GET_FRIEND_REQUEST,
    GET_FRIEND_REQUESTS,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DELETE_FRIEND_REQUEST
} from './actionTypes';


const defaultState: any = {
    list: [],
    detail: null,
    statusCode: null
}


export const friendReducer = (state: any = defaultState, action: any) => {
    switch (action.type) {
        case GET_FRIEND_REQUEST:
            return {...state, ...action.payload}
        case GET_FRIEND_REQUESTS:
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

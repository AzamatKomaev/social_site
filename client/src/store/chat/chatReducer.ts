import {
    CHECK_IS_REQUEST_EXISTS, CREATE_REQUEST, DELETE_REQUEST,
    GET_ALL_CHAT_MEMBERS,
    GET_ALL_CHAT_REQUESTS, GET_REQUEST
} from "./actionTypes";
import {GroupChatRequestI} from "../../interfaces";


interface RequestState {
    id: number,
    isSent: boolean
}

interface RequestListState {
    requestList: Array<GroupChatRequestI>,
    newRequest: GroupChatRequestI,
    deletingRequestId: number,
    requestListState: Array<RequestState>
    members: any
}

const defaultRequestListState: RequestListState = {
    requestList: [],
    newRequest: null,
    deletingRequestId: null,
    requestListState: [],
    members: []
}

export const requestListReducer = (state: RequestListState = defaultRequestListState, action: any) => {
    switch (action.type) {
        case GET_ALL_CHAT_REQUESTS:
            return {...state, ...action.payload}
        case GET_ALL_CHAT_MEMBERS:
            return {...state, ...action.payload}
        case CREATE_REQUEST:
            return {...state, ...action.payload, requestList: [...state.requestList, action.payload.newRequest]}
        case DELETE_REQUEST:
            let requestListWithoutDeletedRequest = state.requestList.filter(request => request.id !== action.payload.deletingRequestId)
            return {...state, ...action.payload, requestList: requestListWithoutDeletedRequest}
        default:
            return state
    }
}

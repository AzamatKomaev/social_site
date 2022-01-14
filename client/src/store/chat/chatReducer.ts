import {
    CHECK_IS_REQUEST_EXISTS,
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
    requestListState: Array<RequestState>
    members: any
}

interface RequestDetailState {
    request: GroupChatRequestI | null,
    isUserMember: boolean,
    isRequestSent: boolean
}

const defaultRequestListState: RequestListState = {
    requestList: [],
    requestListState: [],
    members: []
}

export const requestListReducer = (state: RequestListState = defaultRequestListState, action: any) => {
    switch (action.type) {
        case GET_ALL_CHAT_REQUESTS:
            return {...state, ...action.payload}
        case GET_ALL_CHAT_MEMBERS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

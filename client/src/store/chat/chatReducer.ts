import {
    CREATE_REQUEST,
    DELETE_REQUEST,
    GET_ALL_CHAT_MEMBERS,
    GET_ALL_CHAT_REQUESTS
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
    requestListState: Array<RequestState>,
    userChatRequestList: Array<GroupChatRequestI>,
    members: any
}

const defaultRequestListState: RequestListState = {
    requestList: [],
    newRequest: null,
    deletingRequestId: null,
    requestListState: [],
    userChatRequestList: [],
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
            const requestListWithoutDeletedOne = state.requestList.filter(
                request => request.id !== action.payload.deletingRequestId
            )

            const memberListWithoutDeletedOne = state.members.filter(
                member => member.user_data.id !== action.payload.deletingMemberId
            )

            return {
                ...state, ...action.payload, requestList: requestListWithoutDeletedOne,
                members: memberListWithoutDeletedOne
            }
        default:
            return state
    }
}

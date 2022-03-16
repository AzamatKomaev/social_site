import {
    createRequest,
    deleteRequest,
    getAllChatRequest,
    getRequest
} from "../../services/chatService";
import {
    ADD_NEW_GROUP_CHATS_IN_GROUP_CHAT_LIST, ADD_NEW_PERSONAL_CHATS_IN_PERSONAL_CHAT_LIST,
    CHECK_IS_REQUEST_EXISTS,
    CREATE_REQUEST, DELETE_REQUEST,
    GET_ALL_CHAT_MEMBERS,
    GET_ALL_CHAT_REQUESTS,
} from "./actionTypes";
import {GroupChatI, GroupChatRequestI, PersonalChatI} from "../../interfaces";
import {GroupChatService} from "../../services/chatServices";
import {AxiosResponse} from "axios";


export const fetchGettingAllChatMembers = (service: GroupChatService) => {
    return async function (dispatch) {
        const response = await service.getMembers()
        if (response.status === 200) {
            dispatch({
                type: GET_ALL_CHAT_MEMBERS,
                payload: {
                    members: response.data
                }
            })
        }
    }
}

export const fetchGettingAllChatRequest = (service: GroupChatService) => {
    return async function (dispatch) {
        const response = await service.getRequests()
        if (response.status === 200) {
            dispatch({
                type: GET_ALL_CHAT_REQUESTS,
                payload: {
                    requestList: response.data
                }
            })
        }
    }
}

export const setIsRequestExists = (requestList: Array<GroupChatRequestI>, userId: number) => {
    return function (dispatch) {
        let isRequestExists: boolean = false

        requestList.forEach(chatRequest => {
            if (userId === chatRequest.to_user.id && !chatRequest.is_accepted) isRequestExists = true
        })

        dispatch({
            type: CHECK_IS_REQUEST_EXISTS,
            payload: {
                requestSent: {
                    requestId: userId,
                    state: isRequestExists,
                }
            }
        })
    }
}

export const fetchCreatingRequest = (userId: number, service: GroupChatService) => {
    return async function (dispatch) {
        const response = await service.createRequest(userId)

        if (response.status === 201) {
            dispatch({
                type: CREATE_REQUEST,
                payload: {
                    newRequest: response.data
                }
            })
        }
    }
}

export const fetchDeletingRequest = (userId: number, service: GroupChatService) => {
    return async function (dispatch) {
        const gettingRequestResponse = await service.getDetail()
        let deletingRequestResponse: AxiosResponse

        if (gettingRequestResponse.status === 200) {
            deletingRequestResponse = await service.deleteRequest(userId)
        } else {
            return ;
        }

        if (deletingRequestResponse.status === 204) {
            dispatch({
                type: DELETE_REQUEST,
                payload: {
                    deletingRequestId: gettingRequestResponse.data.id
                }
            })
        }
    }
}


export const addNewChatsInChatList = (newChats: Array<GroupChatI | PersonalChatI>, type: string) => {
    return function (dispatch) {
        dispatch({
            type: type==="group" ? ADD_NEW_GROUP_CHATS_IN_GROUP_CHAT_LIST : ADD_NEW_PERSONAL_CHATS_IN_PERSONAL_CHAT_LIST,
            payload: {
                newLoadedChatList: newChats
            }
        })
    }
}


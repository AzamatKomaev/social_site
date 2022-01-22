import {
    createRequest,
    deleteRequest,
    getAllChatRequest,
    getChatMembers,
    getRequest
} from "../../services/chatService";
import {
    CHECK_IS_REQUEST_EXISTS,
    CREATE_REQUEST, DELETE_REQUEST,
    GET_ALL_CHAT_MEMBERS,
    GET_ALL_CHAT_REQUESTS,
    GET_REQUEST
} from "./actionTypes";
import {GroupChatRequestI} from "../../interfaces";


export const fetchGettingAllChatMembers = (chatId: number) => {
    return function (dispatch) {
        getChatMembers(chatId)
            .then((result) => {
                dispatch({
                    type: GET_ALL_CHAT_MEMBERS,
                    payload: {
                        members: result
                    }
                })
            })
    }
}

export const fetchGettingAllChatRequest = (chatId: number) => {
    return function (dispatch) {
        getAllChatRequest(chatId)
            .then((result) => {
                dispatch({
                    type: GET_ALL_CHAT_REQUESTS,
                    payload: {
                        requestList: result
                    }
                })
            })
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

export const fetchCreatingRequest = (chatId: number, userId: number) => {
    return function (dispatch) {
        createRequest(chatId, userId)
            .then((result) => {
                dispatch({
                    type: CREATE_REQUEST,
                    payload: {
                        newRequest: result
                    }
                })
            })
    }
}

export const fetchDeletingRequest = (chatId: number, userId: number) => {
    return function (dispatch) {
        getRequest(chatId, userId)
            .then((result) => {
                deleteRequest(chatId, userId)
                    .then((status) => {
                        dispatch({
                            type: DELETE_REQUEST,
                            payload: {
                                deletingRequestId: result.id
                            }
                        })
                    })
            })
    }
}

export const fetchAcceptingChatRequest = (fromChatId: number) => {
    return async function (dispatch) {

    }
}

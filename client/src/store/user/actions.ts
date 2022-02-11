import {
    ACCEPT_CHAT_NOTIFICATION,
    DELETE_CHAT_NOTIFICATION,
    GET_USER_CHAT_NOTIFICATIONS,
    GET_USER_DATA
} from './actionType';
import {getCurrentUserData} from '../../services/service'
import {getAllUserChatRequests} from "../../services/userService";
import {acceptChatRequest, deleteRequest, getRequest} from "../../services/chatService";
import {DELETE_REQUEST} from "../chat/actionTypes";


export const fetchUserData = () => {
    return function(dispatch) {
        getCurrentUserData()
            .then((result) => {
                dispatch({type: GET_USER_DATA, payload: result})
            })
    }
}

export const fetchGettingAllChatRequestsToUser = (userId: number) => {
    return async function (dispatch) {
        const result = await getAllUserChatRequests(userId)


        dispatch({
            type: GET_USER_CHAT_NOTIFICATIONS,
            payload: {
                chatRequestNotifications: result.chatRequestsList
            }
        })
    }
}

export const fetchAcceptingChatRequest = (fromChatId: number) => {
    return async function (dispatch) {
        const result = await acceptChatRequest(fromChatId)

        dispatch({
            type: ACCEPT_CHAT_NOTIFICATION,
            payload: {
                acceptedRequest: result
            }
        })
    }
}

export const fetchDeletingChatRequestNotification = (chatId: number, userId: number, requestId: number) => {
    return function (dispatch) {
        getRequest(chatId, userId)
            .then((result) => {
                deleteRequest(chatId, userId)
                    .then((status) => {
                        dispatch({
                            type: DELETE_CHAT_NOTIFICATION,
                            payload: {
                                deletedRequestId: requestId
                            }
                        })
                    })
            })
    }
}

import {
    ACCEPT_CHAT_NOTIFICATION,
    DELETE_CHAT_NOTIFICATION,
    GET_USER_CHAT_NOTIFICATIONS,
    GET_USER_DATA
} from './actionType';
import {getAllUserChatRequests} from "../../services/userService";
import {acceptChatRequest, deleteRequest, getRequest} from "../../services/chatService";
import {AuthService} from "../../services/authService";


export const fetchUserData = () => {
    return async function(dispatch) {
        const response = await AuthService.getCurrentUser()
        if (response.status === 200) {
            dispatch({type: GET_USER_DATA, payload: {info: response.data, isAuth: response.status === 200}})
        }
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

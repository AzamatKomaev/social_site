import {
    ACCEPT_CHAT_NOTIFICATION,
    DELETE_CHAT_NOTIFICATION,
    GET_USER_CHAT_NOTIFICATIONS,
    GET_USER_DATA
} from './actionType';
import {AuthService} from "../../services/authService";
import {GroupChatService} from "../../services/chatServices";
import {AxiosResponse} from "axios";


export const fetchUserData = () => {
    return async function(dispatch) {
        const response = await AuthService.getCurrentUser()
        dispatch({
            type: GET_USER_DATA,
            payload: {
                info: response.status === 200 ? response.data : null,
                isAuth: response.status === 200
            }
        })

    }
}

export const fetchGettingAllChatRequestsToUser = (userId: number) => {
    return async function (dispatch) {
        const response = await GroupChatService.getUserRequests(userId)

        if (response.status === 200) {
            dispatch({
                type: GET_USER_CHAT_NOTIFICATIONS,
                payload: {
                    chatRequestNotifications: response.data
                }
            })
        }
    }
}

export const fetchAcceptingChatRequest = (fromChatId: number, service: GroupChatService) => {
    return async function (dispatch) {
        const response = await service.acceptRequest()
        if (response.status === 200) {
            dispatch({
                type: ACCEPT_CHAT_NOTIFICATION,
                payload: {
                    acceptedRequest: response.data
                }
            })
        }
    }
}

export const fetchDeletingChatRequestNotification = (userId: number, service: GroupChatService) => {
    return async function (dispatch) {
        const gettingRequestResponse = await service.getRequestDetail(userId)
        let deletingRequestResponse: AxiosResponse

        if (gettingRequestResponse.status === 200) {
            deletingRequestResponse = await service.deleteRequest(userId)
        }
        else {
            return ;
        }

        if (deletingRequestResponse.status === 204) {
            dispatch({
                type: DELETE_CHAT_NOTIFICATION,
                payload: {
                    deletedRequestId: gettingRequestResponse.data.id
                }
            })
        }
    }
}

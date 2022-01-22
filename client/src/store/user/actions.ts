import {ACCEPT_CHAT_NOTIFICATION, GET_USER_CHAT_NOTIFICATIONS, GET_USER_DATA} from './actionType';
import {getCurrentUserData} from '../../services/service'
import {getAllUserChatRequests} from "../../services/userService";
import {acceptChatRequest} from "../../services/chatService";


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

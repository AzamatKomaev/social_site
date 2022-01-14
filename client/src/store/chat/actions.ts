import {getAllChatRequest, getChatMembers} from "../../services/chatSerivce";
import {CHECK_IS_REQUEST_EXISTS, GET_ALL_CHAT_MEMBERS, GET_ALL_CHAT_REQUESTS, GET_REQUEST} from "./actionTypes";
import axios from "axios";
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
            if (userId === chatRequest.to_user && !chatRequest.is_accepted) isRequestExists = true
        })

        console.log(`isRequestsExists is ${isRequestExists} for ${userId}`)

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

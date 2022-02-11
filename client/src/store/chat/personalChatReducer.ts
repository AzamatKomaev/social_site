import {PersonalChatI} from "../../interfaces";
import {ADD_NEW_PERSONAL_CHATS_IN_PERSONAL_CHAT_LIST, GET_PERSONAL_CHAT_LIST} from "./actionTypes";

interface PersonalChatListStateI {
    personalChats: Array<PersonalChatI>,
    personalChatsByName: Array<PersonalChatI>,
    personalChatsByLastMessages: Array<PersonalChatI>,
    personalChatsByInterlocutorName: Array<PersonalChatI>,
    personalChatsFilteredByInterlocutorName: Array<PersonalChatI>
}

const defaultPersonalChatListState: PersonalChatListStateI = {
    personalChats: [],
    personalChatsByName: [],
    personalChatsByLastMessages: [],
    personalChatsByInterlocutorName: [],
    personalChatsFilteredByInterlocutorName: []
}

export const personalChatReducer = (state: PersonalChatListStateI=defaultPersonalChatListState, action: any) => {
    switch (action.type) {
        case GET_PERSONAL_CHAT_LIST:
            const personalChats1 = state.personalChatsByName
            return {...state, personalChats: personalChats1}

        case ADD_NEW_PERSONAL_CHATS_IN_PERSONAL_CHAT_LIST:
            const newGroupChatList = [...state.personalChats, ...action.payload.newLoadedChatList]
            return {...state, personalChats: newGroupChatList, personalChatsByInterlocutorName: newGroupChatList}

        default:
            return state
    }
}

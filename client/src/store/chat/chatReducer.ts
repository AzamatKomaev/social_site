import {
    ADD_NEW_GROUP_CHATS_IN_GROUP_CHAT_LIST,
    CREATE_REQUEST,
    DELETE_REQUEST,
    GET_ALL_CHAT_MEMBERS,
    GET_ALL_CHAT_REQUESTS,
    GET_GROUP_CHAT_LIST,
    GET_GROUP_CHAT_LIST_WITHOUT_MESSAGES,
    GET_GROUP_CHAT_LIST_WITH_MESSAGES,
    GET_CURRENT_USER_CHAT_LIST, FILTER_CHAT_LIST_BY_STRING, CLEAR_FILTERED_CHAT_LIST
} from "./actionTypes";
import {GroupChatI, GroupChatRequestI} from "../../interfaces";


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

interface ChatListStateI {
    groupChats: Array<GroupChatI>,
    groupChatsByName: Array<GroupChatI>,
    groupChatsByEmptyMessages: Array<GroupChatI>,
    groupChatsByLastMessages: Array<GroupChatI>,
    groupChatsCurrentUser: Array<GroupChatI>,
    groupChatsByFilterString: Array<GroupChatI>
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

const defaultChatListState = {
    groupChats: [],
    groupChatsByName: [],
    groupChatsByEmptyMessages: [],
    groupChatsByLastMessages: [],
    groupChatsCurrentUser: [],
    groupChatsByFilterString: []
}

export const chatListReducer = (state: ChatListStateI = defaultChatListState, action: any) => {

    switch (action.type) {
        case GET_GROUP_CHAT_LIST:
            const groupChats1 = state.groupChatsByName
            return {...state, groupChats: groupChats1}

        case GET_GROUP_CHAT_LIST_WITHOUT_MESSAGES:
            const groupChats2 = state.groupChats.filter(groupChat => groupChat.last_message.text === "")
            return {...state, groupChats: groupChats2, groupChatsByEmptyMessages: groupChats2}

        case GET_GROUP_CHAT_LIST_WITH_MESSAGES:
            const groupChats3 = state.groupChats.filter(groupChat => groupChat.last_message?.created_at != null)
            return {...state, groupChats: groupChats3, groupChatsByLastMessages: groupChats3}

        case GET_CURRENT_USER_CHAT_LIST:
            const userId = action.payload.userId
            const groupChats4 = state.groupChats.filter(groupChat => groupChat.creator === userId)
            return {...state, groupChats: groupChats4, groupChatsCurrentUser: groupChats4}

        case FILTER_CHAT_LIST_BY_STRING:
            const string = action.payload.string;
            return {...state, groupChatsByFilterString: state.groupChats.filter(groupChat => groupChat.name.indexOf(string) !== -1)};

        case CLEAR_FILTERED_CHAT_LIST:
            return {...state, groupChatsByFilterString: []}

        case ADD_NEW_GROUP_CHATS_IN_GROUP_CHAT_LIST:
            const newGroupChatList = [...state.groupChats, ...action.payload.newLoadedChatList]
            return {...state, groupChats: newGroupChatList, groupChatsByName: newGroupChatList}
        default:
            return state
    }
}

import {
    SET_FETCHING,
    GET_CHAT_LIST, SORT_CHATS_BY_NAME, SORT_CHATS_BY_LAST_MESSAGE, FILTER_CHATS_BY_STRING
} from "../actionTypes";
import {GroupChatI, PersonalChatI} from "../../../interfaces";


interface ChatListStateI {
    list: any,
    filteredChatList: Array<GroupChatI | PersonalChatI>
}

const defaultChatListState = {
    list: {
        values: [],
        lastStatusCode: null,
        page: 1,
        fetching: true,
        wasChange: null
    },
    filteredChatList: []
}

export const chatListReducer = (state: ChatListStateI = defaultChatListState, action: any) => {
    let newChatList;

    switch (action.type) {
        case GET_CHAT_LIST:
            if (state.list.fetching && state.list.lastStatusCode !== 201) {
                let page = state.list.page;

                if (action.payload.statusCode === 204 || action.payload.statusCode === 404) page = -1;
                else page++;

                return {
                    ...state,
                    ...action.payload,
                    list: {
                        values: [...state.list.values, ...action.payload.list],
                        lastStatusCode: action.payload.statusCode === 404 ? 201 : action.payload.statusCode,
                        page: page,
                        fetching: false,
                        wasChange: 100
                    }
                }
            }
            return state

        case SET_FETCHING:
            return {
                ...state,
                list: {
                    ...state.list,
                    fetching: action.payload.fetching
                }
            }

        case SORT_CHATS_BY_NAME:
            newChatList = state.list.values.sort((a: GroupChatI, b: GroupChatI) => a.name.localeCompare(b.name))
            return {
                ...state,
                list: {
                    ...state.list,
                    values: newChatList
                }
            }

        case SORT_CHATS_BY_LAST_MESSAGE:
            newChatList = state.list.values.sort((a: GroupChatI | PersonalChatI, b: GroupChatI | PersonalChatI): number => {
                    if (!a.last_message.created_at) {
                        return 1
                    }
                    if (!b.last_message.created_at) {
                        return -1
                    }

                    if (a.last_message.created_at > b.last_message.created_at) {
                        return -1
                    } else {
                        return 1
                    }
                }
            )
            return {
                ...state,
                list: {
                    ...state.list,
                    values: newChatList
                }
            }
            
        case FILTER_CHATS_BY_STRING:
            const filteredChatList = state.list.values.filter(chat => chat.name.indexOf(action.payload.string) !== -1)
            return {
                ...state,
                filteredChatList: filteredChatList
            }

        default:
            return state
    }
}


import {
    SET_FETCHING,
    GET_CHAT_LIST, SORT_CHATS_BY_NAME, SORT_CHATS_BY_LAST_MESSAGE
} from "../actionTypes";
import {GroupChatI, PersonalChatI} from "../../../interfaces";

interface ChatListStateI {
    list: any,
    filteredList: Array<GroupChatI | PersonalChatI>
}

const defaultChatListState = {
    list: {
        values: [],
        lastStatusCode: null,
        page: 1,
        fetching: true,
        wasChange: null
    },
    filteredList: []
}

export const chatListReducer = (state: ChatListStateI = defaultChatListState, action: any) => {
    let sortedChat;

    switch (action.type) {
        case GET_CHAT_LIST:
            if (state.list.fetching && state.list.lastStatusCode !== 201) {
                let page = state.list.page;

                if (action.payload.statusCode === 204 || action.payload.statusCode === 404) page = -1;
                else page++

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
            return {...state}

        case SET_FETCHING:
            return {
                ...state,
                list: {
                    values: state.list.values,
                    lastStatusCode: state.list.lastStatusCode,
                    page: state.list.page,
                    fetching: action.payload.fetching
                }
            }

        case SORT_CHATS_BY_NAME:
            sortedChat = state.list.values.sort((a: GroupChatI, b: GroupChatI) => {
                    if (a.name > b.name) return -1
                    // eslint-disable-next-line eqeqeq
                    else if (a.name == b.name) return 0
                    else return 1
                }
            )
            return {
                ...state,
                list: {
                    ...state.list,
                    values: sortedChat
                }
            }

        case SORT_CHATS_BY_LAST_MESSAGE:
            sortedChat = state.list.values.sort((a: GroupChatI | PersonalChatI, b: GroupChatI | PersonalChatI): number => {
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
                    values: sortedChat
                }
            }

        default:
            return state
    }
}


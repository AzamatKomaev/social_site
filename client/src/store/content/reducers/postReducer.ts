import {PostI} from "../../../interfaces";
import {CREATE_POST, GET_DETAIL_POST, GET_POSTS, SET_FETCHING, DELETE_POST, HIDE_POST} from "../actionTypes";

interface PostReducerStateI {
    list: any,
    detail: PostI | null,
    created: PostI | null
}

const defaultPostReducerState: PostReducerStateI = {
    list: {
        values: [],
        lastStatusCode: null,
        page: 1,
        fetching: true
    },
    detail: null,
    created: null
}

export const postReducer = (state = defaultPostReducerState, action: any) => {
    switch (action.type) {
        case GET_POSTS:
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
                        fetching: false
                    }
                }
            } else {
                return {...state}
            }

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

        case GET_DETAIL_POST:
            return {...state, ...action.payload}
        case CREATE_POST:
            return {...state, ...action.payload}
        case DELETE_POST:
            const newPostList = state.list.values.filter(post => post.id !== action.payload.deletedPostId)
            return {
                ...state,
                list: {
                    values: newPostList,
                    lastStatusCode: state.list.lastStatusCode,
                    page: state.list.page,
                    fetching: state.list.fetching
                }
            }
        case HIDE_POST:
            const postList = state.list.values.filter(post => post.id !== action.payload.hiddenPostId)
            return {
                ...state,
                list: {
                    values: postList,
                    lastStatusCode: state.list.lastStatusCode,
                    page: state.list.page,
                    fetching: state.list.fetching
                }
            }
        default:
            return state;
    }
}
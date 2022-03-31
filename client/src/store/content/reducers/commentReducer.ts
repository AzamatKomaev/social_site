import {CommentI} from "../../../interfaces";
import {CREATE_COMMENT, GET_COMMENTS} from "../actionTypes";

interface CommentReducerStateI {
    list: Array<CommentI>,
    createdPostStatusCode: number
}

const defaultCommentReducerState: CommentReducerStateI = {
    list: [],
    createdPostStatusCode: null
}

export const commentReducer = (state = defaultCommentReducerState, action: any) => {
    switch (action.type) {
        case GET_COMMENTS:
            return {...state, ...action.payload}
        case CREATE_COMMENT:
            return {
                ...state,
                ...action.payload,
                list: [action.payload.createdComment, ...state.list],
                createdPostStatusCode: action.payload.statusCode
            }
        default:
            return {...state}
    }
}

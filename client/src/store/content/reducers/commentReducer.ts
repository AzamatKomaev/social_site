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
            let newList;
            if (action.payload.statusCode !== 201) {
                newList = state.list
            } else {
                newList = [action.payload.createdComment, ...state.list]
            }

            return {
                ...state,
                ...action.payload,
                list: newList,
                createdPostStatusCode: action.payload.statusCode
            }
        default:
            return {...state}
    }
}

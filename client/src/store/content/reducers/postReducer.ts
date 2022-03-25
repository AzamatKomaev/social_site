import {PostI} from "../../../interfaces";
import {CREATE_POST, GET_DETAIL_POST} from "../actionTypes";

interface PostReducerStateI {
    detail: PostI | null,
    created: PostI | null
}

const defaultPostReducerState: PostReducerStateI = {
    detail: null,
    created: null
}

export const postReducer = (state: PostReducerStateI = defaultPostReducerState, action) => {
    switch (action.type) {
        case GET_DETAIL_POST:
            return {...state, ...action.payload}
        case CREATE_POST:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
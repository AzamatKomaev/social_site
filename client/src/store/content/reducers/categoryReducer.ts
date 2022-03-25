import {CategoryI} from "../../../interfaces";
import {GET_ALL_CATEGORIES} from "../actionTypes";

interface CategoryReducerStateI {
    list: Array<CategoryI>
}

const defaultState: CategoryReducerStateI = {
    list: []
}


export const categoryReducer = (state: CategoryReducerStateI = defaultState, action: any) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {...state, ...action.payload}
        default:
            return state
    }
}
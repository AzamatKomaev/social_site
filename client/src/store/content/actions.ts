import {ContentService} from "../../services/contentService";
import {GET_ALL_CATEGORIES, GET_DETAIL_POST} from "./actionTypes";

// Actions for categoryReducer.
export const fetchGettingAllCategories = () => {
    return async function (dispatch) {
        const response = await ContentService.getCategoryList()
        if (response.status === 200) {
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: {
                    list: response.data
                }
            })
        }
    }
}


// Actions for postReducer.
export const fetchGettingDetailPost = (postId: number) => {
    return async function(dispatch) {
        const response = await ContentService.getPostDetail(postId)

        if (response.status === 200) {
            dispatch({
                type: GET_DETAIL_POST,
                payload: {
                    detail: response.data
                }
            })
        }
    }
}

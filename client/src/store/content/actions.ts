import {ContentService} from "../../services/contentService";
import {CREATE_COMMENT, DELETE_POST, GET_ALL_CATEGORIES, GET_COMMENTS, GET_DETAIL_POST, GET_POSTS} from "./actionTypes";

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
export const fetchGettingListPost = (categoryId: number, page: number) => {
    return async function (dispatch) {
        const response = await ContentService.getPostList(categoryId, page)
        dispatch({
            type: GET_POSTS,
            payload: {
                list: response.status === 200 ? response.data : [],
                statusCode: response.status
            }
        })
    }
}

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

export const fetchDeletingPost = (postId: number) => {
    return async function(dispatch) {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Вы точно хотите удалить этот пост?")) {
            const response = await ContentService.deletePost(postId)
            if (response.status === 204) {
                dispatch({
                    type: DELETE_POST,
                    payload: {
                        deletedPostId: postId
                    }
                })
            }
        }
    }
}

// Actions for commentReducer.
export const fetchGettingCommentList = (postId: number) => {
    return async function(dispatch) {
        const response = await ContentService.getCommentList(postId)

        if (response.status === 200) {
            dispatch({
                type: GET_COMMENTS,
                payload: {
                    list: response.data
                }
            })
        }
    }
}

export const fetchCreatingComment = (postId: number, content: string) => {
    return async function(dispatch) {
        const response = await ContentService.createComment(postId, content)
        dispatch({
            type: CREATE_COMMENT,
            payload: {
                createdComment: response.status === 201 ? response.data : null,
                statusCode: response.status
            }
        })
    }
}

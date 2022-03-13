import {defaultUrl} from "./defaultUrl";

export class ContentPath {
    static categoryList = (): string => {
        return `${defaultUrl}/categories/`
    }

    static postList = (categoryId: number, page: number): string => {
        return `${defaultUrl}/categories/${categoryId}/posts/?page_number=${page}`
    }

    static postDetail = (postId: number): string => {
        return `${defaultUrl}/posts/${postId}/`
    }

    static commentList = (postId: number): string => {
        return `${defaultUrl}/posts/${postId}/comments/`
    }

    static commentDetail = (commentId: number): string  => {
        return `${defaultUrl}/comments/${commentId}/`
    }
}
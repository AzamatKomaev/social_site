import {defaultUrl} from "./defaultUrl";

export class ContentPath {
    static categoryList = (): string => {
        return `${defaultUrl}/categories/`
    }

    static postList = (): string => {
        return `${defaultUrl}/posts/`
    }

    static postDetail = (postId: number): string => {
        return `${defaultUrl}/posts/${postId}/`
    }

    static commentList = (postId: number): string => {
        return `${defaultUrl}/comments/?post__id=${postId}`
    }

    static commentDetail = (commentId: number): string  => {
        return `${defaultUrl}/comments/${commentId}/`
    }
}
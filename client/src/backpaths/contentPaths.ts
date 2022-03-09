import {defaultUrl} from "./defaultUrl";

export class ContentPath {
    static categoryList = (): string => {
        return `${defaultUrl}/categories/`
    }

    static postList = (categoryId: number): string => {
        return `${defaultUrl}/categories/${categoryId}/posts/`
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
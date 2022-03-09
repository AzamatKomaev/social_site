import {defaultUrl} from "./defaultUrl";


export class UserPath {
    static userDetail = (instance: number | string): string => {
        return `${defaultUrl}/users/${instance}/`
    }

    static friendList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/friends/`
    }

    static postList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/posts/`
    }

    static commentList = (userId: number): string => {
        return `${defaultUrl}/users/${userId}/comments/`
    }
}


export class FriendRequestPath {
    static list = (): string => {
        return `${defaultUrl}/friend_requests/`
    }

    static detail = (userId: number): string => {
        return `${defaultUrl}/friend_requests/${userId}/`
    }

    static patchDetail = (userId: number, isAccepted: number): string => {
        return `${defaultUrl}/friend_requests/${userId}/?is_accepted=${isAccepted}`
    }
}
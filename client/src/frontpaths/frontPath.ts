export class AuthFrontPath {
    static login = (): string => {
        return `/auth/login/`
    }

    static register = (): string => {
        return `/auth/sign_up/`
    }

    static sendMessage = (): string => {
        return `/auth/send_message/`
    }

    static acceptEmail = (token: string): string => {
        return `/auth/accept/${token}/`
    }
}

export class CategoryFrontPath {
    static categoryList = (): string => {
        return `/categories/`
    }

    static postList = (categoryId: number | string): string => {
        return `/categories/c_id/${categoryId}/`
    }

    static postDetail = (categoryId: number | string, postId: number | string): string => {
        return `/categories/c_id/${categoryId}/${postId}/`
    }

    static postCreate = (): string => {
        return `/categories/create/`
    }

    static notificationList = (): string => {
        return `/notifications/`
    }
}

export class UserFrontPath {
    static userDetail = (username: string): string => {
        return `/users/${username}/`
    }

    static friendList = (username: string): string => {
        return `/users/${username}/friends/`
    }
}

export class ChatFrontPath {
    static chatList = (): string => {
        return `/chats/`
    }

    static groupChatList = (): string => {
        return `/chats/group/`
    }

    static personalChatList = (): string => {
        return `/chats/personal/`
    }

    static groupChatMessages = (chatId: number | string): string => {
        return `/chats/group/${chatId}/`
    }

    static personalChatMessages = (username: string): string => {
        return `/chats/personal/${username}/`
    }

    static groupChatSettings = (chatId: number | string): string => {
        return `/chats/group/${chatId}/settings/`
    }
}

export class DatingProfileFrontPath {
    static datingProfileList = (): string => {
        return '/dating_profiles/site/'
    }

    static datingProfileDetail = (profileId: number | string): string => {
        return `/dating_profiles/site/${profileId}/`
    }
}

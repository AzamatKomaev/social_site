interface GroupI {
    name: string
}

export interface UserI {
    id: number,
    username: string,
    email: string,
    group_data: GroupI,
    avatar: string,
    friends_count: number,
    posts_count: number,
    comments_count: number
}

export interface CategoryI {
    id: number,
    count: number,
    name: string,
    avatar: string
}

interface MessageI {
    id: number,
    user_data: UserI,
    text: string,
    created_at: string,
    chat: number,

}

export interface GroupChatI {
    id: number,
    last_message: MessageI,
    members_count: number,
    name: string,
    created_at: string,
    avatar: string,
    creator: number,
    users: number[]
}

export interface PersonalChatI {
    id: number,
    last_message: MessageI,
    interlocutor: UserI,
    messages_count: number,
    users: number[]
}

export interface FriendRequestI {
    id: number,
    to_user: UserI,
    from_user: UserI,
    is_accepted: boolean,
    created_at: string,
    updated_at: string
}

export interface GroupChatRequestI {
    id: number,
    to_user: UserI,
    from_chat: GroupChatI,
    is_accepted: boolean,
    created_at: string,
    updated_at: string
}

export interface PostI {
    id: number,
    user_data: UserI,
    comments_count: number,
    title: string,
    text: string,
    photo: string | null,
    created_at: string,
    category: number
}

export interface CommentI {
    id: number,
    user_data: UserI,
    text: string,
    created_at: string,
    post: number
}

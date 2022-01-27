interface GroupI {
    name: string
}

interface AvatarI {
    image: string
}

export interface UserI {
    id: number,
    username: string,
    email: string,
    group_data: GroupI,
    avatar: AvatarI,
    friends?: Array<number>
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
    polymorphic_ctype?: number,
    chat: number
}

export interface GroupChatI {
    id: number,
    last_message: MessageI,
    name: string,
    created_at: string,
    avatar: string,
    creator: number,
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

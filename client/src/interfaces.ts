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
    to_user: number,
    from_chat: number,
    is_accepted: boolean,
    created_at: string,
    updated_at: string
}

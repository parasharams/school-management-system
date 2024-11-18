export interface ChatUser {
    id?: number;
    name?: string;
    avatar?: string;
    lastMessage?: string;
    totalUnread?: number;
    lastMessageOn?: string;
    userStatus?: 'busy' | 'online' | 'away' | 'offline';
}


export interface MessageItem {
    id: number;
    from: ChatUser;
    to: ChatUser;
    messages: {
        type?: string;
        value?: any;
    }[];
    sendOn?: string;
}

export interface ChatMessage {
    id: number;
    day: string;
    messages: MessageItem[]
}



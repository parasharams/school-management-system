export interface Email {
    id: number;
    from_name: string;
    from_email: string;
    subject: string;
    teaser: string;
    number_of_reply: number;
    is_important: boolean;
    is_starred?: boolean;
    is_read: boolean;
    time: string;
    date: string;
}

export interface EmailMenuLinkItem {
    icon: string;
    name: string;
    value?: number;
    variant?: string;
    is_open?: boolean;
}

export interface EmailLabel {
    variant: string;
    name: string;
}


export interface EmailChatUser {
    name: string;
    avatar?: string;
}
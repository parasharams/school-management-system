interface TimelinePost {
    id: number;
    date?: number;
    month?: string;
    postTitle?: string;
    content?: string;
}

export interface TimelineItem {
    id?: number;
    day?: string;
    posts?: TimelinePost[];
}
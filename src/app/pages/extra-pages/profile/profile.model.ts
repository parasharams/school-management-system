export interface UserInfo {
    userName?: string;
    avatar?: string;
    designation?: string;
    location?: string;
    profileProgress?: number;
    about?: string;
    email?: string;
    phone?: string;
    address?: string;
    skills?: string[];
}

interface Activity {
    id?: number;
    hours?: number;
    title?: string;
    description?: string;
}

export interface ActivityItem {
    id?: number;
    activityTime?: string;
    activities?: Activity[];
}

export interface Message {
    id?: number;
    avatar?: string;
    userName?: string;
    text?: string;
}

export interface FileItem {
    id?: number;
    fileName?: string;
    fileSize?: string;
    previewImage?: string;
}
export interface QuickAccessItem {
    id: number;
    name: string;
    icon: string;
    size: string;
    variant?: string;
}

export interface RecentItem {
    id: number;
    fileName: string;
    folderName?: string;
    fileSize: string;
    lastViewed: string;
}
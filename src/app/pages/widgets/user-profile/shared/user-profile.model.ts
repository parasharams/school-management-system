export interface UserProfile {
    id: number;
    userName: string;
    designation: string;
    profileImage: string;
    accontId?: string;
    location?: string;
    coverImage?: string;
    about?: string;
    recentPhotos?: string[];
    tags?: string[];
}
import { QuickAccessItem, RecentItem } from "./file-manager.model";

const QUICKACCESSITEMS: QuickAccessItem[] = [
    {
        id: 1,
        icon: "bi bi-file-earmark-zip",
        variant: 'warning',
        name: "Shreyu-admin.zip",
        size: "2.3 MB"
    },
    {
        id: 2,
        icon: "bi bi-grid",
        variant: 'info',
        name: "Apps",
        size: "3.9 GB"
    },
    {
        id: 3,
        icon: "bi bi-file-earmark",
        name: "Compile Version",
        variant: 'secondary',
        size: "21.6 GB"
    },
    {
        id: 4,
        icon: "bi bi-images",
        name: "Pictures",
        variant: 'danger',
        size: "17.3 GB"
    },
    {
        id: 5,
        icon: "bi bi-file-earmark-pdf",
        name: "License-details.pdf",
        variant: 'danger',
        size: "3.9 MB"
    },
    {
        id: 6,
        icon: "bi bi-file-earmark-ppt",
        name: "Wedding-project.ppt",
        variant: 'primary',
        size: "350 MB"
    },
    {
        id: 7,
        icon: "bi bi-file-earmark-excel",
        variant: 'success',
        name: "Database.xlsx",
        size: "17 MB"
    },
    {
        id: 8,
        icon: "bi bi-folder",
        variant: 'info',
        name: "Songs",
        size: "79.4 GB"
    }
];

const RECENTFILES: RecentItem[] = [
    {
        id: 1,
        fileName: 'App Design & Devlopment',
        folderName: 'Work',
        fileSize: '5.6 GB',
        lastViewed: '03 Dec',
    },
    {
        id: 2,
        fileName: 'Shreyu-admin.zip',
        folderName: 'Shreyu',
        fileSize: '1.3 GB',
        lastViewed: '05 Oct',
    },
    {
        id: 3,
        fileName: 'Profile.jpg',
        folderName: 'Photo',
        fileSize: '2.6 MB',
        lastViewed: '11 Nov',
    },
    {
        id: 4,
        fileName: 'Sign.jpeg',
        folderName: 'Photo',
        fileSize: '1.3 MB',
        lastViewed: '11 Nov',
    },
    {
        id: 5,
        fileName: 'Licence.pdf',
        folderName: 'Personal',
        fileSize: '7.8 MB',
        lastViewed: '15 Mar',
    },
    {
        id: 6,
        fileName: 'Photo',
        folderName: 'Personal',
        fileSize: '17.3 GB',
        lastViewed: '15 Mar',
    },
    {
        id: 7,
        fileName: 'Stay.mp3',
        folderName: 'Song',
        fileSize: '8.9 MB',
        lastViewed: '14 Mar',
    },
    {
        id: 8,
        fileName: 'Data.doc',
        folderName: 'Shreyu',
        fileSize: '233 KB',
        lastViewed: '13 Mar',
    },
];

export { QUICKACCESSITEMS, RECENTFILES }

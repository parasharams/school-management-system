import { ActivityItem, FileItem, Message } from "./profile.model";

const ACTIVITYTIMELINE: ActivityItem[] = [
    {
        id: 1,
        activityTime: 'This Week',
        activities: [
            {
                id: 1,
                hours: 2,
                title: 'Designing Shreyu Admin',
                description: 'Shreyu Admin - A responsive admin and dashboard template'
            },
            {
                id: 2,
                hours: 21,
                title: 'UX and UI for Ubold Admin',
                description: 'Ubold Admin - A responsive admin and dashboard template'
            },
            {
                id: 3,
                hours: 22,
                title: 'UX and UI for Hyper Admin',
                description: 'Hyper Admin - A responsive admin and dashboard template'
            }
        ]
    },
    {
        id: 2,
        activityTime: 'Last Week',
        activities: [
            {
                id: 1,
                hours: 2,
                title: 'Designing Shreyu Admin',
                description: 'Shreyu Admin - A responsive admin and dashboard template'
            },
            {
                id: 2,
                hours: 21,
                title: 'UX and UI for Ubold Admin',
                description: 'Ubold Admin - A responsive admin and dashboard template'
            },
            {
                id: 3,
                hours: 22,
                title: 'UX and UI for Hyper Admin',
                description: 'Hyper Admin - A responsive admin and dashboard template'
            }
        ]
    },
    {
        id: 3,
        activityTime: 'Last Month',
        activities: [
            {
                id: 1,
                hours: 2,
                title: 'Designing Shreyu Admin',
                description: 'Shreyu Admin - A responsive admin and dashboard template'
            },
            {
                id: 2,
                hours: 21,
                title: 'UX and UI for Ubold Admin',
                description: 'Ubold Admin - A responsive admin and dashboard template'
            },
            {
                id: 3,
                hours: 22,
                title: 'UX and UI for Hyper Admin',
                description: 'Hyper Admin - A responsive admin and dashboard template'
            }
        ]
    }
];

const MESSAGES: Message[] = [
    {
        id: 1,
        userName: 'John Jack',
        avatar: 'assets/images/users/avatar-2.jpg',
        text: 'The languages only differ in their grammar',
    },
    {
        id: 2,
        userName: 'Theodore',
        avatar: 'assets/images/users/avatar-3.jpg',
        text: 'Everyone realizes why a new common language ',
    },
    {
        id: 3,
        userName: 'Michael',
        text: 'To an English person, it will seem like simplified',
    },
    {
        id: 4,
        userName: 'Tony Lindsey',
        avatar: 'assets/images/users/avatar-5.jpg',
        text: 'If several languages coalesce the grammar',
    },
    {
        id: 5,
        userName: 'Robert Wilke',
        text: 'Their separate existence is a myth',
    },
    {
        id: 6,
        userName: 'James',
        avatar: 'assets/images/users/avatar-7.jpg',
        text: 'The European languages are members.',
    },
    {
        id: 7,
        userName: 'Brian',
        text: 'At vero eos et accusamus et iusto odio',
    },
    {
        id: 8,
        userName: 'Aaron Nickel',
        avatar: 'assets/images/users/avatar-5.jpg',
        text: 'Itaque earum rerum hic tenetur a sapiente',
    }
];

const FILES: FileItem[] = [
    {
        id: 1,
        fileName: 'sales-assets.zip',
        fileSize: '2.3MB',
        previewImage: 'assets/images/projects/project-1.jpg'
    },
    {
        id: 2,
        fileName: 'new-contracts.docx',
        fileSize: '1.25MB',
        previewImage: 'assets/images/projects/project-2.jpg'
    }
];

export { ACTIVITYTIMELINE, MESSAGES, FILES };
import { KanbanBoardTaskItem, ListTaskItem } from "./tasks.model";

const avatarImg2 = 'assets/images/users/avatar-9.jpg';
const avatarImg3 = 'assets/images/users/avatar-3.jpg';
const avatarImg4 = 'assets/images/users/avatar-4.jpg';
const avatarImg5 = 'assets/images/users/avatar-5.jpg';
const avatarImg6 = 'assets/images/users/avatar-6.jpg';

const TODAYTASKS: ListTaskItem[] = [
    {
        id: 1,
        title: 'Draft the new contract document for sales team',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'Today 10am',
        completed: false,
        priority: 'High',
        stage: 'Todo',
        completedTasks: 3,
        totaltasks: 7,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: true },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
                replies: [{
                    id: 4,
                    author: 'Thelma Fridley',
                    text: 'i\'m in the middle of a timelapse animation myself!(Very different though :)',
                    posted_on: '6:30pm',
                    author_avatar: avatarImg4,
                }]
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 2,
        title: 'iOS App home page',
        assigned_to: 'James B',
        assignee_avatar: avatarImg3,
        due_date: 'Today 4pm',
        completed: false,
        stage: 'In-progress',
        priority: 'High',
        completedTasks: 2,
        totaltasks: 7,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 3,
        title: 'Write a release note',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg4,
        due_date: 'Today 4pm',
        completed: false,
        stage: 'In-progress',
        priority: 'Medium',
        completedTasks: 18,
        totaltasks: 21,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
]

const UPCOMINGTASKS: ListTaskItem[] = [
    {
        id: 4,
        title: 'Invite user to a project',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'Tomorrow 10am',
        stage: 'Todo',
        completed: false,
        priority: 'Low',
        completedTasks: 1,
        totaltasks: 12,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 5,
        title: 'Enable analytics tracking',
        assigned_to: 'James B',
        assignee_avatar: avatarImg5,
        due_date: '27 Aug 10am',
        completed: false,
        stage: 'Review',
        priority: 'Low',
        completedTasks: 13,
        totaltasks: 72,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 6,
        title: 'Code HTML email template',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: 'No Due Date',
        completed: false,
        stage: 'Review',
        priority: 'Medium',
        completedTasks: 0,
        totaltasks: 7,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
]

const OTHERTASKS: ListTaskItem[] = [
    {
        id: 7,
        title: 'Coordinate with business development',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'No Due Date',
        stage: 'Todo',
        completed: false,
        priority: 'High',
        completedTasks: 5,
        totaltasks: 14,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,

            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 8,
        title: 'Kanban board design',
        assigned_to: 'James B',
        assignee_avatar: avatarImg5,
        stage: 'Review',
        due_date: '30 Aug 10am',
        completed: false,
        priority: 'Low',
        completedTasks: 0,
        totaltasks: 8,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 9,
        title: 'Draft the new contract document for sales team',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: 'No Due Date',
        stage: 'Done',
        completed: false,
        priority: 'Medium',
        completedTasks: 3,
        totaltasks: 7,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
    {
        id: 10,
        title: 'Draft the new contract document for vendor Abc',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: '2 Sep 10am',
        completed: false,
        stage: 'Done',
        priority: 'Medium',
        completedTasks: 2,
        totaltasks: 7,
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            {
                id: 2,
                title: 'Organize meeting sales associates to understand need in detail',
                completed: false,
            },
            {
                id: 3,
                title: 'Make sure to cover every small details',
                completed: false,
            },
        ],
        description:
            // tslint:disable-next-line: max-line-length
            `
            <p>This is a task description with markup support</p>
            <p><br></p>
            <ul>
            <li>Select a text to reveal the toolbar.</li>
            <li>Edit rich document on-the-fly, so elastic!</li>
            </ul>
            <p><br></p>
            <p>End of air-mode area</p>
            `,
        attachments: [
            { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', previewImage: 'assets/images/projects/project-1.jpg' },
            { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB', previewImage: 'assets/images/projects/project-2.jpg' },
        ],
        comments: [
            {
                id: 1,
                author: 'Arya Stark',
                text: 'Should I review the last 3 years legal documents as well?',
                posted_on: '4:30am',
                author_avatar: avatarImg2,
            },
            {
                id: 2,
                author: 'Gary Somya',
                text: '@Arya FYI..I have created some general guidelines last year.',
                posted_on: '3:30am',
                author_avatar: avatarImg3,
            },
        ],
    },
]

const KANBANTASKS: KanbanBoardTaskItem[] = [
    {
        id: 1,
        title: 'Ubold v3.0 - Redesign',
        status: 'Pending',
        priority: 'High',
        userAvatar: 'assets/images/users/avatar-5.jpg',
        totalComments: 28,
        totalSubTasks: 10,
        subTaskCompleted: 1,
        dueDate: 'Jul 18, 2019',
    },
    {
        id: 2,
        title: 'Minton v3.0 - Redesign',
        status: 'Inprogress',
        priority: 'Normal',
        userAvatar: 'assets/images/users/avatar-6.jpg',
        totalComments: 21,
        totalSubTasks: 7,
        subTaskCompleted: 4,
        dueDate: 'Jul 20, 2019',
    },
    {
        id: 3,
        title: 'Shreyu v2.1 - Angular and Django',
        status: 'Review',
        priority: 'Low',
        userAvatar: 'assets/images/users/avatar-2.jpg',
        totalComments: 24,
        totalSubTasks: 2,
        subTaskCompleted: 1,
        dueDate: 'Jul 21, 2019',
    },
    {
        id: 4,
        title: 'Shreyu v2.1 - React, Webpack',
        status: 'Done',
        priority: 'High',
        userAvatar: 'assets/images/users/avatar-7.jpg',
        totalComments: 21,
        totalSubTasks: 5,
        subTaskCompleted: 5,
        dueDate: 'Jul 22, 2019',
    },
    {
        id: 5,
        title: 'Shreyu 2.2 - Vue.Js and Laravel',
        status: 'Pending',
        priority: 'Low',
        userAvatar: 'assets/images/users/avatar-3.jpg',
        totalComments: 2,
        totalSubTasks: 5,
        subTaskCompleted: 2,
        dueDate: 'Jul 18, 2019',
    },
    {
        id: 6,
        title: 'Shreyu 2.3 - Rails, NodeJs, Mean',
        status: 'Pending',
        priority: 'Medium',
        userAvatar: 'assets/images/users/avatar-4.jpg',
        totalComments: 24,
        totalSubTasks: 8,
        subTaskCompleted: 2,
        dueDate: 'Jul 21, 2019',
    },
    {
        id: 7,
        title: 'Shreyu - Landing page and UI Kit',
        status: 'Review',
        priority: 'Medium',
        userAvatar: 'assets/images/users/avatar-7.jpg',
        totalComments: 11,
        totalSubTasks: 6,
        subTaskCompleted: 4,
        dueDate: 'Jul 10, 2019',
    },
    {
        id: 8,
        title: 'Shreyu 3.0 - Scoping',
        status: 'Inprogress',
        priority: 'High',
        userAvatar: 'assets/images/users/avatar-8.jpg',
        totalComments: 10,
        totalSubTasks: 4,
        subTaskCompleted: 3,
        dueDate: 'Jul 24, 2019',
    }
];

// all tasks
const ALLTASKS = [...TODAYTASKS, ...UPCOMINGTASKS, ...OTHERTASKS]


export { ALLTASKS, TODAYTASKS, UPCOMINGTASKS, OTHERTASKS, KANBANTASKS };
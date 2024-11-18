interface CheckListItem {
    id: number;
    title: string;
    completed: boolean;
}

interface Comment {

    id: number;
    author: string;
    text: string;
    posted_on: string;
    author_avatar: string;
    replies?: Comment[];
}

interface AttachmentItem {
    id: number;
    filename: string;
    size: string;
    previewImage?: string;
}

export interface ListTaskItem {
    id?: number;
    title?: string;
    assignee_avatar?: string;
    assigned_to?: string;
    due_date?: string;
    description?: string;
    checklists?: CheckListItem[];
    attachments?: AttachmentItem[];
    comments?: Comment[];
    completed?: boolean;
    stage?: string;
    completedTasks?: number;
    totaltasks?: number;
    priority?: string;
}


// Kanban Board Data
export interface KanbanBoardTaskItem {
    id: number;
    title: string;
    status: string;
    priority: string;
    userAvatar: string;
    totalComments: number;
    totalSubTasks: number;
    subTaskCompleted: number;
    dueDate: string;
}

export interface Project {
    id: number;
    title: string;
    technology: string
    state: string;
    shortDesc?: string;
    totalTasks?: number;
    totalTasksCompleted?: number;
    totalTeamSize?: number;
    totalHoursSpent?: number;
    totalComments?: number;
    teamMembers: {
        image?: string;
        name: string;
        variant?: string;
    }[];
    progress?: number;
    startDate?: string;
    endDate?: string;
    totalBudget?: number;
    owner?: string;
}

export interface ProjectActivity {
    id: number;
    date: number;
    month: string;
    variant: string;
    memberName: string;
    description: string;
}

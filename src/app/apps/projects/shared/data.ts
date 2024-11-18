import { Project, ProjectActivity } from "./projects.model";

const PROJECTLIST: Project[] = [
    {
        id: 1,
        title: 'New Admin Design',
        state: 'Completed',
        technology: 'Web Design',
        shortDesc: 'With supporting text below as a natural lead-in to additional contenposuere erat a ante',
        startDate: '15 Jul',
        endDate: '15 Dec',
        totalTasks: 78,
        totalTasksCompleted: 60,
        totalTeamSize: 12,
        totalHoursSpent: 2500,
        totalComments: 214,
        teamMembers: [
            {
                image: 'assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/avatar-2.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/avatar-3.jpg',
                name: 'James Anderson',
            },
            {
                name: 'Helme',
                variant: 'primary'
            },
            {
                name: 'Helme',
                variant: 'primary'
            }
        ],
        progress: 100,
        totalBudget: 13250,
        owner: 'Rick Perry'
    },
    {
        id: 2,
        title: 'App Design and Development',
        state: 'Pending',
        technology: 'Andriod',
        shortDesc: 'A handful of model sentence structures, to generate Lorem Ipsum which looks reasonable',
        startDate: '15 Aug',
        endDate: '28 Nov',
        totalTasks: 85,
        totalComments: 103,
        teamMembers: [
            {
                image: 'assets/images/users/avatar-6.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/avatar-7.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/avatar-8.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 80,
        totalTasksCompleted: 70,
        totalTeamSize: 15,
        totalHoursSpent: 200,
        totalBudget: 45050,
        owner: 'Nick Perry',
    },
    {
        id: 3,
        title: 'Landing page Design',
        state: 'Completed',
        technology: 'Web Design',
        shortDesc: "You need to be sure there isn't anything embarrassing hidden in the middle of text",
        startDate: '15 Jul',
        endDate: '19 Nov',
        totalTasks: 42,
        totalComments: 65,
        teamMembers: [
            {
                name: 'Helme',
                variant: 'primary'
            },
            {
                image: 'assets/images/users/avatar-10.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/avatar-1.jpg',
                name: 'James Anderson',
            },
            {
                image: 'assets/images/users/avatar-3.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/avatar-5.jpg',
                name: 'Michael Zenaty',
            }
        ],
        progress: 100,
        totalTasksCompleted: 30,
        totalTeamSize: 12,
        totalHoursSpent: 2500,
        totalBudget: 13250,
        owner: 'Rick Perry',
    },
    {
        id: 4,
        title: 'Custom Software Development',
        state: 'Pending',
        technology: 'Andriod',
        shortDesc: "You need to be sure there isn't anything embarrassing hidden in the middle of text",
        startDate: '10 Jul',
        endDate: '02 Nov',
        totalTasks: 95,
        totalComments: 83,
        teamMembers: [
            {
                image: 'assets/images/users/avatar-5.jpg',
                name: 'Mat Helme',
            },
            {
                name: 'Kai Parker',
                variant: 'danger    '
            },
            {
                image: 'assets/images/users/avatar-9.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 68,
        totalTasksCompleted: 70,
        totalTeamSize: 16,
        totalHoursSpent: 2500,
        totalBudget: 13250,
        owner: 'Rick Perry',
    },
    {
        id: 5,
        title: 'Brand logo design',
        state: 'Completed',
        technology: 'Web Design',
        shortDesc: 'Everyone realizes why a new common language refuse to pay expensive translators.',
        startDate: '15 Jul',
        endDate: '13 Oct',
        totalTasks: 36,
        totalComments: 78,
        teamMembers: [
            {
                name: 'Dan Helme',
                variant: 'warning'
            },
            {
                image: 'assets/images/users/avatar-4.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/avatar-5.jpg',
                name: 'James Anderson',
            },
            {
                image: 'assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
        ],
        progress: 100,
        totalTasksCompleted: 20,
        totalTeamSize: 12,
        totalHoursSpent: 2500,
        totalBudget: 13250,
        owner: 'Rick Perry',
    },
    {
        id: 6,
        title: 'Multipurpose Landing Template',
        state: 'Completed',
        technology: 'Web Design',
        shortDesc: 'With supporting text below as a natural lead-in to additional contenposuere erat a ante',
        startDate: '15 Jul',
        endDate: '11 Oct',
        totalTasks: 30,
        totalComments: 148,
        teamMembers: [
            {
                image: 'assets/images/users/avatar-6.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/avatar-7.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/avatar-8.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 100,
        totalTasksCompleted: 30,
        totalTeamSize: 12,
        totalHoursSpent: 2500,
        totalBudget: 13250,
        owner: 'Rick Perry',
    },

];

const PROJECTACTIVITIES: ProjectActivity[] = [
    {
        id: 1,
        date: 9,
        month: 'Jan',
        variant: 'primary',
        memberName: 'Bryan',
        description: 'Neque porro quisquam est',
    },
    {
        id: 2,
        date: 8,
        month: 'Jan',
        variant: 'success',
        memberName: 'Everett',
        description: 'Ut enim ad minima veniam quis velit',
    },
    {
        id: 3,
        date: 8,
        month: 'Jan',
        variant: 'warning',
        memberName: 'Richard',
        description: 'Quis autem vel eum iure',
    },
    {
        id: 4,
        date: 8,
        month: 'Jan',
        variant: 'info',
        memberName: 'Jery',
        description: 'Quis autem vel eum iure',
    },
    {
        id: 5,
        date: 7,
        month: 'Jan',
        variant: 'primary',
        memberName: 'Bryan',
        description: 'Neque porro quisquam est',
    },
    {
        id: 6,
        date: 6,
        month: 'Jan',
        variant: 'success',
        memberName: 'Everett',
        description: 'Ut enim ad minima veniam quis velit',
    },
    {
        id: 7,
        date: 5,
        month: 'Jan',
        variant: 'warning',
        memberName: 'Richard',
        description: 'Quis autem vel eum iure',
    },

];

export { PROJECTLIST, PROJECTACTIVITIES };
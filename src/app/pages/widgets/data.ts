import { Activity } from "src/app/pages/widgets/activity/activity.model";
import { OverviewItem } from "src/app/shared/widget/overview/overview.model";
import { ChartWidget } from "./chart-widget/chart-widget.model";
import { EventSchedule } from "./events/events.model";
import { StatisticsWidget1 } from "./statistics-widget-one/statistics-widget-one.model";
import { StatisticsWidget2 } from "./statistics-widget-two/statistics-widget-two.model";
import { UserProfile } from "./user-profile/shared/user-profile.model";


const STATISTICSWIDGETDATA1: StatisticsWidget1[] = [
    {
        id: 1,
        title: 'Today Revenue',
        icon: 'shopping-bag',
        variant: 'primary',
        stats: '$851'
    },
    {
        id: 2,
        title: 'Product Sold',
        icon: 'coffee',
        variant: 'warning',
        stats: 2541
    },
    {
        id: 3,
        title: 'New Customers',
        icon: 'users',
        variant: 'success',
        stats: 654
    },
    {
        id: 4,
        title: 'New Visitors',
        icon: 'file-text',
        variant: 'info',
        stats: 854
    }
];

const STATISTICSWIDGETDATA2: StatisticsWidget2[] = [
    {
        id: 1,
        title: 'Today Revenue',
        subTitle: '36% Avg',
        stats: '$6512',
        progress: 32,
        variant: 'primary'
    },
    {
        id: 2,
        title: 'Product Sold',
        subTitle: '36 Daily Avg',
        stats: 352,
        progress: 60,
        variant: 'warning'
    },
    {
        id: 3,
        title: 'New Customers',
        subTitle: '3 Daily Avg',
        stats: 7580,
        progress: 60,
        variant: 'success'
    },
    {
        id: 4,
        title: 'New Visitors',
        subTitle: '300 Daily Avg',
        stats: 6985,
        progress: 45,
        variant: 'success'
    }
];

const CHARTDATA: ChartWidget[] = [
    {
        id: 1,
        title: 'Visits',
        stats: '21,000',
        chartColor: ['#5369f8'],
        chartData: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39]
    },
    {
        id: 2,
        title: 'Customers',
        stats: '1100',
        chartColor: ['#43d39e'],
        chartData: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39]
    },
    {
        id: 3,
        title: 'Revenue',
        stats: '$201,200',
        chartColor: ['#f77e53'],
        chartData: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39]
    }
];

const USERPROFILE1: UserProfile = {
    id: 1,
    userName: 'Shreyu N',
    designation: 'User Experience Specialist',
    profileImage: 'assets/images/users/avatar-7.jpg',
    about: 'Hi I\'m Shreyu.I am user experience and user interface designer. I have been working on UI & UX since last 10 years.',
    tags: ['UI & UX', 'Frontend Development']
};

const USERPROFILE2: UserProfile = {
    id: 2,
    userName: 'Shreyu N',
    designation: 'User Experience Specialist',
    profileImage: 'assets/images/users/avatar-7.jpg',
    coverImage: 'assets/images/covers/2.jpg'
};

const USERPROFILE3: UserProfile = {
    id: 3,
    userName: 'Shreyu N',
    designation: 'User Experience Specialist',
    profileImage: 'assets/images/users/avatar-7.jpg',
    location: 'New York, USA',
    about: 'Hi I\'m Shreyu.I am foodie and love to eat different cuisine!',
    recentPhotos: ['assets/images/small/img-4.jpg', 'assets/images/small/img-5.jpg', 'assets/images/small/img-6.jpg']

};

const USERPROFILE4: UserProfile = {
    id: 4,
    userName: 'Shreyu N',
    designation: 'User Experience Specialist',
    profileImage: 'assets/images/users/avatar-7.jpg',
    location: 'New York, USA',
};

const USERPROFILE5: UserProfile = {
    id: 3,
    userName: 'Shreyu N',
    designation: 'Designer | Creative | Thinker',
    profileImage: 'assets/images/users/avatar-7.jpg',
    accontId: '@shreyu'
};

const CALENDAREVENTS: EventSchedule[] = [
    {
        id: 1,
        title: 'UX Planning Meeting',
        time: '7:30 AM - 10:00 AM'
    },
    {
        id: 2,
        title: 'Hyper v3 Scope Review',
        time: '10:30 AM - 11:45 AM'
    },
    {
        id: 3,
        title: 'Ubold v4 Brainstorming',
        time: '12:15 PM - 02:00 PM'
    },
    {
        id: 4,
        title: 'Shreyu React Planning',
        time: '5:30 PM - 06:15 PM'
    }
];

const OVERVIEWITEMS: OverviewItem[] = [
    {
        title: 'Total Visitors',
        stats: 121000,
        icon: 'users'
    },
    {
        title: 'Total Product Views',
        stats: 21000,
        icon: 'image'
    },
    {
        title: 'Revenue Per Visitor',
        stats: '$21.5',
        icon: 'shopping-bag'
    },
    {
        title: 'Revenue Per Visitor',
        stats: 8547,
        icon: 'aperture'
    },

];


const ACTIVITIES: Activity[] = [
    {
        id: 1,
        avatar: 'assets/images/users/avatar-7.jpg',
        activityTitle: '<a href="javascript:void(0)" class="fw-bold">Shreyu</a> has attached design-draft.sketch in project<span class="fw-bold text-primary"> Admin </span>',
        time: '2 Min Ago'
    },
    {
        id: 2,
        userInitial: 'G',
        variant: 'primary',
        activityTitle: `<a href="javascript:void(0)" class="fw-bold">Greeva</a> has commented on project <span class="fw-bold text-primary">Admin</span>`,
        time: '12 Min Ago'
    },
    {
        id: 3,
        avatar: 'assets/images/users/avatar-9.jpg',
        activityTitle: ` <a href="javascript:void(0)" class="fw-bold">Mannat</a> has reacted with <i class='uil uil-thumbs-up text-success fs-13'></i> on comment from <span class="fw-bold text-primary">Shreyu</span> on project <span class="fw-bold text-primary">Admin</span>`,
        time: '14 Min ago'
    },
    {
        id: 4,
        userInitial: 'D',
        variant: 'success',
        activityTitle: `<a href="javascript:void(0)" class="fw-bold">Dhyani</a> has reacted with <i class='uil uil-heart-sign text-danger fs-13'></i> on comment from <span class="fw-bold text-primary">Shreyu</span> on project <span class="fw-bold text-primary">Admin</span>`,
        time: '14 Min Ago',
    }
];

export { STATISTICSWIDGETDATA1, STATISTICSWIDGETDATA2, CHARTDATA, USERPROFILE1, USERPROFILE2, USERPROFILE3, USERPROFILE4, USERPROFILE5, CALENDAREVENTS, OVERVIEWITEMS, ACTIVITIES }
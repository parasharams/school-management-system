import { ChartStatistics } from "src/app/shared/widget/chart-statistics-widget/chart-statistics.model";
import { Member } from "src/app/shared/widget/members/members.model";
import { OverviewItem } from "src/app/shared/widget/overview/overview.model";
import { TaskItem } from "src/app/shared/widget/task-list/task-list.model";
import { OrderItem } from "./ecommerce.model";

const CHARTSTATISTICSDATA: ChartStatistics[] = [
    {
        mainTitle: 'Today Revenue',
        value: '$2100',
        subValue: 10.21,
        chartType: 'area',
        chartData: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        chartColors: ['#5369f8'],
    },
    {
        mainTitle: 'Product Sold',
        value: 558,
        subValue: 5.05,
        chartType: 'area',
        chartData: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        chartColors: ['#f77e53'],
    },
    {
        mainTitle: 'New Customers',
        value: 65,
        subValue: 25.16,
        chartType: 'area',
        chartData: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        chartColors: ['#43d39e'],
    },
    {
        mainTitle: 'New Visitors',
        value: 958,
        subValue: 5.05,
        chartType: 'area',
        chartData: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        chartColors: ['#ffbe0b'],
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
    }
];

const RECENTORDERS: OrderItem[] = [
    {
        id: 1,
        order_id: '#98754',
        productName: 'ASOS Ridley High',
        customer: 'Otto B',
        price: 79.49,
        status: 'Pending'
    },
    {
        id: 2,
        order_id: '#98753',
        productName: 'Marco Lightweight Shirt',
        customer: 'Mark P',
        price: 125.49,
        status: 'Delivered'
    },
    {
        id: 3,
        order_id: '#98752',
        productName: 'Half Sleeve Shirt',
        customer: 'Dave B',
        price: 35.49,
        status: 'Declined'
    },
    {
        id: 4,
        order_id: '#98751',
        productName: 'Lightweight Jacket',
        customer: 'Shreyu N',
        price: 49.49,
        status: 'Delivered'
    },
    {
        id: 5,
        order_id: '#98750',
        productName: 'Marco Shoes',
        customer: 'Rik N',
        price: 69.49,
        status: 'Declined'
    }
];

const MEMBERS: Member[] = [
    {
        id: 1,
        name: 'Shreyu N',
        avatar: 'assets/images/users/avatar-7.jpg',
        designation: 'Senior Sales Guy',
    },
    {
        id: 2,
        name: 'Greeva Y',
        avatar: 'assets/images/users/avatar-9.jpg',
        designation: 'Social Media Campaign',
    },
    {
        id: 3,
        name: 'Nik G',
        avatar: 'assets/images/users/avatar-4.jpg',
        designation: 'Inventory Manager',
    },
    {
        id: 4,
        name: 'Hardik G',
        avatar: 'assets/images/users/avatar-1.jpg',
        designation: 'Sales Person',
    },
    {
        id: 5,
        name: 'GB Patel G',
        avatar: 'assets/images/users/avatar-8.jpg',
        designation: 'Sales Person',
    }
];

const TASKLIST: TaskItem[] = [
    {
        id: 1,
        name: 'Draft the new contract document for sales team',
        dueDate: '24 Aug, 2019'
    },
    {
        id: 2,
        name: 'iOS App home page',
        dueDate: '23 Aug, 2019'
    },
    {
        id: 3,
        name: 'Write a release note for Shreyu',
        dueDate: '22 Aug, 2019'
    },
    {
        id: 4,
        name: 'Invite Greeva to a project shreyu admin',
        dueDate: '21 Aug, 2019'
    },
    {
        id: 5,
        name: 'Enable analytics tracking for main website',
        dueDate: '20 Aug, 2019'
    },
    {
        id: 6,
        name: 'Invite user to a project',
        dueDate: '18 Aug, 2019'
    },
    {
        id: 7,
        name: 'Write a release note',
        dueDate: '14 Aug, 2019'
    }
];



export { CHARTSTATISTICSDATA, OVERVIEWITEMS, RECENTORDERS, MEMBERS, TASKLIST };
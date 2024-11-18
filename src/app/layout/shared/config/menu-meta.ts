import { MenuItem } from '../models/menu.model';

// menu items for vertcal and detached layout
const MENU_ITEMS: MenuItem[] = [
    {
        key: 'apps-home',
        label: 'Home',
        isTitle: false,
        icon: 'home',
        link: '',
    },
    {
        key: 'apps-class',
        label: 'Class',
        isTitle: false,
        icon: 'bookmark',
        collapsed: true,
        children: [
            {
                key: 'add-class',
                label: 'Add Class',
                link: '/admin/class',
                parentKey: 'apps-class',
            },
            {
                key: 'class-fees',
                label: 'Class Fees',
                link: '/admin/class-fees',
                parentKey: 'apps-class',
            },
        ],
    },
    {
        key: 'apps-subject',
        label: 'Subjects',
        isTitle: false,
        icon: 'home',
        link: '/admin/subjects',
    },
    {
        key: 'apps-teachers',
        label: 'Teachers',
        isTitle: false,
        icon: 'bookmark',
        collapsed: true,
        children: [
            {
                key: 'add-teacher',
                label: 'Add Teachers',
                link: '/admin/teacher',
                parentKey: 'apps-teachers',
            },
            {
                key: 'add-teacher-subject',
                label: 'Teachers Subject',
                link: '/admin/teacher-subject',
                parentKey: 'apps-teachers',
            },
            {
                key: 'add-expense',
                label: 'Add Expense',
                link: '/admin/expense',
                parentKey: 'apps-teachers',
            },
            {
                key: 'add-expense-details',
                label: 'Expense Details',
                link: '/admin/expense-details',
                parentKey: 'apps-teachers',
            },
        ],
    },
    {
        key: 'apps-students',
        label: 'Students',
        isTitle: false,
        icon: 'bookmark',
        collapsed: true,
        children: [
            {
                key: 'add-student',
                label: 'Add Student',
                link: '/admin/students',
                parentKey: 'apps-students',
            },
            {
                key: 'student-list',
                label: 'Student List',
                link: '/admin/studentlist',
                parentKey: 'apps-students',
            },
        ],
    },
    {
        key: 'apps-examination',
        label: 'Examination',
        isTitle: false,
        icon: 'bookmark',
        collapsed: true,
        children: [
            {
                key: 'add-exam',
                label: 'Add Exam',
                link: '/admin/exam',
                parentKey: 'apps-examination',
            },
            {
                key: 'add-subject-marks',
                label: 'Add Subject Marks',
                link: '/admin/subject-marks',
                parentKey: 'apps-examination',
            },
            {
                key: 'add-marks',
                label: 'Add Marks',
                link: '/admin/marks',
                parentKey: 'apps-examination',
            },
            {
                key: 'mark-details',
                label: 'Mark Details',
                link: '/admin/mark-details',
                parentKey: 'apps-examination',
            },
        ],
    },
    {
        key: 'apps-attendance',
        label: 'Attendance',
        isTitle: false,
        icon: 'bookmark',
        collapsed: true,
        children: [
            {
                key: 'student-attendance',
                label: 'Student Attendance',
                link: '/admin/student-attendance',
                parentKey: 'apps-attendance',
            },
            {
                key: 'student-attendance-details',
                label: 'Student Attendance Details',
                link: '/admin/student-attendance-details',
                parentKey: 'apps-attendance',
            },
            {
                key: 'teacher-attendance',
                label: 'Teacher Attendance',
                link: '/admin/teacher-attendance',
                parentKey: 'apps-attendance',
            },
            {
                key: 'teacher-attendance-details',
                label: 'Teacher Attendance Details',
                link: '/admin/teacher-attendance-details',
                parentKey: 'apps-attendance',
            },
        ],
    },
    {
        key: 'apps-result',
        label: 'Results',
        isTitle: false,
        icon: 'home',
        link: '/admin/results',
    },
    
    // {
    //     key: 'apps-academics',
    //     label: 'Academics',
    //     isTitle: false,
    //     icon: 'user',
    //     collapsed: true,
    //     children: [
    //         {
    //             key: 'apps-year',
    //             label: 'Years',
    //             link: '/academics/year',
    //             parentKey: 'apps-academics',
    //         },
    //         {
    //             key: 'apps-class',
    //             label: 'Class',
    //             link: '/academics/class',
    //             parentKey: 'apps-academics',
    //         },
    //         {
    //             key: 'apps-student',
    //             label: 'Student',
    //             link: '/academics/student',
    //             parentKey: 'apps-academics',
    //         },
    //         {
    //             key: 'apps-teacher',
    //             label: 'Teacher',
    //             link: '/academics/teacher',
    //             parentKey: 'apps-academics',
    //         },
    //         {
    //             key: 'apps-subject',
    //             label: 'Subject',
    //             link: '/academics/subject',
    //             parentKey: 'apps-academics',
    //         },            
    //         {
    //             key: 'apps-exams',
    //             label: 'Exam',
    //             link: '/academics/exam',
    //             parentKey: 'apps-academics',
    //         },
    //     ],
    // },
    // {
    //     key: 'apps-exam',
    //     label: 'Examination',
    //     isTitle: false,
    //     icon: 'bookmark',
    //     collapsed: true,
    //     children: [
    //         {
    //             key: 'apps-subject-marks',
    //             label: 'Manage Subject Mark',
    //             link: '/exam/exam-subject-marks',
    //             parentKey: 'apps-exam',
    //         },
    //         {
    //             key: 'apps-student-marks',
    //             label: 'Student Marks',
    //             link: '/exam/student-marks',
    //             parentKey: 'apps-exam',
    //         },
    //     ],
    // },
    // {
    //     key: 'apps-file-manager',
    //     label: 'Result',
    //     isTitle: false,
    //     icon: 'file-plus',
    //     link: '/exam/result',
    // },
    // {
    //     key: 'forms',
    //     label: 'Forms',
    //     isTitle: false,
    //     icon: 'bookmark',
    //     collapsed: true,
    //     children: [
    //         { key: 'form-basic', label: 'Basic Elements', link: '/forms/basic', parentKey: 'forms' },
    //         { key: 'form-advanced', label: 'Advanced', link: '/forms/advanced', parentKey: 'forms' },
    //         { key: 'form-validation', label: 'Validation', link: '/forms/validation', parentKey: 'forms' },
    //         { key: 'form-wizard', label: 'Wizard', link: '/forms/wizard', parentKey: 'forms' },
    //         { key: 'form-editors', label: 'Editors', link: '/forms/editors', parentKey: 'forms' },
    //         { key: 'form-upload', label: 'File Uploads', link: '/forms/upload', parentKey: 'forms' }
    //     ],
    // },
    //         {
    //             key: 'tables',
    //             label: 'Tables',
    //             isTitle: false,
    //             icon: 'grid',
    //             collapsed: true,
    //             children: [
    //                 { key: 'table-basic', label: 'Basic', link: '/tables/basic', parentKey: 'tables' },
    //                 { key: 'table-advanced', label: 'Advanced Tables', link: '/tables/advanced', parentKey: 'tables' },
    //             ],
    //         },
];

// menu items for two column menu layout 
const TWO_COl_MENU_ITEMS: MenuItem[] = [
    // {
    //     key: 'dashboard',
    //     icon: 'home',
    //     label: 'Dashboard',
    //     isTitle: true,
    //     children: [
    //         {
    //             key: 'ds-ecommerce',
    //             label: 'Ecommerce',
    //             link: '/dashboard/ecommerce',
    //             parentKey: 'dashboard',
    //         },
    //         {
    //             key: 'ds-analytics',
    //             label: 'Analytics',
    //             link: '/dashboard/analytics',
    //             parentKey: 'dashboard',
    //         }
    //     ],
    // },
    // {
    //     key: 'apps',
    //     icon: 'grid',
    //     label: 'Apps',
    //     isTitle: true,
    //     children: [
    //         {
    //             key: 'apps-calendar',
    //             label: 'Calendar',
    //             isTitle: false,
    //             icon: 'calendar',
    //             link: '/apps/calendar',
    //             parentKey: 'apps',
    //         },
    //         {
    //             key: 'apps-chat',
    //             label: 'Chat',
    //             isTitle: false,
    //             icon: 'message-square',
    //             link: '/apps/chat',
    //             parentKey: 'apps',
    //         },
    //         {
    //             key: 'apps-email',
    //             label: 'Email',
    //             isTitle: false,
    //             icon: 'mail',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 {
    //                     key: 'email-inbox',
    //                     label: 'Inbox',
    //                     link: '/apps/email/inbox',
    //                     parentKey: 'apps-email',
    //                 },
    //                 {
    //                     key: 'email-read-email',
    //                     label: 'Read Email',
    //                     link: '/apps/email/details',
    //                     parentKey: 'apps-email',
    //                 },
    //                 {
    //                     key: 'email-compose-email',
    //                     label: 'Compose Email',
    //                     link: '/apps/email/compose',
    //                     parentKey: 'apps-email',
    //                 },
    //             ],
    //         },
    //         {
    //             key: 'apps-projects',
    //             label: 'Projects',
    //             isTitle: false,
    //             icon: 'briefcase',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 { key: 'project-list', label: 'List', link: '/apps/projects/list', parentKey: 'apps-projects' },
    //                 {
    //                     key: 'project-details',
    //                     label: 'Detail',
    //                     link: '/apps/projects/details',
    //                     parentKey: 'apps-projects',
    //                 }
    //             ],
    //         },
    //         {
    //             key: 'apps-tasks',
    //             label: 'Tasks',
    //             isTitle: false,
    //             icon: 'clipboard',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 { key: 'task-list', label: 'List', link: '/apps/tasks/list', parentKey: 'apps-tasks' },
    //                 { key: 'task-kanban', label: 'Kanban Board', link: '/apps/tasks/kanban', parentKey: 'apps-tasks' },
    //             ],
    //         },
    //         {
    //             key: 'apps-file-manager',
    //             label: 'File Manager',
    //             isTitle: false,
    //             icon: 'folder-plus',
    //             link: '/apps/file-manager',
    //             parentKey: 'apps',
    //         },
    //     ],
    // },
    // {
    //     key: 'extra-pages',
    //     icon: 'file-text',
    //     label: 'Pages',
    //     isTitle: true,
    //     children: [
    //         { key: 'page-starter', label: 'Starter', link: '/pages/starter', parentKey: 'extra-pages' },
    //         { key: 'page-profile', label: 'Profile', link: '/pages/profile', parentKey: 'extra-pages' },
    //         { key: 'page-activity', label: 'Activity', link: '/pages/activity', parentKey: 'extra-pages' },
    //         { key: 'page-invoice', label: 'Invoice', link: '/pages/invoice', parentKey: 'extra-pages' },
    //         { key: 'page-pricing', label: 'Pricing', link: '/pages/pricing', parentKey: 'extra-pages' },
    //         {
    //             key: 'page-maintenance',
    //             label: 'Maintenance',

    //             link: '/maintenance',
    //             parentKey: 'extra-pages',
    //         },
    //         { key: 'page-error-404', label: 'Error - 404', link: '/error-404', parentKey: 'extra-pages' },
    //         { key: 'page-error-500', label: 'Error - 500', link: '/error-500', parentKey: 'extra-pages' },
    //     ],
    // },
    // {
    //     key: 'components',
    //     icon: 'package',
    //     label: 'Components',
    //     isTitle: true,
    //     children: [
    //         { key: 'ui-elements', label: 'UI Elements', isTitle: false, icon: 'package', link: '/ui-element', parentKey: 'components' },
    //         {
    //             key: 'icons',
    //             label: 'Icons',
    //             isTitle: false,
    //             icon: 'cpu',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'icon-unicons', label: 'Unicons', link: '/icons/unicon', parentKey: 'icons' },
    //                 { key: 'icon-feather', label: 'Feather', link: '/icons/feather', parentKey: 'icons' },
    //                 { key: 'icon-bootstrap', label: 'Bootstrap', link: '/icons/bootstrap', parentKey: 'icons' },
    //             ],
    //         },
    //         { key: 'charts', label: 'Charts', isTitle: false, icon: 'bar-chart-2', link: '/charts', parentKey: 'components' },
    //         {
    //             key: 'forms',
    //             label: 'Forms',
    //             isTitle: false,
    //             icon: 'bookmark',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'form-basic', label: 'Basic Elements', link: '/forms/basic', parentKey: 'forms' },
    //                 { key: 'form-advanced', label: 'Advanced', link: '/forms/advanced', parentKey: 'forms' },
    //                 { key: 'form-validation', label: 'Validation', link: '/forms/validation', parentKey: 'forms' },
    //                 { key: 'form-wizard', label: 'Wizard', link: '/forms/wizard', parentKey: 'forms' },
    //                 { key: 'form-editors', label: 'Editors', link: '/forms/editors', parentKey: 'forms' },
    //                 { key: 'form-upload', label: 'File Uploads', link: '/forms/upload', parentKey: 'forms' }
    //             ],
    //         },
    //         {
    //             key: 'tables',
    //             label: 'Tables',
    //             isTitle: false,
    //             icon: 'grid',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'table-basic', label: 'Basic', link: '/tables/basic', parentKey: 'tables' },
    //                 { key: 'table-advanced', label: 'Advanced Tables', link: '/tables/advanced', parentKey: 'tables' },
    //             ],
    //         },
    //         {
    //             key: 'maps',
    //             label: 'Maps',
    //             isTitle: false,
    //             icon: 'map',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'maps-googlemaps', label: 'Google Maps', link: '/maps/googlemaps', parentKey: 'maps' },
    //                 { key: 'maps-vectormaps', label: 'Vector Maps', link: '/maps/vectormaps', parentKey: 'maps' },
    //             ],
    //         },
    //         {
    //             key: 'menu-levels',
    //             label: 'Menu Levels',
    //             isTitle: false,
    //             icon: 'share-2',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 {
    //                     key: 'menu-levels-1-1',
    //                     label: 'Level 1.1',
    //                     link: '/',
    //                     parentKey: 'menu-levels',
    //                     collapsed: true,
    //                     children: [
    //                         {
    //                             key: 'menu-levels-2-1',
    //                             label: 'Level 2.1',
    //                             link: '/',
    //                             parentKey: 'menu-levels-1-1',
    //                             collapsed: true,
    //                             children: [
    //                                 {
    //                                     key: 'menu-levels-3-1',
    //                                     label: 'Level 3.1',
    //                                     link: '/',
    //                                     parentKey: 'menu-levels-2-1',
    //                                 },
    //                                 {
    //                                     key: 'menu-levels-3-2',
    //                                     label: 'Level 3.2',
    //                                     link: '/',
    //                                     parentKey: 'menu-levels-2-1',
    //                                 },
    //                             ],
    //                         },
    //                         { key: 'menu-levels-2-2', label: 'Level 2.2', link: '/', parentKey: 'menu-levels-1-1' },
    //                     ],
    //                 },
    //                 { key: 'menu-levels-1-2', label: 'Level 1.2', link: '/', parentKey: 'menu-levels' },
    //             ],
    //         },
    //     ],
    // },
    // { key: 'widgets', label: 'Widgets', isTitle: false, icon: 'gift', link: '/widgets' },
];

// menu items for horizontal layout
const HORIZONTAL_MENU_ITEMS: MenuItem[] = [
    // {
    //     key: 'dashboard',
    //     icon: 'home',
    //     label: 'Dashboards',
    //     isTitle: true,
    //     collapsed: true,
    //     children: [
    //         {
    //             key: 'ds-ecommerce',
    //             label: 'Ecommerce',
    //             link: '/dashboard/ecommerce',
    //             parentKey: 'dashboard',
    //         },
    //         {
    //             key: 'ds-analytics',
    //             label: 'Analytics',
    //             link: '/dashboard/analytics',
    //             parentKey: 'dashboard',
    //         }
    //     ],
    // },
    // {
    //     key: 'apps',
    //     icon: 'layers',
    //     label: 'Apps',
    //     isTitle: true,
    //     collapsed: true,
    //     children: [
    //         {
    //             key: 'apps-calendar',
    //             label: 'Calendar',
    //             isTitle: false,
    //             icon: 'calendar',
    //             link: '/apps/calendar',
    //             parentKey: 'apps',
    //         },
    //         {
    //             key: 'apps-chat',
    //             label: 'Chat',
    //             isTitle: false,
    //             icon: 'message-square',
    //             link: '/apps/chat',
    //             parentKey: 'apps',
    //         },
    //         {
    //             key: 'apps-email',
    //             label: 'Email',
    //             isTitle: false,
    //             icon: 'mail',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 {
    //                     key: 'email-inbox',
    //                     label: 'Inbox',
    //                     link: '/apps/email/inbox',
    //                     parentKey: 'apps-email',
    //                 },
    //                 {
    //                     key: 'email-read-email',
    //                     label: 'Read Email',
    //                     link: '/apps/email/details',
    //                     parentKey: 'apps-email',
    //                 },
    //                 {
    //                     key: 'email-compose-email',
    //                     label: 'Compose Email',
    //                     link: '/apps/email/compose',
    //                     parentKey: 'apps-email',
    //                 },
    //             ],
    //         },
    //         {
    //             key: 'apps-projects',
    //             label: 'Projects',
    //             isTitle: false,
    //             icon: 'briefcase',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 { key: 'project-list', label: 'List', link: '/apps/projects/list', parentKey: 'apps-projects' },
    //                 {
    //                     key: 'project-details',
    //                     label: 'Detail',
    //                     link: '/apps/projects/details',
    //                     parentKey: 'apps-projects',
    //                 },
    //             ],
    //         },
    //         {
    //             key: 'apps-tasks',
    //             label: 'Tasks',
    //             isTitle: false,
    //             icon: 'clipboard',
    //             parentKey: 'apps',
    //             collapsed: true,
    //             children: [
    //                 { key: 'task-list', label: 'List', link: '/apps/tasks/list', parentKey: 'apps-tasks' },
    //                 { key: 'task-kanban', label: 'Kanban Board', link: '/apps/tasks/kanban', parentKey: 'apps-tasks' },
    //             ],
    //         },
    //         {
    //             key: 'apps-file-manager',
    //             label: 'File Manager',
    //             isTitle: false,
    //             icon: 'folder-plus',
    //             link: '/apps/file-manager',
    //             parentKey: 'apps',
    //         },
    //     ],
    // },
    // {
    //     key: 'components',
    //     icon: 'briefcase',
    //     label: 'Components',
    //     isTitle: true,
    //     collapsed: true,
    //     children: [
    //         { key: 'ui-elements', label: 'UI Elements', isTitle: false, icon: 'package', link: '/ui-element', parentKey: 'components' },
    //         { key: 'widgets', label: 'Widgets', isTitle: false, icon: 'gift', link: '/widgets', parentKey: 'components' },

    //         {
    //             key: 'forms',
    //             label: 'Forms',
    //             isTitle: false,
    //             icon: 'bookmark',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'form-basic', label: 'Basic Elements', link: '/forms/basic', parentKey: 'forms' },
    //                 { key: 'form-advanced', label: 'Advanced', link: '/forms/advanced', parentKey: 'forms' },
    //                 { key: 'form-validation', label: 'Validation', link: '/forms/validation', parentKey: 'forms' },
    //                 { key: 'form-wizard', label: 'Wizard', link: '/forms/wizard', parentKey: 'forms' },
    //                 { key: 'form-editors', label: 'Editors', link: '/forms/editors', parentKey: 'forms' },
    //                 { key: 'form-upload', label: 'File Uploads', link: '/forms/upload', parentKey: 'forms' }
    //             ],
    //         },
    //         { key: 'charts', label: 'Charts', isTitle: false, icon: 'bar-chart-2', link: '/charts', parentKey: 'components' },
    //         {
    //             key: 'tables',
    //             label: 'Tables',
    //             isTitle: false,
    //             icon: 'grid',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'table-basic', label: 'Basic', link: '/tables/basic', parentKey: 'tables' },
    //                 { key: 'table-advanced', label: 'Advanced Tables', link: '/tables/advanced', parentKey: 'tables' },
    //             ],
    //         },
    //         {
    //             key: 'icons',
    //             label: 'Icons',
    //             isTitle: false,
    //             icon: 'cpu',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'icon-unicons', label: 'Unicons', link: '/icons/unicon', parentKey: 'icons' },
    //                 { key: 'icon-feather', label: 'Feather', link: '/icons/feather', parentKey: 'icons' },
    //                 { key: 'icon-bootstrap', label: 'Bootstrap', link: '/icons/bootstrap', parentKey: 'icons' },
    //             ],
    //         },
    //         {
    //             key: 'maps',
    //             label: 'Maps',
    //             isTitle: false,
    //             icon: 'map',
    //             parentKey: 'components',
    //             collapsed: true,
    //             children: [
    //                 { key: 'maps-googlemaps', label: 'Google Maps', link: '/maps/googlemaps', parentKey: 'maps' },
    //                 { key: 'maps-vectormaps', label: 'Vector Maps', link: '/maps/vectormaps', parentKey: 'maps' },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     key: 'extra-pages',
    //     label: 'Pages',
    //     isTitle: false,
    //     icon: 'file-text',
    //     collapsed: true,
    //     children: [
    //         { key: 'page-starter', label: 'Starter', isTitle: false, link: '/pages/starter', parentKey: 'extra-pages' },
    //         { key: 'page-profile', label: 'Profile', isTitle: false, link: '/pages/profile', parentKey: 'extra-pages' },
    //         { key: 'page-activity', label: 'Activity', isTitle: false, link: '/pages/activity', parentKey: 'extra-pages' },
    //         { key: 'page-invoice', label: 'Invoice', isTitle: false, link: '/pages/invoice', parentKey: 'extra-pages' },
    //         { key: 'page-pricing', label: 'Pricing', isTitle: false, link: '/pages/pricing', parentKey: 'extra-pages' },
    //         {
    //             key: 'page-maintenance',
    //             label: 'Maintenance',
    //             isTitle: false,
    //             link: '/maintenance',
    //             parentKey: 'extra-pages',
    //         },
    //         { key: 'page-error-404', label: 'Error - 404', isTitle: false, link: '/error-404', parentKey: 'extra-pages' },
    //         { key: 'page-error-500', label: 'Error - 500', isTitle: false, link: '/error-500', parentKey: 'extra-pages' },
    //     ],
    // }

];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
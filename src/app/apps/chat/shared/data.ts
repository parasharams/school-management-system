import { ChatMessage, ChatUser, MessageItem } from "./chat.model";

//list of chat users
const USERS: ChatUser[] = [
    {
        id: 1,
        name: 'Brandon Smith',
        avatar: 'assets/images/users/avatar-2.jpg',
        lastMessage: 'How are you today?',
        totalUnread: 3,
        lastMessageOn: '5:30am',
        userStatus: 'offline'
    },
    {
        id: 2,
        name: 'Maria C',
        avatar: 'assets/images/users/avatar-10.jpg',
        lastMessage: 'Hey! a reminder for tomorrow\'s meeting?',
        totalUnread: 0,
        lastMessageOn: 'Thu',
        userStatus: 'online'
    },
    {
        id: 3,
        name: 'Dominic A',
        avatar: 'assets/images/users/avatar-8.jpg',
        lastMessage: 'Are we going to have this week\'s planning meeting?',
        totalUnread: 0,
        lastMessageOn: '4:30 am',
        userStatus: 'busy'

    },
    {
        id: 4,
        name: 'Ronda D',
        avatar: 'assets/images/users/avatar-9.jpg',
        lastMessage: 'Please check these design assets..',
        totalUnread: 0,
        lastMessageOn: 'Wed',
        userStatus: 'online'
    },
    {
        id: 5,
        name: 'Michael H',
        avatar: 'assets/images/users/avatar-3.jpg',
        lastMessage: 'Are you free for 15 mins? I would like to discuss something',
        totalUnread: 25,
        lastMessageOn: 'Tue',
        userStatus: 'offline'
    },
    {
        id: 6,
        name: 'Thomas R',
        avatar: 'assets/images/users/avatar-5.jpg',
        lastMessage: 'Let\'s have meeting today between me, you and Tony...',
        totalUnread: 0,
        lastMessageOn: 'Tue',
        userStatus: 'offline'
    },
    {
        id: 7,
        name: 'Thomas J',
        avatar: 'assets/images/users/avatar-6.jpg',
        lastMessage: 'How are you?',
        totalUnread: 1,
        lastMessageOn: 'Tue',
        userStatus: 'offline'
    },
    {
        id: 8,
        name: 'Rikcy J',
        avatar: 'assets/images/users/avatar-1.jpg',
        lastMessage: 'Are you interested in learning?',
        totalUnread: 0,
        lastMessageOn: 'Mon',
        userStatus: 'away'
    }
];

//sender
const defaultTo: ChatUser = {
    id: 9,
    name: 'Shreyu N',
    avatar: 'assets/images/users/avatar-2.jpg'
};

const YESTERDAYMESSAGES: MessageItem[] = [];
const TODAYMESSAGES: MessageItem[] = [];


for (const user of USERS) {
    YESTERDAYMESSAGES.push(
        {
            id: 1,
            messages: [{
                type: 'text',
                value: 'Hello!'
            }],
            to: defaultTo,
            from: user,
            sendOn: '8:18 am',
        },
        {
            id: 2,
            messages: [{
                type: 'text',
                value: 'Hi, How are you? What about our next meeting?'
            }],
            to: user,
            from: defaultTo,
            sendOn: '8:20 am',
        }
    );

    TODAYMESSAGES.push(
        {
            id: 1,
            messages: [{
                type: 'text',
                value: 'Yeah everything is fine'
            },
            {
                type: 'text',
                value: 'Let\'s have it today if you are free'
            }
            ],
            to: defaultTo,
            from: user,
            sendOn: '8:21 am',
        },
        {
            id: 2,
            messages: [{
                type: 'text',
                value: 'Sure thing! let me know if 2pm works for you'
            }],
            to: user,
            from: defaultTo,
            sendOn: '8:25 am',
        },
        {
            id: 3,
            messages: [{
                type: 'text',
                value: 'Sorry, I have another meeting scheduled at 2pm. Can we have it at 3pm instead?'
            }],
            to: defaultTo,
            from: user,
            sendOn: '8:26 am',
        },
        {
            id: 4,
            messages: [{
                type: 'text',
                value: '2pm it is. sure, we can also discuss about the presentation talk format if you have some extra mins'
            },
            {
                type: 'text',
                value: 'Sure, let\'s discuss about presentation format, it would be great to finalize today.'
            }
            ],
            to: user,
            from: defaultTo,
            sendOn: '8:27 am',
        },
        {
            id: 5,
            messages: [{
                type: 'text',
                value: 'Ok. I am attaching the last year format and assets here....'
            },
            {
                type: 'file',
                value: {
                    file: 'Shreyu-sketch.zip',
                    size: '2.3MB'
                }
            }
            ],
            to: defaultTo,
            from: user,
            sendOn: '8:32 am',
        }
    );
}


// list of chat messages
const CHATHISTORY: ChatMessage[] = [
    {
        id: 1,
        day: 'Yesterday',
        messages: [...YESTERDAYMESSAGES]
    },
    {
        id: 2,
        day: 'Today',
        messages: [...TODAYMESSAGES]
    }
];
// list of chat messages
const CHATHISTORY2: ChatMessage[] = [
    {
        id: 1,
        day: 'Yesterday',
        messages: [...YESTERDAYMESSAGES]
    },
    {
        id: 2,
        day: 'Today',
        messages: [...TODAYMESSAGES]
    }
];




export { USERS, CHATHISTORY, CHATHISTORY2 };

export interface RankingItem {
    id: string;
    rank: number;
    name: string;
    description: string;
    score: string;
    link: string;
}

export const rankingData: RankingItem[] = [
    {
        id: 'claude',
        rank: 1,
        name: 'Claude',
        description: 'Best overall — writing quality & reasoning',
        score: '9.6',
        link: '/tools/claude/'
    },
    {
        id: 'chatgpt',
        rank: 2,
        name: 'ChatGPT',
        description: 'Best for everyday versatility',
        score: '9.4',
        link: '/tools/chatgpt/'
    },
    {
        id: 'jasper',
        rank: 3,
        name: 'Jasper',
        description: 'Best for marketing teams',
        score: '9.0',
        link: '/tools/jasper/'
    },
    {
        id: 'copyai',
        rank: 4,
        name: 'Copy.ai',
        description: 'Best for short-form copy at scale',
        score: '8.7',
        link: '/tools/copyai/'
    }
];

export interface FutureDeal {
    id: string;
    badgeTop: string;
    badgeBottom: string;
    badgeColor: string;
    title: string;
    subtitle: string;
    link: string;
}

export const futureDealsData: FutureDeal[] = [
    {
        id: 'semrush-pro',
        badgeTop: '40%',
        badgeBottom: 'OFF',
        badgeColor: '#f59e0b', // orange
        title: 'Semrush Pro',
        subtitle: 'Annual plans, first 3 months',
        link: '#'
    },
    {
        id: 'nordvpn',
        badgeTop: '2 MO',
        badgeBottom: 'FREE',
        badgeColor: '#3b82f6', // blue
        title: 'NordVPN',
        subtitle: '2-year plan + 2 months free',
        link: '#'
    },
    {
        id: 'notion-teams',
        badgeTop: '30%',
        badgeBottom: 'OFF',
        badgeColor: '#8b5cf6', // purple
        title: 'Notion Teams',
        subtitle: 'New workspaces only',
        link: '#'
    }
];

import type { TrendingTool } from './trending';

export const editorChoiceTools: TrendingTool[] = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'Best-in-class reasoning and writing quality with strong safety guardrails.',
        icon: 'https://logo.clearbit.com/anthropic.com',
        rating: 4.9,
        reviews: '1,822',
        badge: {
            text: "Editor's Pick",
            bgColor: '#f3e8ff', // Purple tint
            textColor: '#6b21a8',
        },
        tags: ['Free plan', 'API'],
        price: 'Free',
        pricingLabel: 'From',
        slug: '/tools/claude/',
    },
    {
        id: 'figma',
        name: 'Figma',
        description: 'Collaborative interface design with real-time multiplayer editing.',
        icon: 'https://logo.clearbit.com/figma.com',
        rating: 4.8,
        reviews: '6,433',
        badge: {
            text: "Editor's Pick",
            bgColor: '#f3e8ff',
            textColor: '#6b21a8',
        },
        tags: ['Free plan', 'Team'],
        price: 'Free',
        pricingLabel: 'From',
        slug: '/tools/figma/',
    },
    {
        id: 'ahrefs',
        name: 'Ahrefs',
        description: 'The deepest backlink index in the industry, paired with solid keyword tools.',
        icon: 'https://logo.clearbit.com/ahrefs.com',
        rating: 4.7,
        reviews: '4,110',
        badge: {
            text: "Editor's Pick",
            bgColor: '#f3e8ff',
            textColor: '#6b21a8',
        },
        tags: ['Paid', 'Agency'],
        price: '$129/mo',
        pricingLabel: 'From',
        slug: '/tools/ahrefs/',
    }
];

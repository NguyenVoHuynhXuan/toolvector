export interface BlogPost {
    id: string;
    category: string;
    coverImage: string;
    title: string;
    meta: string;
    link: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 'post-1',
        category: 'AI Tools',
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
        title: '12 AI writing tools that actually improved our output in 2026',
        meta: '8 min read \u00B7 Jul 1',
        link: '#'
    },
    {
        id: 'post-2',
        category: 'SEO',
        coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
        title: 'Ahrefs vs Semrush: which one is worth your budget this year?',
        meta: '11 min read \u00B7 Jun 29',
        link: '#'
    },
    {
        id: 'post-3',
        category: 'Guides',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        title: 'How to evaluate a CRM before you commit to a contract',
        meta: '6 min read \u00B7 Jun 24',
        link: '#'
    }
];

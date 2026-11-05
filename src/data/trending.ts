export interface TrendingTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  rating: number;
  reviews: string;
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  tags: string[];
  price: string;
  pricingLabel: string;
  slug: string;
}

export const trendingTools: TrendingTool[] = [
  {
    id: 'notion',
    name: 'Notion AI',
    description: 'All-in-one workspace with AI writing, docs, wikis and project tracking.',
    icon: 'https://logo.clearbit.com/notion.so',
    rating: 4.7,
    reviews: '2,148',
    badge: {
      text: 'Trending',
      bgColor: '#dcfce7', // Green tint
      textColor: '#166534',
    },
    tags: ['Freemium', 'Team'],
    price: '$8/mo',
    pricingLabel: 'From',
    slug: '/tools/notion/',
  },
  {
    id: 'semrush',
    name: 'Semrush',
    description: 'Full-stack SEO suite for keyword research, audits and rank tracking.',
    icon: 'https://logo.clearbit.com/semrush.com',
    rating: 4.6,
    reviews: '3,902',
    tags: ['Paid', 'Agency'],
    price: '$139/mo',
    pricingLabel: 'From',
    slug: '/tools/semrush/',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, marketing and sales hub built for growing teams.',
    icon: 'https://logo.clearbit.com/hubspot.com',
    rating: 4.5,
    reviews: '5,210',
    badge: {
      text: 'Editor\'s Pick',
      bgColor: '#f3e8ff', // Purple tint
      textColor: '#6b21a8',
    },
    tags: ['Free plan', 'Business'],
    price: 'Free',
    pricingLabel: 'From',
    slug: '/tools/hubspot/',
  },
  {
    id: 'nordvpn',
    name: 'NordVPN',
    description: 'Fast, no-log VPN with 6,000+ servers and strong encryption.',
    icon: 'https://logo.clearbit.com/nordvpn.com',
    rating: 4.6,
    reviews: '8,701',
    tags: ['Paid', 'Privacy'],
    price: '$3.29/mo',
    pricingLabel: 'From',
    slug: '/tools/nordvpn/',
  }
];

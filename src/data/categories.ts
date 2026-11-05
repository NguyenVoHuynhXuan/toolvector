import crmTool from "../assets/category/crm_tool.jpg";
import automationAi from "../assets/category/automation_ai.jpg";
import hostingAi from "../assets/category/hosting_ai.jpg";
import maketingAi from "../assets/category/maketing_ai.jpg";

export interface Category {
  title: string;
  count: string;
  color: string; /* Kept for legacy compatibility if needed */
  bgImage: string;
}

export const categories: Category[] = [
  {
    title: 'AI Software & AI Agents',
    count: '640+ tools',
    color: 'blue',
    bgImage: automationAi.src
  },
  {
    title: 'SEO & Marketing',
    count: '490+ tools',
    color: 'purple',
    bgImage: maketingAi.src
  },
  {
    title: 'VPN & Hosting',
    count: '180+ tools',
    color: 'indigo',
    bgImage: hostingAi.src
  },
  {
    title: 'Health, Wellness & Fitness',
    count: '110+ tools',
    color: 'green',
    bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Cybersecurity & Privacy',
    count: '145+ tools',
    color: 'indigo',
    bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Education & E-learning',
    count: '190+ tools',
    color: 'blue',
    bgImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'E-commerce & Consumer Products',
    count: '320+ tools',
    color: 'orange',
    bgImage: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Travel & Connectivity',
    count: '95+ tools',
    color: 'blue',
    bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Business & Professional Services',
    count: '275+ tools',
    color: 'green',
    bgImage: crmTool.src
  },
  {
    title: 'Website & Developer',
    count: '410+ tools',
    color: 'purple',
    bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Gaming & Entertainment',
    count: '165+ tools',
    color: 'orange',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  }
];

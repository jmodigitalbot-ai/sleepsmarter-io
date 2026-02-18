export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  author: string;
  featuredImage?: string;
  pillar: 'Science' | 'Hygiene' | 'Audience' | 'Product' | 'Seasonal';
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'How Sleep Cycles Work: The Complete Guide',
    slug: 'how-sleep-cycles-work',
    excerpt: 'Discover the science behind your sleep cycles and how understanding them can improve your rest.',
    publishDate: '2026-02-05',
    author: 'KITT',
    pillar: 'Science'
  },
  {
    id: 2,
    title: 'Best Time to Wake Up: Science-Backed Guide',
    slug: 'best-time-to-wake-up',
    excerpt: 'Learn the optimal time to wake up based on your sleep cycles and lifestyle.',
    publishDate: '2026-02-05',
    author: 'KITT',
    pillar: 'Science'
  },
  // ... previous articles ...
  {
    id: 10,
    title: 'Sleep Tips for New Parents: Surviving the First Year',
    slug: 'sleep-tips-for-new-parents',
    excerpt: 'Exhausted new parent? Discover proven sleep strategies for you and your baby. Learn how to maximize rest, establish routines, and survive sleep deprivation in the first year.',
    publishDate: '2026-02-13',
    author: 'KITT',
    pillar: 'Audience',
    featuredImage: '/images/sleep-tips-new-parents-featured.png'
  },
  {
    id: 11,
    title: 'Best White Noise Machines for Sleep (2026 Guide)',
    slug: 'best-white-noise-machine-for-sleep',
    excerpt: 'Discover the top white noise machines to help you fall asleep faster and stay asleep longer.',
    publishDate: '2026-02-15',
    author: 'KITT',
    pillar: 'Product',
    featuredImage: '/images/best-white-noise-machines-featured.png'
  },
  {
    id: 12,
    title: 'College Student Sleep Guide: Balancing School & Rest',
    slug: 'college-student-sleep-tips',
    excerpt: 'Struggling to balance academics and sleep? Discover science-backed strategies for college students to optimize rest, improve academic performance, and maintain mental health.',
    publishDate: '2026-02-18',
    author: 'KITT',
    pillar: 'Audience',
    featuredImage: '/images/college-student-sleep-guide-featured.png'
  }
];
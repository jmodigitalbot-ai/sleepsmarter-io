import howSleepCyclesWork from '../content/01-how-sleep-cycles-work.md?raw'
import bestTimeToWakeUp from '../content/02-best-time-to-wake-up.md?raw'
import howMuchSleepDoINeed from '../content/03-how-much-sleep-do-i-need.md?raw'
import whyDoIWakeUpTired from '../content/04-why-do-i-wake-up-tired.md?raw'
import sleepCalculatorGuide from '../content/05-sleep-calculator-guide.md?raw'
import sleepRule103210 from '../content/06-10-3-2-1-0-sleep-rule.md?raw'
import isNappingGoodForYou from '../content/07-is-napping-good-for-you.md?raw'
import bestSleepScheduleNightShiftWorkers from '../content/08-best-sleep-schedule-for-night-shift-workers.md?raw'
import sleepAndProductivity from '../content/15-sleep-and-productivity.md?raw'
import daylightSavingTimeSleepTips from '../content/16-daylight-saving-time-sleep-tips.md?raw'

export interface Article {
  slug: string
  title: string
  description: string
  readTime: string
  date: string
  content: string
  featuredImage?: string
  featuredImageAlt?: string
}

export const articles: Article[] = [
  {
    slug: 'how-sleep-cycles-work',
    title: 'How Sleep Cycles Work: The Complete Guide',
    description: 'Learn how sleep cycles work, the 4 stages of sleep explained, and why 90-minute cycles matter for waking up refreshed.',
    readTime: '10 min read',
    date: 'February 2026',
    content: howSleepCyclesWork,
    featuredImage: '/images/featured-sleep-cycles.png',
    featuredImageAlt: 'Abstract illustration of flowing waves representing sleep cycles'
  },
  {
    slug: 'best-time-to-wake-up',
    title: 'Best Time to Wake Up: Science-Backed Guide',
    description: 'Discover the science of waking refreshed vs groggy and how to calculate your ideal wake time based on sleep cycles.',
    readTime: '11 min read',
    date: 'February 2026',
    content: bestTimeToWakeUp,
    featuredImage: '/images/featured-wake-up-time.png',
    featuredImageAlt: 'Minimalist illustration of sunrise with alarm clock silhouette'
  },
  {
    slug: 'how-much-sleep-do-i-need',
    title: 'How Much Sleep Do I Need? Sleep Needs by Age',
    description: 'Find out exactly how much sleep you need based on your age, plus signs you\'re not getting enough rest.',
    readTime: '12 min read',
    date: 'February 2026',
    content: howMuchSleepDoINeed,
    featuredImage: '/images/featured-how-much-sleep.png',
    featuredImageAlt: 'Abstract illustration of life stages represented by glowing orbs'
  },
  {
    slug: 'why-do-i-wake-up-tired',
    title: 'Why Do I Wake Up Tired? Common Causes & Fixes',
    description: 'Discover why you wake up exhausted even after 8 hours of sleep, and learn how to fix morning fatigue.',
    readTime: '13 min read',
    date: 'February 2026',
    content: whyDoIWakeUpTired,
    featuredImage: '/images/featured-wake-up-tired.png',
    featuredImageAlt: 'Abstract illustration of a depleted battery representing low energy'
  },
  {
    slug: 'sleep-calculator-guide',
    title: 'Sleep Calculator: How to Use It for Better Rest',
    description: 'Learn how a sleep calculator works and how to use Sleep Smarter to optimize your bedtime and wake time.',
    readTime: '13 min read',
    date: 'February 2026',
    content: sleepCalculatorGuide,
    featuredImage: '/images/featured-sleep-calculator.png',
    featuredImageAlt: 'Minimalist illustration of a circular dial with moon phases'
  },
  {
    slug: '10-3-2-1-0-sleep-rule',
    title: 'The 10-3-2-1-0 Sleep Rule: A Simple Formula for Better Sleep',
    description: 'Learn the 10-3-2-1-0 sleep rule—a simple countdown formula for better sleep. Science-backed tips for caffeine, food, work, and screens before bed.',
    readTime: '11 min read',
    date: 'February 2026',
    content: sleepRule103210,
    featuredImage: '/images/featured-10-3-2-1-0-rule.png',
    featuredImageAlt: 'Minimalist illustration of countdown numbers 10 3 2 1 0'
  },
  {
    slug: 'is-napping-good-for-you',
    title: 'Is Napping Good for You? The Science of Power Naps',
    description: 'Discover the science of power naps. Learn the benefits of napping, ideal nap length, best time to nap, and how to avoid common napping mistakes.',
    readTime: '10 min read',
    date: 'February 2026',
    content: isNappingGoodForYou,
    featuredImage: '/images/featured-napping.png',
    featuredImageAlt: 'Minimalist illustration of crescent moon with clouds representing power naps'
  },
  {
    slug: 'best-sleep-schedule-for-night-shift-workers',
    title: 'Best Sleep Schedule for Night Shift Workers: The 2026 Survival Guide',
    description: 'Discover science-backed sleep schedules for night shift workers. Learn how to manage 12-hour shifts, rotating schedules, and protect your health while working non-traditional hours.',
    readTime: '25 min read',
    date: 'February 2026',
    content: bestSleepScheduleNightShiftWorkers,
    featuredImage: '/images/blog-featured/featured-night-shift-sleep.png', // Will be updated when image is generated
    featuredImageAlt: 'Stylized illustration showing a clock with day and night sides, representing night shift worker sleep challenges'
  },
  {
    slug: 'sleep-and-productivity',
    title: 'Sleep and Productivity: Why Rest Makes You More Effective',
    description: 'Discover how sleep impacts your work performance and learn how getting the right amount of rest can dramatically boost your professional success.',
    readTime: '18 min read',
    date: 'February 2026',
    content: sleepAndProductivity,
    featuredImage: '/images/featured-sleep-productivity.jpg',
    featuredImageAlt: 'Professional illustration showing a brain with productivity symbols and sleep waves'
  },
  {
    slug: 'daylight-saving-time-sleep-tips',
    title: 'Daylight Saving Time: How to Adjust Your Sleep Without Losing Productivity',
    description: 'Navigate the challenges of daylight saving time with expert strategies to minimize sleep disruption and maintain peak performance during the transition.',
    readTime: '20 min read',
    date: 'February 2026',
    content: daylightSavingTimeSleepTips,
    featuredImage: '/images/featured-daylight-saving-time.jpg',
    featuredImageAlt: 'Illustration showing a clock transitioning between day and night with minimal disruption'
  }
]
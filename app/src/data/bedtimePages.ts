export interface BedtimeResult {
  time: string
  cycles: number
  hours: number
  quality: 'optimal' | 'good' | 'minimum'
}

export interface BedtimePage {
  slug: string
  wakeTimeLabel: string
  wakeTime24: string
  title: string
  description: string
  audienceNote: string
  scheduleTip: string
  results: BedtimeResult[]
  faqs: { question: string; answer: string }[]
}

const CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 14

const wakeTimes = [
  {
    slug: 'wake-up-at-5-30-am',
    wakeTimeLabel: '5:30 AM',
    wakeTime24: '05:30',
    audienceNote: 'This is a common schedule for early shifts, commuting, workouts, and school drop-off mornings.',
    scheduleTip: 'For a 5:30 AM alarm, protect the hour before bed hard. Screens, late caffeine, and heavy food hit harder because there is almost no morning buffer.',
  },
  {
    slug: 'wake-up-at-6-00-am',
    wakeTimeLabel: '6:00 AM',
    wakeTime24: '06:00',
    audienceNote: 'This wake time fits a standard early workday without pushing bedtime into extreme territory.',
    scheduleTip: 'For a 6:00 AM wake-up, the best results usually come from making your target bedtime boringly consistent instead of chasing a perfect night once in a while.',
  },
  {
    slug: 'wake-up-at-6-30-am',
    wakeTimeLabel: '6:30 AM',
    wakeTime24: '06:30',
    audienceNote: 'This is one of the most common wake-up times for school, work, and family schedules.',
    scheduleTip: 'For a 6:30 AM alarm, the danger zone is drifting past the optimal bedtime and convincing yourself one more episode will not matter. It usually does.',
  },
  {
    slug: 'wake-up-at-7-00-am',
    wakeTimeLabel: '7:00 AM',
    wakeTime24: '07:00',
    audienceNote: 'This wake time gives most people enough room for a full sleep window if bedtime stays reasonable.',
    scheduleTip: 'For a 7:00 AM wake-up, aim for the optimal bedtime on work nights and use the good bedtime as the latest regular fallback, not the default.',
  },
  {
    slug: 'wake-up-at-7-30-am',
    wakeTimeLabel: '7:30 AM',
    wakeTime24: '07:30',
    audienceNote: 'This wake time works well for later starts, remote work, and schedules with a shorter morning commute.',
    scheduleTip: 'For a 7:30 AM alarm, consistency still matters. A later wake time will not fix sleep debt if bedtime keeps sliding later every night.',
  },
]

function formatTime(totalMinutes: number): string {
  const minutesInDay = 24 * 60
  const normalized = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay
  const hours24 = Math.floor(normalized / 60)
  const minutes = normalized % 60
  const suffix = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${suffix}`
}

function parseTime(time24: string): number {
  const [hours, minutes] = time24.split(':').map(Number)
  return hours * 60 + minutes
}

function getResults(wakeTime24: string): BedtimeResult[] {
  const wakeMinutes = parseTime(wakeTime24)
  return [6, 5, 4].map((cycles) => {
    const bedtime = wakeMinutes - (cycles * CYCLE_MINUTES) - FALL_ASLEEP_MINUTES
    return {
      time: formatTime(bedtime),
      cycles,
      hours: (cycles * CYCLE_MINUTES) / 60,
      quality: cycles >= 6 ? 'optimal' : cycles >= 5 ? 'good' : 'minimum',
    }
  })
}

export const bedtimePages: BedtimePage[] = wakeTimes.map((page) => {
  const results = getResults(page.wakeTime24)
  const best = results[0]
  const good = results[1]
  const minimum = results[2]

  return {
    ...page,
    title: `What Time Should I Go to Bed If I Wake Up at ${page.wakeTimeLabel}?`,
    description: `Wake up at ${page.wakeTimeLabel}? Your best bedtime is ${best.time}, with ${good.time} and ${minimum.time} as backup options based on 90-minute sleep cycles.`,
    results,
    faqs: [
      {
        question: `What time should I go to bed to wake up at ${page.wakeTimeLabel}?`,
        answer: `To wake up at ${page.wakeTimeLabel}, aim to fall asleep around ${best.time} for six complete sleep cycles. If that is not realistic, ${good.time} gives you five cycles and ${minimum.time} gives you four cycles.`,
      },
      {
        question: `Is waking up at ${page.wakeTimeLabel} healthy?`,
        answer: `Waking up at ${page.wakeTimeLabel} can be healthy if your bedtime gives you enough total sleep and your schedule stays consistent. The wake time matters less than whether you are getting enough complete sleep cycles night after night.`,
      },
      {
        question: 'Why does this calculator subtract 14 minutes?',
        answer: 'Sleep Smarter includes a 14-minute fall-asleep buffer so the suggested bedtime is closer to when sleep actually starts, not just when you get into bed.',
      },
      {
        question: 'How many sleep cycles do I need?',
        answer: 'Most adults do best with five to six 90-minute sleep cycles, or roughly 7.5 to 9 hours of sleep. Four cycles can work occasionally, but it is not a great long-term target for most people.',
      },
    ],
  }
})

export const bedtimePageSlugs = bedtimePages.map((page) => page.slug)

export function getBedtimePage(slug: string | undefined): BedtimePage | undefined {
  return bedtimePages.find((page) => page.slug === slug)
}

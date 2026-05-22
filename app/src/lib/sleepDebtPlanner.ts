export type SeverityBand = 'balanced' | 'mild' | 'moderate' | 'high' | 'severe'

export interface SleepDebtInputs {
  targetHours: number
  nights: number[]
  wakeConsistency: 'consistent' | 'variable' | 'chaotic'
  naps: 'none' | 'short' | 'long' | 'late'
  signals: {
    caffeine: boolean
    alcohol: boolean
    nightShift: boolean
    insomnia: boolean
  }
}

export interface RecoveryDay {
  day: number
  focus: string
  sleepGoal: number
  bedtimeShift: string
  action: string
}

export interface SleepDebtResult {
  averageSleep: number
  weeklyDebt: number
  nightlyGap: number
  severity: SeverityBand
  severityLabel: string
  summary: string
  recoveryDays: RecoveryDay[]
  warnings: string[]
  redFlags: string[]
}

const round1 = (value: number) => Math.round(value * 10) / 10

export function getSeverityBand(weeklyDebt: number): SeverityBand {
  if (weeklyDebt <= 0.5) return 'balanced'
  if (weeklyDebt <= 3) return 'mild'
  if (weeklyDebt <= 7) return 'moderate'
  if (weeklyDebt <= 14) return 'high'
  return 'severe'
}

export function getAgeRecommendedSleep(ageGroup: string): number {
  switch (ageGroup) {
    case 'teen': return 9
    case 'young-adult': return 8.5
    case 'adult': return 8
    case 'older-adult': return 7.5
    default: return 8
  }
}

export function calculateSleepDebt(inputs: SleepDebtInputs): SleepDebtResult {
  const normalizedTarget = Math.min(10, Math.max(6, inputs.targetHours || 8))
  const nights = inputs.nights.map(night => Math.min(14, Math.max(0, night || 0)))
  const totalSleep = nights.reduce((sum, night) => sum + night, 0)
  const averageSleep = round1(totalSleep / nights.length)
  const weeklyDebt = round1(nights.reduce((sum, night) => sum + Math.max(0, normalizedTarget - night), 0))
  const nightlyGap = round1(weeklyDebt / nights.length)
  const severity = getSeverityBand(weeklyDebt)

  const severityLabels: Record<SeverityBand, string> = {
    balanced: 'Balanced / minimal debt',
    mild: 'Mild sleep debt',
    moderate: 'Moderate sleep debt',
    high: 'High sleep debt',
    severe: 'Severe sleep debt',
  }

  const summaryBySeverity: Record<SeverityBand, string> = {
    balanced: 'Your last week is close to your target. Protect consistency rather than trying to add a lot more sleep.',
    mild: 'You are carrying a small debt that usually responds well to a few earlier nights and a stable wake time.',
    moderate: 'Your debt is large enough to affect energy, mood, appetite, and focus. Recover gradually over the next week.',
    high: 'Your debt is in the range where aggressive weekend catch-up can backfire. Prioritize a steady seven-day reset.',
    severe: 'Your debt is substantial. Use the plan to stabilize, but consider professional guidance if this pattern is common.',
  }

  const extraRecovery = severity === 'severe' ? 1 : severity === 'high' ? 0.75 : severity === 'moderate' ? 0.5 : 0.25
  const consistentWakeAction = inputs.wakeConsistency === 'consistent'
    ? 'Keep the same wake time and move bedtime earlier instead.'
    : inputs.wakeConsistency === 'variable'
      ? 'Choose one anchor wake time and keep it within a 45-minute window.'
      : 'Start by stabilizing wake time within a 60-minute window before making big bedtime changes.'

  const napAction = inputs.naps === 'none'
    ? 'Skip naps unless you are dangerously sleepy; build pressure for nighttime sleep.'
    : inputs.naps === 'short'
      ? 'Keep naps to 10–20 minutes before 3 p.m.'
      : 'Replace long or late naps with a 10–20 minute early afternoon nap.'

  const recoveryDays: RecoveryDay[] = [
    {
      day: 1,
      focus: 'Stabilize the anchor',
      sleepGoal: round1(normalizedTarget + Math.min(extraRecovery, 0.5)),
      bedtimeShift: '15–30 minutes earlier than usual',
      action: consistentWakeAction,
    },
    {
      day: 2,
      focus: 'Reduce stimulants',
      sleepGoal: round1(normalizedTarget + Math.min(extraRecovery, 0.75)),
      bedtimeShift: '30 minutes earlier',
      action: inputs.signals.caffeine ? 'Move the last caffeine serving to at least 8 hours before bedtime.' : 'Keep caffeine timing steady and avoid adding late-day stimulants.',
    },
    {
      day: 3,
      focus: 'Add light recovery',
      sleepGoal: round1(normalizedTarget + extraRecovery),
      bedtimeShift: '30–45 minutes earlier',
      action: napAction,
    },
    {
      day: 4,
      focus: 'Protect sleep quality',
      sleepGoal: round1(normalizedTarget + extraRecovery),
      bedtimeShift: '45 minutes earlier if sleepy',
      action: inputs.signals.alcohol ? 'Avoid alcohol tonight; it fragments deep sleep and REM.' : 'Keep the last large meal and intense workout 2–3 hours before bed.',
    },
    {
      day: 5,
      focus: 'Consolidate the rhythm',
      sleepGoal: round1(normalizedTarget + Math.min(extraRecovery, 0.75)),
      bedtimeShift: '30 minutes earlier',
      action: inputs.signals.nightShift ? 'Use bright light at the start of shift and dark glasses/blackout curtains before daytime sleep.' : 'Get outdoor light within one hour of waking.',
    },
    {
      day: 6,
      focus: 'Avoid oversleep whiplash',
      sleepGoal: round1(normalizedTarget + Math.min(extraRecovery, 1)),
      bedtimeShift: 'Earlier bedtime, not a late wake-up',
      action: 'Do not sleep more than 1–2 hours past your normal wake time; bank recovery by going to bed earlier.',
    },
    {
      day: 7,
      focus: 'Lock the maintenance plan',
      sleepGoal: normalizedTarget,
      bedtimeShift: 'Return to sustainable target',
      action: 'Review your new average and repeat the calculator if debt remains above 3 hours.',
    },
  ]

  const warnings = [
    'Do not try to repay the entire debt in one marathon sleep. Sleeping far past your normal wake time can create social jet lag.',
    'Avoid driving or operating machinery if you feel severely sleepy.',
    'Use naps as a bridge, not a replacement for nighttime sleep.',
  ]

  if (weeklyDebt >= 14) warnings.push('A debt above 14 hours may take more than one week to recover safely.')
  if (inputs.signals.nightShift) warnings.push('Night shift schedules need circadian protection: timed light, darkness, and consistent sleep windows matter more than simple catch-up sleep.')
  if (inputs.signals.insomnia) warnings.push('If you have insomnia, spending extra time in bed can make sleep anxiety worse. Consider CBT-I based guidance.')

  const redFlags = [
    'Regularly sleeping under 6 hours despite enough opportunity to sleep.',
    'Loud snoring, gasping, choking, or witnessed pauses in breathing.',
    'Severe daytime sleepiness, drowsy driving, or unplanned sleep episodes.',
    'Insomnia lasting longer than 3 months or paired with anxiety/depression symptoms.',
  ]

  return {
    averageSleep,
    weeklyDebt,
    nightlyGap,
    severity,
    severityLabel: severityLabels[severity],
    summary: summaryBySeverity[severity],
    recoveryDays,
    warnings,
    redFlags,
  }
}

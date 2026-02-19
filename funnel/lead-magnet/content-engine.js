/**
 * Sleep Blueprint Content Engine
 * Maps persona data + calculator results → personalized blueprint content
 */

const PERSONA_CONTENT = {
  restless_mind: {
    displayName: 'The Restless Mind',
    tagline: 'Calm the storm, sleep the night.',
    colorAccent: '#8B5CF6',     // Purple
    colorLight: '#EDE9FE',
    colorDark: '#5B21B6',
    icon: '🧠',
    summary: 'Your mind is your greatest asset — and your biggest sleep disruptor. Racing thoughts, mental replays, and anticipatory anxiety are keeping you awake long after your body is ready for sleep.',
    rootCause: 'Cognitive hyperarousal at bedtime prevents your brain from transitioning into the slow-wave patterns needed for sleep onset. Your prefrontal cortex stays "online" when it should be powering down.',
    strengthNote: 'Your active mind means you\'re likely a strong thinker and problem-solver during the day. The goal isn\'t to shut your brain off — it\'s to redirect it.',

    quickWins: [
      {
        title: 'Brain Dump Journal',
        time: '60 minutes before bed',
        steps: [
          'Write tomorrow\'s to-do list (gets tasks out of your head)',
          'Note any unresolved worries with one next step for each',
          'Write 3 things that went well today (shifts mental state)'
        ],
        science: 'Research from Baylor University shows writing a to-do list before bed reduces sleep onset by 9 minutes on average.',
        impact: 'Fall asleep 9-12 minutes faster'
      },
      {
        title: '4-7-8 Breathing Technique',
        time: '10 minutes before bed',
        steps: [
          'Inhale through nose for 4 seconds',
          'Hold breath for 7 seconds',
          'Exhale slowly through mouth for 8 seconds',
          'Repeat 4 cycles'
        ],
        science: 'Activates the parasympathetic nervous system, reducing heart rate by 15-20% and shifting brain activity toward alpha waves.',
        impact: 'Reduces physiological arousal in under 2 minutes'
      },
      {
        title: 'Cognitive Shuffle',
        time: 'Once in bed',
        steps: [
          'Pick a random letter (e.g., "B")',
          'Think of words starting with that letter — one every 2-3 seconds',
          'Visualize each word briefly (ball, barn, butterfly...)',
          'When you run out, pick a new letter'
        ],
        science: 'Developed by cognitive scientist Luc Beaudoin. Mimics the random associations of sleep onset, tricking your brain into sleep mode.',
        impact: 'Interrupts rumination cycles within 5-10 minutes'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Anchor Wake Time', action: 'Set one wake time for the whole week (even weekends). This resets your cortisol rhythm.', metric: 'Consistent wake time' },
      day2: { focus: 'Worry Window', action: 'Designate 15 minutes at 6 PM as your "worry time." Write concerns then. Defer evening worries to tomorrow\'s window.', metric: 'Reduced bedtime racing thoughts' },
      day3: { focus: 'Digital Sunset', action: 'Screens off 90 minutes before bed. Replace with fiction reading, gentle music, or audio content.', metric: 'Less mental stimulation at bedtime' },
      day4: { focus: 'Progressive Muscle Relaxation', action: 'Tense-and-release muscle groups from feet to face. Hold each 5 seconds, release 10 seconds.', metric: 'Physical tension awareness' },
      day5: { focus: 'Temperature Drop', action: 'Warm shower 90 minutes before bed. Body temp drop afterward triggers sleepiness.', metric: 'Natural drowsiness by bedtime' },
      day6: { focus: 'Sleep Restriction', action: 'Only get in bed when truly sleepy. If awake >20 minutes, get up and read until drowsy.', metric: 'Bed = sleep association' },
      day7: { focus: 'Integration', action: 'Choose the 3 practices that worked best. These become your permanent wind-down ritual.', metric: 'Personal routine established' }
    },

    productRecs: [
      { name: 'Weighted Blanket (15-20 lbs)', why: 'Deep pressure stimulation reduces cortisol and increases serotonin — directly counteracts racing thoughts', priority: 'high' },
      { name: 'Guided Sleep Meditation App (Calm/Headspace)', why: 'Structured audio gives your mind something to follow instead of spiraling', priority: 'high' },
      { name: 'Luxgen™ Silk Pillowcase', why: 'Cooling silk reduces sensory input, creating a more soothing sleep surface', priority: 'medium', affiliateLink: 'https://tidd.ly/4and0sV' },
      { name: 'Journaling Notebook (Dedicated)', why: 'Physical writing is more effective than digital for cognitive offloading', priority: 'medium' }
    ],

    avoidList: [
      'Checking work email after 7 PM',
      'Problem-solving conversations within 2 hours of bed',
      'Stimulating podcasts/audiobooks (true crime, business)',
      'Watching the clock when you can\'t sleep'
    ]
  },

  digital_addict: {
    displayName: 'The Digital Dependent',
    tagline: 'Unplug your nights. Power up your mornings.',
    colorAccent: '#3B82F6',
    colorLight: '#DBEAFE',
    colorDark: '#1E40AF',
    icon: '📱',
    summary: 'Screen time before bed is your primary sleep disruptor. Blue light, engaging content, and the dopamine hits from scrolling are keeping your brain wired when it should be winding down.',
    rootCause: 'Blue light from screens suppresses melatonin production by up to 50% and delays it by up to 3 hours. But it\'s not just the light — the cognitive engagement from social media, news, and entertainment keeps your brain in "input mode."',
    strengthNote: 'Being tech-savvy means you can use technology as a tool FOR sleep, not just against it. Apps, automations, and smart home features can become part of your solution.',

    quickWins: [
      {
        title: 'Phone Exile Protocol',
        time: 'Starting tonight',
        steps: [
          'Buy a $10 alarm clock (remove the excuse to keep phone in bedroom)',
          'Set a charging station outside your bedroom door',
          'Enable Do Not Disturb mode automatically at your digital sunset time',
          'Tell anyone who might need you about the change'
        ],
        science: 'A 2024 NIH study found that simply removing phones from the bedroom improved sleep onset by 23 minutes and reduced nighttime awakenings by 47%.',
        impact: 'Immediate improvement in sleep onset + continuity'
      },
      {
        title: 'Progressive Digital Sunset',
        time: '90 minutes before bed',
        steps: [
          'T-90 min: Switch to warm-toned apps only (e-reader, music)',
          'T-60 min: Enable Night Shift/blue light filter on all devices',
          'T-30 min: All screens off — switch to audio or physical book',
          'T-0: Lights low, begin sleep routine'
        ],
        science: 'Gradual reduction prevents the "cold turkey" rebound where your brain craves stimulation. Progressive wind-down mimics natural sunset cues.',
        impact: 'Melatonin production restored within 3-5 days'
      },
      {
        title: 'Screen Time Replacement Menu',
        time: 'Choose 2-3 alternatives',
        steps: [
          'Audiobooks/podcasts (fiction, calm genres only)',
          'Light stretching or yoga nidra',
          'Board games or puzzles with family',
          'Fiction reading with warm lamp (not backlit)',
          'Gentle music or ambient sounds'
        ],
        science: 'The key is having pre-planned alternatives. Willpower-based approaches fail 85% of the time. Environment design works.',
        impact: 'Eliminates the "what do I do instead?" barrier'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Anchor Wake Time', action: 'Set consistent wake time. Morning sunlight (10 min within 30 min of waking) resets your clock.', metric: 'Consistent wake time + light' },
      day2: { focus: 'Phone Exile', action: 'Phone charges outside bedroom starting tonight. Use a real alarm clock.', metric: 'Zero bedroom screen time' },
      day3: { focus: 'Auto Night Mode', action: 'Set automatic blue light filters on all devices. Schedule focus/DND modes.', metric: 'Reduced blue light after 8 PM' },
      day4: { focus: 'Digital Sunset', action: 'Implement 60-minute screen-free period before bed. Have replacement activities ready.', metric: 'One hour screen-free before bed' },
      day5: { focus: 'Morning Light, Evening Dark', action: 'Add morning sunlight exposure. Dim home lights to 50% after sunset.', metric: 'Light/dark contrast established' },
      day6: { focus: 'Content Audit', action: 'Remove high-stimulation apps from home screen. Unsubscribe from late-night notification sources.', metric: 'Fewer triggers for late-night scrolling' },
      day7: { focus: 'New Routine Lock-In', action: 'Your 60-minute wind-down routine is now built. Commit to the version that worked best.', metric: 'Sustainable screen-free evening habit' }
    },

    productRecs: [
      { name: 'Blue Light Blocking Glasses', why: 'Wear from 7 PM onward to reduce blue light exposure by 80-90% even when you need screens', priority: 'high' },
      { name: 'Simple Alarm Clock', why: 'Removes the #1 excuse for keeping your phone in the bedroom', priority: 'high' },
      { name: 'Kindle Paperwhite (warm light mode)', why: 'Satisfies the need to read/browse with zero blue light and minimal engagement loops', priority: 'medium' },
      { name: 'Smart Home Dimmer', why: 'Automate evening light dimming so you don\'t have to think about it', priority: 'medium' }
    ],

    avoidList: [
      'Social media within 2 hours of bed',
      'News/politics content in the evening',
      'Video games after dinner',
      'Falling asleep with TV on (disrupts sleep cycles)'
    ]
  },

  chronotype_misfit: {
    displayName: 'The Chronotype Misfit',
    tagline: 'Align your clock. Unlock your energy.',
    colorAccent: '#F59E0B',
    colorLight: '#FEF3C7',
    colorDark: '#B45309',
    icon: '⏰',
    summary: 'Your natural sleep-wake rhythm doesn\'t match your required schedule. You\'re likely a night owl forced into an early bird world — or your weekend sleep pattern is drastically different from weekdays.',
    rootCause: 'Chronotype misalignment creates "social jet lag" — the equivalent of crossing 2-3 time zones every Monday morning. Your internal clock says one thing; your alarm says another.',
    strengthNote: 'Night owls tend to be more creative and have higher cognitive performance later in the day. The goal is working WITH your chronotype, not fighting it.',

    quickWins: [
      {
        title: 'Weekend Wake Time Anchor',
        time: 'This weekend',
        steps: [
          'Set weekend wake time no more than 60 minutes later than weekdays',
          'Use morning light exposure to lock in the time',
          'Allow a 20-minute nap between 1-3 PM if needed (no later)',
          'Resist the urge to "catch up" with marathon sleep-ins'
        ],
        science: 'Every hour of weekend sleep-in takes 2 days to readjust on Monday. Limiting variance to 60 min reduces social jet lag by 70%.',
        impact: 'Eliminates "Monday morning fog" within 2 weeks'
      },
      {
        title: 'Light Therapy Schedule Shift',
        time: 'Daily, starting tomorrow',
        steps: [
          'Morning: 10+ minutes of bright light within 30 min of waking',
          'If waking before sunrise, use a 10,000 lux light therapy lamp',
          'Evening: Dim ALL lights starting 2 hours before target bedtime',
          'Wear blue blockers if lights can\'t be dimmed'
        ],
        science: 'Light is the strongest zeitgeber (time-giver) for your circadian clock. Strategic light exposure can shift your rhythm by 1-2 hours within a week.',
        impact: 'Natural sleepiness shifts earlier by 30-60 minutes'
      },
      {
        title: 'Gradual Schedule Shift',
        time: 'Over 1-2 weeks',
        steps: [
          'Move bedtime 15 minutes earlier every 2-3 days',
          'Move wake time 15 minutes earlier on the same schedule',
          'Don\'t jump more than 15 minutes at a time',
          'Use light exposure to reinforce each shift'
        ],
        science: 'Your circadian clock can naturally adjust about 15 minutes per day. Forcing larger shifts leads to rebound and inconsistency.',
        impact: 'Shifts your natural sleep window by 1+ hours in 2 weeks'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Set Your Anchor', action: 'Choose one wake time for ALL 7 days. Set it. Use morning light immediately.', metric: 'Consistent wake time established' },
      day2: { focus: 'Light Therapy AM', action: '15 min bright light within 30 min of waking. Sunlight or 10,000 lux lamp.', metric: 'Morning alertness improvement' },
      day3: { focus: 'Evening Dim Protocol', action: 'All home lights to 50% after sunset. Blue blockers if using screens.', metric: 'Earlier onset of drowsiness' },
      day4: { focus: 'Shift Bedtime 15 min', action: 'Move target bedtime 15 minutes earlier. Pair with wind-down ritual.', metric: 'Falling asleep at earlier target' },
      day5: { focus: 'Meal Timing Sync', action: 'Eat dinner 3 hours before bed. No heavy snacks after. Breakfast within 1 hour of waking.', metric: 'Digestive rhythm alignment' },
      day6: { focus: 'Exercise Timing', action: 'Move exercise to morning or early afternoon. No intense exercise within 3 hours of bed.', metric: 'Exercise supports (not disrupts) rhythm' },
      day7: { focus: 'Weekend Preview', action: 'Plan weekend wake time (max 60 min later). Prepare bright light and morning activity.', metric: 'Weekend plan prevents relapse' }
    },

    productRecs: [
      { name: '10,000 Lux Light Therapy Lamp', why: 'Essential for morning light exposure, especially in winter or if you wake before sunrise', priority: 'high' },
      { name: 'Smart Bulbs (Tunable White)', why: 'Auto-dim and shift to warm tones in the evening, removing willpower from the equation', priority: 'high' },
      { name: 'Sunrise Alarm Clock', why: 'Simulates dawn 30 minutes before wake time, naturally aligning your circadian rhythm', priority: 'medium' },
      { name: 'CoolRest™ Comforter', why: 'Temperature regulation supports the body\'s natural cooling cycle at bedtime', priority: 'medium', affiliateLink: 'https://tidd.ly/3MuWwH3' }
    ],

    avoidList: [
      'Sleeping in more than 60 minutes on weekends',
      'Caffeine after noon (your shifted clock amplifies sensitivity)',
      'Bright overhead lights after 8 PM',
      'Intense exercise within 3 hours of bed'
    ]
  },

  environmentally_challenged: {
    displayName: 'The Environmentally Challenged',
    tagline: 'Transform your bedroom into a sleep sanctuary.',
    colorAccent: '#10B981',
    colorLight: '#D1FAE5',
    colorDark: '#065F46',
    icon: '🏠',
    summary: 'External factors — noise, light, temperature, or comfort — are significantly disrupting your sleep. Your body is ready to sleep, but your environment is fighting against you.',
    rootCause: 'Your sleep environment triggers micro-arousals throughout the night, even when you don\'t fully wake up. These brief disruptions prevent you from completing full sleep cycles, leaving you unrested despite being in bed long enough.',
    strengthNote: 'Environmental factors are among the most fixable sleep issues. Unlike psychological or medical causes, environment improvements create immediate, measurable results — often on the first night.',

    quickWins: [
      {
        title: 'Temperature Optimization',
        time: 'Tonight',
        steps: [
          'Set thermostat to 65-68°F (18-20°C) for sleeping',
          'If you can\'t control temperature, use a fan for airflow',
          'Wear light, breathable sleepwear (moisture-wicking materials)',
          'Consider a cooling mattress pad for hot sleepers'
        ],
        science: 'Your core body temperature needs to drop 2-3°F to initiate sleep. A cool room facilitates this. The ideal range is 65-68°F for most adults.',
        impact: 'Reduces sleep onset time and increases deep sleep by 20-30%'
      },
      {
        title: 'Light Elimination Audit',
        time: '15 minutes tonight',
        steps: [
          'Turn off ALL lights and identify every light source in your bedroom',
          'Cover LED indicators on electronics with electrical tape',
          'Install blackout curtains or use a quality sleep mask',
          'If using a phone, keep it face-down and on silent'
        ],
        science: 'Even dim light (>5 lux) during sleep suppresses melatonin and reduces deep sleep. Total darkness is not optional — it\'s essential.',
        impact: 'Increases melatonin production and deep sleep quality immediately'
      },
      {
        title: 'Sound Environment Control',
        time: 'Tonight',
        steps: [
          'Identify noise sources (street, neighbors, HVAC, partner)',
          'Use white noise machine or fan to mask variable sounds',
          'Consider earplugs for acute noise issues (foam or silicone)',
          'Address the source: door seals, window treatments, rugs'
        ],
        science: 'Intermittent noise causes arousals even during deep sleep. Consistent masking sound (white/pink noise) prevents these disruptions without causing arousals itself.',
        impact: 'Reduces nighttime awakenings by up to 60%'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Temperature Set', action: 'Set bedroom to 67°F. Use fan if no thermostat. Light breathable bedding.', metric: 'Consistent cool temperature' },
      day2: { focus: 'Light Elimination', action: 'Complete light audit. Cover LEDs, install blackout or use sleep mask.', metric: 'Total darkness achieved' },
      day3: { focus: 'Sound Masking', action: 'Set up white noise (machine, fan, or app). Consistent volume all night.', metric: 'Uninterrupted sound environment' },
      day4: { focus: 'Bedding Upgrade', action: 'Assess mattress/pillows. Replace if over 7 years old. Consider silk/cooling options.', metric: 'Comfort score improvement' },
      day5: { focus: 'Air Quality', action: 'Crack window for fresh air or use air purifier. Remove allergens. Wash bedding.', metric: 'Breathing quality improvement' },
      day6: { focus: 'Bedroom Purpose', action: 'Remove work materials, exercise equipment, TV. Bedroom = sleep + intimacy only.', metric: 'Mental association strengthened' },
      day7: { focus: 'Full Audit Review', action: 'Rate each environmental factor 1-10. Plan upgrades for any below 7.', metric: 'Environment optimization score' }
    },

    productRecs: [
      { name: 'Blackout Curtains', why: 'Even small amounts of ambient light suppress melatonin and reduce deep sleep', priority: 'high' },
      { name: 'White Noise Machine (Dohm or LectroFan)', why: 'Consistent sound masking eliminates noise-triggered micro-arousals', priority: 'high' },
      { name: 'Skinlike™ Silk Quilt', why: 'Temperature-regulating, hypoallergenic bedding for sensitive sleepers', priority: 'medium', affiliateLink: 'https://tidd.ly/4ryzHRw' },
      { name: 'Quality Sleep Mask (Contoured)', why: 'Blocks 100% of light without pressure on eyes', priority: 'medium' }
    ],

    avoidList: [
      'Sleeping with any light source visible',
      'Inconsistent bedroom temperature',
      'Using bedroom as office/gym/entertainment room',
      'Old mattress or pillows (replace every 7-8 years)'
    ]
  },

  habitually_inconsistent: {
    displayName: 'The Habitually Inconsistent',
    tagline: 'Consistency is the cure. Routine is the remedy.',
    colorAccent: '#EF4444',
    colorLight: '#FEE2E2',
    colorDark: '#991B1B',
    icon: '📊',
    summary: 'Your sleep schedule varies significantly from day to day, creating "social jet lag" that leaves you perpetually tired. The inconsistency itself is a bigger problem than the total hours you sleep.',
    rootCause: 'Variable sleep times prevent your circadian rhythm from establishing a predictable pattern. Your body literally doesn\'t know when to prepare for sleep, so it can\'t optimize melatonin timing, body temperature cycles, or sleep architecture.',
    strengthNote: 'The good news: schedule consistency is the single highest-leverage change you can make. People who fix this ONE thing often see more improvement than those who try to fix 10 things at once.',

    quickWins: [
      {
        title: 'The Non-Negotiable Wake Time',
        time: 'Starting tomorrow',
        steps: [
          'Pick ONE wake time that works for every day of the week',
          'Set it as an alarm — not a suggestion',
          'Get out of bed within 5 minutes of the alarm (no snoozing)',
          'This is your #1 most important change — everything else flows from this'
        ],
        science: 'Consistent wake time is the single most powerful circadian reset. Bedtime consistency follows naturally when wake time is locked.',
        impact: 'Your body begins anticipating wake time within 3-5 days'
      },
      {
        title: 'Bedtime Alarm',
        time: 'Tonight',
        steps: [
          'Set a "go to bed" alarm 30 minutes before target bedtime',
          'When it goes off, start your wind-down routine immediately',
          'Treat it with the same urgency as a morning alarm',
          'After 1 week, your body will start getting sleepy automatically at this time'
        ],
        science: 'A bedtime alarm creates an external cue that eventually becomes internalized. Your brain begins releasing melatonin in anticipation after consistent conditioning.',
        impact: 'Creates automatic sleepiness at your target bedtime'
      },
      {
        title: 'Weekend Damage Control',
        time: 'This weekend',
        steps: [
          'Max sleep-in: 60 minutes beyond weekday wake time',
          'If you go to bed late, still wake up within 60 min of normal',
          'Use a 20-minute afternoon nap (1-3 PM) instead of sleeping in',
          'Monday morning will feel dramatically different'
        ],
        science: 'Every hour of weekend sleep-in shifts your circadian clock later, creating 2 days of adjustment. Limiting weekend variance to 60 minutes maintains rhythm.',
        impact: 'Eliminates "Monday morning jet lag"'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Lock Wake Time', action: 'Set ONE wake time. This is non-negotiable for all 7 days. Period.', metric: 'Same wake time ±10 min' },
      day2: { focus: 'Bedtime Alarm', action: 'Set alarm 30 min before target bed. Start wind-down when it sounds.', metric: 'Bedtime within 30 min of target' },
      day3: { focus: 'Morning Routine', action: 'Build 15-min morning sequence: light, water, movement. Same order every day.', metric: 'Consistent morning anchor' },
      day4: { focus: 'Evening Routine', action: 'Build 30-min evening wind-down. Same steps, same order, same time.', metric: 'Consistent evening anchor' },
      day5: { focus: 'Meal Timing', action: 'Eat meals at consistent times (±30 min). Last meal 3 hours before bed.', metric: 'Circadian meal alignment' },
      day6: { focus: 'Track & Score', action: 'Rate consistency 1-10 for each anchor point. Identify weak spots.', metric: 'Self-awareness of patterns' },
      day7: { focus: 'Weekend Prep', action: 'Plan weekend sleep within 60 min of weekday schedule. Have morning plans.', metric: 'Weekend consistency maintained' }
    },

    productRecs: [
      { name: 'Smart Alarm Clock with Sleep Tracking', why: 'Data makes consistency visible and creates accountability', priority: 'high' },
      { name: 'Sunrise Alarm Clock', why: 'Gradual wake-up at consistent time feels more natural, increasing compliance', priority: 'high' },
      { name: 'Luxgen™ Silk Pillowcase', why: 'Premium sleep surface creates positive bedtime association, reinforcing routine', priority: 'medium', affiliateLink: 'https://tidd.ly/4and0sV' },
      { name: 'Physical Sleep Journal', why: 'Manual tracking increases awareness and commitment to consistency goals', priority: 'medium' }
    ],

    avoidList: [
      'Sleeping in more than 60 minutes on any day',
      'Napping after 3 PM (delays bedtime)',
      'Variable meal times (affects circadian rhythm)',
      '"I\'ll make up for it tomorrow" thinking'
    ]
  },

  stress_affected: {
    displayName: 'The Stress-Affected',
    tagline: 'Defuse the stress. Reclaim the night.',
    colorAccent: '#EC4899',
    colorLight: '#FCE7F3',
    colorDark: '#9D174D',
    icon: '😤',
    summary: 'Chronic stress and anxiety are your primary sleep disruptors. High cortisol levels, work-life boundary issues, and an activated nervous system are preventing the deep relaxation needed for quality sleep.',
    rootCause: 'Elevated cortisol from chronic stress flattens your natural cortisol curve — instead of dropping in the evening, it stays elevated. This directly suppresses melatonin and keeps your sympathetic ("fight or flight") nervous system engaged at bedtime.',
    strengthNote: 'Your high drive and intensity are assets during the day. The practices below aren\'t about becoming less ambitious — they\'re about creating a deliberate transition between "performance mode" and "recovery mode."',

    quickWins: [
      {
        title: 'Work Shutdown Ritual',
        time: '3+ hours before bed',
        steps: [
          'Choose a specific time to stop all work (not "when I\'m done")',
          'Write tomorrow\'s top 3 priorities (closure for your brain)',
          'Say out loud: "Shutdown complete" (sounds silly, works incredibly well)',
          'No work email, Slack, or tasks after this point'
        ],
        science: 'Cal Newport\'s "shutdown ritual" research shows that a deliberate work endpoint reduces evening rumination by 40%+ and improves next-day performance.',
        impact: 'Creates psychological distance between work and rest'
      },
      {
        title: 'Physiological Sigh',
        time: 'Whenever stressed + at bedtime',
        steps: [
          'Double inhale through nose (one long + one short "top-up" breath)',
          'Long slow exhale through mouth (twice as long as the inhale)',
          'Repeat 3-5 times',
          'This is the fastest known way to reduce physiological arousal'
        ],
        science: 'Stanford\'s Andrew Huberman lab found the physiological sigh reduces stress markers faster than any other breathing technique — including meditation.',
        impact: 'Measurable cortisol reduction in 60-90 seconds'
      },
      {
        title: 'Evening Parasympathetic Activation',
        time: '60 minutes before bed',
        steps: [
          'Legs-up-the-wall pose (5 minutes)',
          'Slow body scan meditation (10 minutes)',
          'Warm herbal tea ritual (chamomile or magnesium-infused)',
          'Dim all lights to 20% brightness'
        ],
        science: 'These activities specifically activate the vagus nerve, shifting your nervous system from sympathetic (fight/flight) to parasympathetic (rest/digest).',
        impact: 'Switches nervous system state within 15-20 minutes'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Anchor Wake Time', action: 'Consistent wake time is non-negotiable, even after a bad night. Trust the process.', metric: 'Wake time locked in' },
      day2: { focus: 'Work Shutdown', action: 'Pick a hard stop time for work. Complete the shutdown ritual. Zero exceptions.', metric: 'Clean work/rest boundary' },
      day3: { focus: 'Breathing Practice', action: 'Practice physiological sighs 3x today: morning, afternoon, and bedtime.', metric: 'Stress response awareness' },
      day4: { focus: 'Physical Release', action: 'Add 15-minute evening stretching or yoga. Focus on hip flexors, shoulders, jaw.', metric: 'Physical tension reduced' },
      day5: { focus: 'Worry Time + Journal', action: 'Scheduled 15-min worry time at 6 PM. Brain dump journal at 8 PM.', metric: 'Contained worry practice' },
      day6: { focus: 'Caffeine & Stimulant Audit', action: 'No caffeine after noon. Track anxiety-to-caffeine correlation.', metric: 'Reduced afternoon cortisol' },
      day7: { focus: 'Self-Compassion Day', action: 'Let go of perfectionism about sleep. Note progress, not perfection.', metric: 'Reduced sleep performance anxiety' }
    },

    productRecs: [
      { name: 'Magnesium Glycinate (200-400mg)', why: 'The "relaxation mineral" — most people are deficient, and it directly reduces cortisol and muscle tension', priority: 'high' },
      { name: 'Weighted Blanket (15-20 lbs)', why: 'Deep pressure stimulation activates parasympathetic nervous system, reducing cortisol by 31%', priority: 'high' },
      { name: 'CoolRest™ Comforter', why: 'Stress-related night sweats are common; cooling bedding prevents temperature-triggered awakenings', priority: 'medium', affiliateLink: 'https://tidd.ly/3MuWwH3' },
      { name: 'Guided Meditation App (Calm/Headspace)', why: 'Sleep Stories and body scans give your mind a structured pathway to sleep', priority: 'medium' }
    ],

    avoidList: [
      'Work email/Slack after shutdown time',
      'Alcohol as a sleep aid (fragments sleep cycles)',
      'Intense exercise within 3 hours of bed',
      'Discussing stressful topics before bedtime'
    ]
  },

  physiologically_sensitive: {
    displayName: 'The Physiologically Sensitive',
    tagline: 'Listen to your body. It\'s trying to tell you something.',
    colorAccent: '#14B8A6',
    colorLight: '#CCFBF1',
    colorDark: '#0F766E',
    icon: '🩺',
    summary: 'Physical discomfort, pain, or potential underlying conditions are affecting your sleep quality. Your body may need specific accommodations that generic sleep advice doesn\'t address.',
    rootCause: 'Physical factors create a direct barrier to sleep. Pain increases arousal, medical conditions can disrupt sleep architecture, and certain medications affect sleep quality. Addressing the physical root cause is essential.',
    strengthNote: 'You\'re already aware something physical is affecting your sleep — that awareness is the first step. The recommendations below address what you can control while identifying when professional help is needed.',

    quickWins: [
      {
        title: 'Sleep Position Optimization',
        time: 'Tonight',
        steps: [
          'Back sleepers: Small pillow under knees to reduce lower back strain',
          'Side sleepers: Firm pillow between knees, supportive pillow at correct height',
          'Avoid stomach sleeping (increases neck and back pain)',
          'Test different positions for 2-3 nights each to find your best fit'
        ],
        science: 'Proper spinal alignment during sleep reduces pain-related micro-arousals and allows longer periods of uninterrupted deep sleep.',
        impact: 'Reduces position-related awakenings by 30-50%'
      },
      {
        title: 'Pre-Sleep Comfort Routine',
        time: '30 minutes before bed',
        steps: [
          'Gentle stretching focused on problem areas (5 min)',
          'Warm compress or heating pad on tight muscles (10 min)',
          'Anti-inflammatory snack if appropriate (tart cherry, turmeric tea)',
          'Body scan to identify and release held tension'
        ],
        science: 'Proactive pain management before bed prevents the pain-arousal-sleeplessness cycle that worsens both pain and sleep quality.',
        impact: 'Breaks the pain-insomnia cycle'
      },
      {
        title: 'When to See a Professional',
        time: 'Self-assessment',
        steps: [
          'If you snore loudly or gasp during sleep → possible sleep apnea → sleep study',
          'If you have restless legs/urge to move → possible RLS → neurologist',
          'If you sleep 8+ hours but always wake exhausted → possible disorder → sleep specialist',
          'If OTC approaches haven\'t helped in 4 weeks → time for professional evaluation'
        ],
        science: 'Underlying sleep disorders affect 50-70 million Americans. Many are treatable but require proper diagnosis.',
        impact: 'Identifying the root cause changes everything'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Baseline Assessment', action: 'Rate pain/discomfort 1-10 at bedtime and morning. Track for the full week.', metric: 'Pain pattern awareness' },
      day2: { focus: 'Position Testing', action: 'Try optimal sleep position for your body. Use pillow support strategically.', metric: 'Position comfort score' },
      day3: { focus: 'Temperature + Comfort', action: 'Dial in room temp at 67°F. Assess mattress/pillow comfort honestly.', metric: 'Comfort environment score' },
      day4: { focus: 'Evening Stretching', action: 'Add 10-minute gentle stretch routine focused on your specific issues.', metric: 'Pre-sleep tension level' },
      day5: { focus: 'Anti-Inflammatory Protocol', action: 'Review diet for inflammatory triggers. Add anti-inflammatory foods.', metric: 'Diet awareness' },
      day6: { focus: 'Medication Review', action: 'Check if current medications affect sleep. Discuss timing with doctor.', metric: 'Medication sleep impact' },
      day7: { focus: 'Professional Decision', action: 'Based on your week of data, decide: self-manageable or needs professional help?', metric: 'Clear next-step plan' }
    },

    productRecs: [
      { name: 'Adjustable Loft Pillow', why: 'Proper neck alignment is critical — one-size-fits-all pillows rarely work for people with physical sensitivities', priority: 'high' },
      { name: 'Skinlike™ Hypoallergenic Silk Bedding', why: 'Reduces skin irritation, allergens, and sensory discomfort that trigger awakenings', priority: 'medium', affiliateLink: 'https://tidd.ly/4ryzHRw' },
      { name: 'Mattress Topper (Medium-Firm)', why: 'Adds comfort layer without replacing entire mattress — good pressure relief', priority: 'medium' },
      { name: 'Sleep Tracking Device', why: 'Objective data helps identify patterns and supports conversations with healthcare providers', priority: 'medium' }
    ],

    avoidList: [
      'Ignoring persistent symptoms (get evaluated)',
      'Self-medicating with alcohol or OTC sleep aids long-term',
      'Pushing through pain without addressing root cause',
      'Comparing your sleep needs to "normal" — your body has its own requirements'
    ]
  },

  // Fallback
  undiagnosed: {
    displayName: 'The Complex Sleeper',
    tagline: 'Multiple factors, one solution at a time.',
    colorAccent: '#6366F1',
    colorLight: '#E0E7FF',
    colorDark: '#3730A3',
    icon: '🔍',
    summary: 'Your sleep challenges span multiple categories, which actually gives us more options for improvement. We\'ll focus on the highest-leverage changes first.',
    rootCause: 'Multiple overlapping factors are creating a compound effect on your sleep. The key is identifying and addressing them in the right ORDER — not all at once.',
    strengthNote: 'Having multiple factors means multiple opportunities for improvement. Each fix compounds with the others.',

    quickWins: [
      {
        title: 'The Foundation Reset',
        time: 'Tonight',
        steps: [
          'Set bedroom temperature to 67°F',
          'Remove phone from bedroom',
          'Complete darkness (blackout or sleep mask)',
          'Pick ONE consistent wake time for the next 7 days'
        ],
        science: 'These four changes address the most common sleep disruptors simultaneously. They work for 90%+ of people regardless of specific challenges.',
        impact: 'Addresses multiple factors in one move'
      },
      {
        title: '4-7-8 Breathing + Body Scan',
        time: '15 minutes before bed',
        steps: [
          '4-7-8 breathing for 4 cycles (2 minutes)',
          'Progressive body scan from feet to head (10 minutes)',
          'Notice areas of tension — breathe into them',
          'Let gravity hold you — stop "trying" to sleep'
        ],
        science: 'This combination addresses both cognitive and physical arousal, the two primary categories of sleep onset difficulty.',
        impact: 'Reduces total arousal and speeds sleep onset'
      },
      {
        title: 'Sleep Hygiene Audit',
        time: '15 minutes this week',
        steps: [
          'Rate each factor 1-10: schedule consistency, environment, stress, screens, comfort',
          'Identify your lowest-scoring factor',
          'Focus ALL energy on improving that ONE factor this week',
          'Next week, address the second-lowest'
        ],
        science: 'Sequential improvement beats simultaneous changes. Each improvement compounds on the previous ones.',
        impact: 'Targeted improvement with compounding returns'
      }
    ],

    sevenDayProtocol: {
      day1: { focus: 'Wake Time Lock', action: 'Set one consistent wake time for the week. This is the foundation for everything.', metric: 'Consistent wake time' },
      day2: { focus: 'Environment Basics', action: 'Temperature 67°F, total darkness, consistent sound environment.', metric: 'Environment optimized' },
      day3: { focus: 'Screen Reduction', action: 'No screens 60 min before bed. Replace with reading or audio.', metric: 'Screen-free wind-down' },
      day4: { focus: 'Breathing Practice', action: 'Practice 4-7-8 breathing at bedtime. Progressive relaxation if needed.', metric: 'Relaxation technique learned' },
      day5: { focus: 'Caffeine Cutoff', action: 'No caffeine after 2 PM. Monitor how this affects evening alertness.', metric: 'Reduced evening alertness' },
      day6: { focus: 'Self-Assessment', action: 'Review week. What helped most? What was hardest? Identify your primary challenge.', metric: 'Self-awareness improved' },
      day7: { focus: 'Personalized Plan', action: 'Build your custom routine from what worked. Commit to the top 3 practices.', metric: 'Personal routine created' }
    },

    productRecs: [
      { name: 'White Noise Machine', why: 'Addresses environmental noise regardless of your primary challenge', priority: 'high' },
      { name: 'Sleep Mask (Contoured)', why: 'Instant darkness without room modifications', priority: 'high' },
      { name: 'Luxgen™ Silk Pillowcase', why: 'Improves comfort and sleep surface quality', priority: 'medium', affiliateLink: 'https://tidd.ly/4and0sV' },
      { name: 'Magnesium Glycinate', why: 'Supports relaxation and sleep quality across all sleep types', priority: 'medium' }
    ],

    avoidList: [
      'Trying to change everything at once',
      'Comparing yourself to "perfect sleepers"',
      'Giving up after 2-3 days (give changes a full week)',
      'Ignoring persistent issues that may need professional attention'
    ]
  }
};

/**
 * Get content for a specific persona
 */
function getPersonaContent(personaId) {
  return PERSONA_CONTENT[personaId] || PERSONA_CONTENT['undiagnosed'];
}

/**
 * Calculate a sleep score from assessment answers
 */
function calculateSleepScore(assessmentData) {
  if (!assessmentData) return 65; // Default
  
  let score = 100;
  
  // Deductions based on common issues
  if (assessmentData.confidence < 50) score -= 10;
  
  // Base on persona type severity
  const severityMap = {
    'restless_mind': -20,
    'stress_affected': -25,
    'digital_addict': -15,
    'environmentally_challenged': -18,
    'habitually_inconsistent': -22,
    'chronotype_misfit': -15,
    'physiologically_sensitive': -28,
    'undiagnosed': -20
  };
  
  score += (severityMap[assessmentData.personaId] || -15);
  
  // Clamp to 30-85 range (nobody gets 100 if they're using this tool)
  return Math.max(30, Math.min(85, score));
}

/**
 * Generate the improvement potential message
 */
function getImprovementMessage(score) {
  if (score < 45) return 'Significant improvement potential — you could gain 2+ hours of quality sleep per night';
  if (score < 60) return 'Strong improvement potential — expect noticeably better energy within 1-2 weeks';
  if (score < 75) return 'Good improvement potential — fine-tuning can take you from "okay" to "great"';
  return 'You\'re close to optimal — small adjustments will make a real difference';
}

/**
 * Generate category scores from persona
 */
function getCategoryScores(personaId, baseScore) {
  const categoryTemplates = {
    'restless_mind':              { schedule: 70, quality: 45, lifestyle: 60, environment: 75 },
    'digital_addict':             { schedule: 65, quality: 55, lifestyle: 40, environment: 70 },
    'chronotype_misfit':          { schedule: 40, quality: 60, lifestyle: 65, environment: 75 },
    'environmentally_challenged': { schedule: 75, quality: 50, lifestyle: 70, environment: 35 },
    'habitually_inconsistent':    { schedule: 30, quality: 55, lifestyle: 60, environment: 70 },
    'stress_affected':            { schedule: 60, quality: 40, lifestyle: 45, environment: 65 },
    'physiologically_sensitive':  { schedule: 65, quality: 35, lifestyle: 55, environment: 50 },
    'undiagnosed':                { schedule: 55, quality: 50, lifestyle: 55, environment: 55 }
  };
  
  return categoryTemplates[personaId] || categoryTemplates['undiagnosed'];
}

/**
 * Build complete template data from all inputs
 */
function buildTemplateData({ userName, calculatorData, assessmentData, referenceId, generationDate }) {
  const personaId = assessmentData?.personaId || 'undiagnosed';
  const persona = getPersonaContent(personaId);
  const sleepScore = calculateSleepScore(assessmentData);
  const categories = getCategoryScores(personaId, sleepScore);
  
  // Process calculator results
  const scheduleOptions = (calculatorData?.results || []).map(r => ({
    time: r.time,
    cycles: r.cycles,
    hours: r.hours,
    quality: r.quality,
    qualityLabel: r.quality === 'optimal' ? '⭐ Optimal' : r.quality === 'good' ? '✅ Good' : '⚠️ Minimum',
    recommendation: r.quality === 'optimal' 
      ? 'Use this for best results — aligns perfectly with your sleep cycles' 
      : r.quality === 'good'
      ? 'Good alternative when your schedule is tight'
      : 'Occasional use only — not enough for full recovery'
  }));
  
  const optimalResult = (calculatorData?.results || []).find(r => r.quality === 'optimal');
  const mode = calculatorData?.mode || 'wakeup';
  const targetTime = calculatorData?.targetTime || '7:00 AM';

  return {
    // User info
    userName: userName || 'Sleep Smarter User',
    generationDate: generationDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    referenceId,
    
    // Persona
    personaName: persona.displayName,
    personaTagline: persona.tagline,
    personaIcon: persona.icon,
    personaSummary: persona.summary,
    personaRootCause: persona.rootCause,
    personaStrength: persona.strengthNote,
    colorAccent: persona.colorAccent,
    colorLight: persona.colorLight,
    colorDark: persona.colorDark,
    
    // Sleep score
    sleepScore,
    sleepScoreWidth: sleepScore,
    improvementMessage: getImprovementMessage(sleepScore),
    categorySchedule: categories.schedule,
    categoryQuality: categories.quality,
    categoryLifestyle: categories.lifestyle,
    categoryEnvironment: categories.environment,
    
    // Calculator results
    mode,
    targetTime,
    modeLabel: mode === 'wakeup' ? 'wake up' : 'go to bed',
    modeAction: mode === 'wakeup' ? 'Recommended Bedtimes' : 'Recommended Wake Times',
    scheduleOptions,
    optimalTime: optimalResult?.time || 'See options below',
    optimalCycles: optimalResult?.cycles || 5,
    
    // Quick wins
    quickWins: persona.quickWins,
    
    // 7-day protocol
    protocol: persona.sevenDayProtocol,
    
    // Product recommendations
    productRecs: persona.productRecs,
    
    // Avoid list
    avoidList: persona.avoidList,
    
    // Assessment data pass-through
    personaConfidence: assessmentData?.confidence || 75,
    personaDescription: assessmentData?.description || persona.summary,
    assessmentRecommendations: assessmentData?.recommendations || []
  };
}

module.exports = {
  PERSONA_CONTENT,
  getPersonaContent,
  calculateSleepScore,
  getImprovementMessage,
  getCategoryScores,
  buildTemplateData
};

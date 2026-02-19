// Personalized Sleep Blueprint Email Sequence Templates
// 7-email sequence over 30 days with personalization

export const emailSequenceTemplates = {
  // Email 1: Welcome & Blueprint Guide (Day 0)
  email1: {
    id: 'welcome_blueprint',
    day: 0,
    trigger: 'pdf_generated',
    subject: 'Your Personalized Sleep Blueprint is Ready, {{firstName}}!',
    
    personalizationFields: [
      'firstName',
      'persona',
      'primaryChallenge',
      'sleepScore',
      'quickWinTitle'
    ],
    
    content: {
      greeting: 'Hi {{firstName}},',
      
      introduction: `Congratulations on taking the first step toward better sleep! 

Based on your assessment as a **{{persona}}**, we've created your personalized Sleep Blueprint. Your score of **{{sleepScore}}/100** shows {{scoreInterpretation}}.

Your primary challenge is **{{primaryChallenge}}** - we've designed specific solutions for this starting on page 4.`,
      
      blueprintOverview: `## 📋 What's Inside Your Blueprint:

1. **Your Optimal Sleep Schedule** - Based on your calculator inputs
2. **Tonight's Quick Wins** - Start with "{{quickWinTitle}}" tonight
3. **7-Day Sleep Reset Protocol** - Step-by-step guidance
4. **Personalized Product Recommendations** - Tools that actually work for your needs
5. **30-Day Improvement Plan** - From foundation to mastery
6. **Progress Tracking System** - Measure what matters`,
      
      quickStart: `## 🚀 Quick Start Guide:

**Tonight, focus on:**
1. Download and save your blueprint
2. Read pages 1-3 (15 minutes)
3. Implement "{{quickWinTitle}}" before bed
4. Set your alarm for tomorrow's consistent wake time`,
      
      cta: {
        primary: {
          text: '📥 Download Your Sleep Blueprint',
          url: '{{downloadUrl}}',
          color: '#4F46E5'
        },
        secondary: {
          text: '💾 Save to Google Drive',
          url: '{{driveSaveUrl}}',
          color: '#10B981'
        }
      },
      
      preview: `## 👀 Preview of What's Coming:

**Tomorrow:** Check-in email with troubleshooting tips for your first night
**Day 3:** Protocol support and adjustment guidance
**Day 7:** Progress assessment and Week 2 preparation`,
      
      footer: `Sleep well tonight,

The Sleep Smarter Team

P.S. Your blueprint is personalized to your specific needs as a {{persona}}. The recommendations will evolve as you progress through the protocol.`
    },
    
    trackingEvents: [
      'email_opened',
      'pdf_download_clicked',
      'pdf_downloaded'
    ]
  },
  
  // Email 2: Quick Win Check-in (Day 1)
  email2: {
    id: 'quick_win_checkin',
    day: 1,
    trigger: '24_hours_after_download',
    subject: 'How Did Last Night Go? Let\'s Troubleshoot Together',
    
    personalizationFields: [
      'firstName',
      'primaryChallenge',
      'quickWinTitle',
      'persona'
    ],
    
    content: {
      greeting: 'Hi {{firstName}},',
      
      empathy: `The first night implementing new sleep habits can be challenging. How did it go with "{{quickWinTitle}}" last night?

Whether it went perfectly or you faced some hurdles, that's completely normal. The key is consistency, not perfection.`,
      
      troubleshooting: `## 🔧 Common {{primaryChallenge}} Troubleshooting:

{{challengeSpecificTroubleshooting}}

**Remember:** It takes 3-7 nights for new habits to start feeling natural.`,
      
      encouragement: `## 🌟 You're On the Right Track:

Even if you only implemented part of the quick win, that's progress! Research shows that **partial implementation still creates positive change** in sleep architecture.

**Tonight's focus:** Consistency over perfection. Try the quick win again, even if modified.`,
      
      community: `## 👥 You're Not Alone:

Join other {{persona}}s in our private Sleep Smarter Facebook group where members share:
- What's working for them
- Troubleshooting tips
- Motivation and accountability`,
      
      bonus: `## 🎁 Bonus Resource:

Here's a 10-minute guided relaxation audio specifically designed for {{persona}}s dealing with {{primaryChallenge}}:

[Download Relaxation Audio]({{audioUrl}})`,
      
      cta: {
        primary: {
          text: 'Join Sleep Smarter Community',
          url: '{{facebookGroupUrl}}',
          color: '#1877F2'
        },
        secondary: {
          text: 'Download Relaxation Audio',
          url: '{{audioUrl}}',
          color: '#8B5CF6'
        },
        tertiary: {
          text: 'Reply with Your Question',
          action: 'reply',
          color: '#6B7280'
        }
      },
      
      footer: `One night at a time,

The Sleep Smarter Team

P.S. If something really isn't working, reply to this email and we'll suggest alternatives.`
    },
    
    challengeSpecificTroubleshooting: {
      falling_asleep: `**If you still took >20 minutes to fall asleep:**
- Try the 4-7-8 technique IN BED (not before)
- Add progressive muscle relaxation
- If thoughts race, get up and write them down (5 min max)`,
      
      screen_time: `**If you struggled with screen avoidance:**
- Enable grayscale mode at 7 PM (makes screens less appealing)
- Charge phone in bathroom instead of kitchen (further away)
- Try audiobook + dim lighting combination`,
      
      caffeine_timing: `**If you experienced caffeine cravings:**
- Switch to decaf versions of your favorite drinks
- Try herbal tea with similar ritual
- Increase afternoon water intake (dehydration mimics fatigue)`,
      
      stress_management: `**If evening stress was high:**
- Move "worry download" to 7 PM (not right before bed)
- Try 5-4-3-2-1 grounding technique
- Schedule "worry time" for tomorrow afternoon`
    }
  },
  
  // Email 3: Protocol Support (Day 3)
  email3: {
    id: 'protocol_support',
    day: 3,
    trigger: '72_hours_after_download',
    subject: 'Your 7-Day Protocol - How\'s Day 3 Going?',
    
    personalizationFields: [
      'firstName',
      'persona',
      'primaryChallenge',
      'protocolProgress'
    ],
    
    content: {
      greeting: 'Hi {{firstName}},',
      
      progressCheck: `You're halfway through the foundation phase of your protocol! How are Days 1-3 going?

{{protocolProgressSummary}}`,
      
      midProtocolTips: `## 🎯 Day 3-4 Focus: Overcoming Common Hurdles

**For {{persona}}s dealing with {{primaryChallenge}}:**
{{midProtocolChallengeTips}}

**Universal tip:** If you miss a day, don't try to "make up for it." Just resume today. Consistency > perfection.`,
      
      successStory: `## 📖 Success Story: Similar Journey

"*As a {{persona}}, I struggled with {{primaryChallenge}} for years. The protocol felt overwhelming at first, but by Day 3, I noticed I was falling asleep 15 minutes faster. By Day 7, it was automatic.*" - Sarah, 34`,
      
      adjustmentGuidance: `## 🔄 Time to Adjust?

**If something isn't working after 3 days,** it's okay to adjust:

1. **Too difficult?** Simplify to the core 2 actions
2. **Too time-consuming?** Reduce duration by 50%
3. **Not seeing results?** Try the alternative technique from page 6

**Remember:** This is YOUR protocol. Customize it for YOUR life.`,
      
      momentum: `## 💪 The Hardest Part is Behind You

Days 1-3 are typically the most challenging. You've built momentum that will carry you through Days 4-7.

**Tonight's focus:** Celebrate making it to Day 3!`,
      
      cta: {
        primary: {
          text: 'Share Your Day 3 Progress',
          url: '{{progressShareUrl}}',
          color: '#4F46E5'
        },
        secondary: {
          text: 'Need Adjustment Help? Reply Here',
          action: 'reply',
          color: '#6B7280'
        }
      },
      
      footer: `Building momentum,

The Sleep Smarter Team

P.S. Day 4 is where many people experience their first "breakthrough" moment.`
    },
    
    midProtocolChallengeTips: {
      falling_asleep: `- Combine breathing + body scan (page 5)
- If still struggling, try "military method" counting
- Ensure room is cool enough (67°F ideal)`,
      
      screen_time: `- Implement "app limits" on problem apps
- Try "screen-free evening" with partner/family
- Create "phone jail" box for evening devices`,
      
      schedule_consistency: `- Focus on wake time consistency first
- Use multiple alarms in different locations
- Morning sunlight within 30 min of waking`
    }
  },
  
  // Email 4: Progress Assessment (Day 7)
  email4: {
    id: 'progress_assessment',
    day: 7,
    trigger: '7_days_after_download',
    subject: '1 Week In - Time to Assess Your Progress',
    
    personalizationFields: [
      'firstName',
      'persona',
      'sleepScore',
      'initialChallenge'
    ],
    
    content: {
      greeting: 'Congratulations {{firstName}}! 🎉',
      
      celebration: `You've completed Week 1 of your sleep transformation! That's 7 days of intentional sleep habits - an achievement worth celebrating.

Whether you implemented everything perfectly or had some challenging nights, **showing up for 7 days is what matters**.`,
      
      assessment: `## 📊 Your Week 1 Progress Assessment

Take 2 minutes to assess your progress:

**1. Sleep Latency:** How long does it take to fall asleep now?
- Faster ⬇️ | Same ↔️ | Slower ⬆️

**2. Morning Energy:** Rate your typical morning (1-5)
- 1 (Exhausted) to 5 (Energetic)

**3. Protocol Adherence:** How many days did you complete?
- 0-2 | 3-5 | 6-7

**[Take Quick Assessment]({{assessmentUrl}})**`,
      
      resultsInterpretation: `## 📈 What Your Progress Means:

**If you improved:** Fantastic! Your efforts are paying off. Week 2 will build on this foundation.

**If you struggled:** Completely normal. Week 1 establishes habits; Week 2 refines them. We'll adjust based on your assessment.

**If you missed days:** No problem. Consistency builds over time, not overnight.`,
      
      week2Preview: `## 🗓️ Week 2 Preview: Optimization Phase

Based on your initial {{initialChallenge}}, Week 2 focuses on:

1. **Fine-tuning** what worked in Week 1
2. **Adding** 1-2 advanced techniques
3. **Troubleshooting** specific remaining issues
4. **Building** toward long-term sustainability`,
      
      cta: {
        primary: {
          text: 'Take 2-Minute Assessment',
          url: '{{assessmentUrl}}',
          color: '#10B981'
        },
        secondary: {
          text: 'Download Week 2 Resources',
          url: '{{week2ResourcesUrl}}',
          color: '#8B5CF6'
        }
      },
      
      footer: `One week down, lifelong habits to go,

The Sleep Smarter Team

P.S. Your assessment results will automatically customize your Week 2 recommendations.`
    }
  },
  
  // Email 5: Advanced Techniques (Day 14)
  email5: {
    id: 'advanced_techniques',
    day: 14,
    trigger: '14_days_after_download_and_engaged',
    subject: 'Ready for Advanced Sleep Optimization?',
    
    personalizationFields: [
      'firstName',
      'persona',
      'primaryChallenge',
      'progressLevel'
    ],
    
    eligibility: {
      minEngagement: 0.5, // 50% of previous emails opened/clicked
      minProtocolProgress: 0.6, // 60% of protocol completed
      requiredTags: ['active', 'progress_made']
    },
    
    content: {
      greeting: 'Hi {{firstName}},',
      
      levelUp: `Impressive progress! You've mastered the basics and are ready for advanced sleep optimization.

As a {{persona}} who's made it 2 weeks, you're in the top 20% of sleep improvers.`,
      
      advancedTechnique: `## 🧠 Advanced Technique: {{advancedTechniqueName}}

**For {{persona}}s dealing with {{primaryChallenge}}:**
{{advancedTechniqueDescription}}

**Why it works:** {{techniqueScience}}`,
      
      implementation: `## 📋 Implementation Guide:

**Step 1:** {{step1}}
**Step 2:** {{step2}}
**Step 3:** {{step3}}
**Step 4:** {{step4}}

**Timing:** {{techniqueTiming}}
**Frequency:** {{techniqueFrequency}}
**Expected Results:** {{expectedResults}}`,
      
      caseStudy: `## 📖 Case Study: Advanced Breakthrough

"*As a {{persona}}, I plateaued after 2 weeks. The {{advancedTechniqueName}} helped me overcome {{primaryChallenge}} completely. My sleep latency went from 25 to 8 minutes.*" - Michael, 42`,
      
      cta: {
        primary: {
          text: 'Download Advanced Technique Guide',
          url: '{{advancedGuideUrl}}',
          color: '#4F46E5'
        },
        secondary: {
          text: 'Join Masterclass Waitlist',
          url: '{{masterclassWaitlistUrl}}',
          color: '#F59E0B'
        }
      },
      
      footer: `Leveling up your sleep game,

The Sleep Smarter Team

P.S. This technique is typically taught in our $197 Sleep Masterclass. You're getting it free for your dedication.`
    },
    
    advancedTechniques: {
      falling_asleep: {
        name: 'Cognitive Behavioral Therapy for Insomnia (CBT-I)',
        description: 'Evidence-based techniques to retrain sleep thoughts and behaviors',
        science: 'Addresses the cognitive and behavioral factors maintaining insomnia',
        steps: [
          'Sleep restriction: Temporarily limit time in bed',
          'Stimulus control: Associate bed only with sleep',
          'Cognitive restructuring: Challenge sleep-related anxieties'
        ]
      },
      
      screen_time: {
        name: 'Digital Detox Protocol',
        description: 'Structured approach to reducing digital dependency',
        science: 'Rebuilds dopamine regulation and attention span',
        steps: [
          'App elimination: Remove 3 most-used apps for 48 hours',
          'Notification fasting: Turn off all non-essential notifications',
          'Digital sabbath: 24-hour screen-free period weekly'
        ]
      }
    }
  },
  
  // Email 6: Success Celebration (Day 21)
  email6: {
    id: 'success_celebration',
    day: 21,
    trigger: '21_days_after_download',
    subject: '3 Weeks of Better Sleep - How Do You Feel?',
    
    personalizationFields: [
      'firstName',
      'persona',
      'initialSleepScore',
      'estimatedImprovement'
    ],
    
    content: {
      greeting: '{{firstName}}! 21 Days! 🎉',
      
      milestone: `**21 days = habit formation!** You've officially built new sleep habits that are becoming automatic.

How do you feel compared to 3 weeks ago?`,
      
      transformation: `## 🌟 Sleep Transformation Impact:

Better sleep doesn't just happen at night. It transforms your entire day:

**Energy:** {{energyImprovement}}
**Focus:** {{focusImprovement}}  
**Mood:** {{moodImprovement}}
**Health:** {{healthImprovement}}`,
      
      successStories: `## 📣 Success Stories From Our Community:

"*As a {{persona}}, I went from exhausted to energetic. My partner says I'm a different person.*" - Jessica

"*The protocol gave me back 90 minutes of productive time each day.*" - David

"*After years of struggling, I finally understand my sleep needs.*" - Alex`,
      
      communitySpotlight: `## 👑 Community Spotlight:

This week's featured community member is **Taylor**, a {{persona}} who:
- Reduced sleep latency from 45 to 12 minutes
- Consistently wakes up without an alarm
- Helped 3 friends start their sleep journey`,
      
      exclusiveOffer: `## 🎁 Exclusive 21-Day Celebration Offer:

For your dedication, enjoy **40% off** our Sleep Smarter Masterclass:

**Regular:** $197
**Your Price:** $118 (40% off)
**Bonus:** 30-day coaching extension included

**[Claim Your Discount]({{discountUrl}})**`,
      
      cta: {
        primary: {
          text: 'Claim 40% Discount',
          url: '{{discountUrl}}',
          color: '#EF4444'
        },
        secondary: {
          text: 'Share Your Success Story',
          url: '{{successShareUrl}}',
          color: '#8B5CF6'
        },
        tertiary: {
          text: 'Refer a Friend',
          url: '{{referralUrl}}',
          color: '#10B981'
        }
      },
      
      footer: `Transforming sleep, transforming lives,

The Sleep Smarter Team

P.S. This offer expires in 7 days. You've earned it.`
    }
  },
  
  // Email 7: Long-term Maintenance (Day 30)
  email7: {
    id: 'long_term_maintenance',
    day: 30,
    trigger: '30_days_after_download',
    subject: 'Your 30-Day Sleep Transformation Complete',
    
    personalizationFields: [
      'firstName',
      'persona',
      'sleepScore',
      'estimatedImprovement',
      'primaryChallenge'
    ],
    
    content: {
      greeting: 'Congratulations, {{firstName}}!
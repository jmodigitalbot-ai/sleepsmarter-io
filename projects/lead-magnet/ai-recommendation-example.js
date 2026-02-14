// Example AI Recommendation Engine for Sleep Blueprint
// This demonstrates the core logic for personalized sleep recommendations

class SleepRecommendationEngine {
  constructor() {
    // Sample sleep techniques database (in reality, this would be 200+ items)
    this.techniques = [
      {
        id: 'tech_001',
        name: 'Consistent Wake Time',
        description: 'Wake up at the same time every day, even on weekends',
        category: 'foundation',
        difficulty: 'easy',
        timeRequired: 0, // minutes per day
        suitablePersonas: ['struggling_starter', 'inconsistent_sleeper', 'all'],
        efficacyScore: 9.5,
        evidenceLevel: 'high',
        prerequisites: [],
        contraindications: ['shift_work']
      },
      {
        id: 'tech_002',
        name: 'Digital Sunset',
        description: 'Stop using screens 60 minutes before bedtime',
        category: 'environment',
        difficulty: 'medium',
        timeRequired: 0,
        suitablePersonas: ['tech_dependent', 'stressed_professional'],
        efficacyScore: 8.0,
        evidenceLevel: 'high',
        prerequisites: ['alternative_activities'],
        contraindications: []
      },
      {
        id: 'tech_003',
        name: '4-7-8 Breathing',
        description: 'Breathing technique to calm the nervous system before sleep',
        category: 'relaxation',
        difficulty: 'easy',
        timeRequired: 5,
        suitablePersonas: ['stressed_professional', 'struggling_starter'],
        efficacyScore: 7.5,
        evidenceLevel: 'medium',
        prerequisites: [],
        contraindications: ['respiratory_issues']
      },
      {
        id: 'tech_004',
        name: 'Bedroom Temperature Optimization',
        description: 'Maintain bedroom temperature at 67°F (19°C)',
        category: 'environment',
        difficulty: 'easy',
        timeRequired: 0,
        suitablePersonas: ['environment_sensitive', 'all'],
        efficacyScore: 8.5,
        evidenceLevel: 'high',
        prerequisites: ['thermometer', 'climate_control'],
        contraindications: []
      },
      {
        id: 'tech_005',
        name: 'Progressive Muscle Relaxation',
        description: 'Systematically tense and relax muscle groups',
        category: 'relaxation',
        difficulty: 'medium',
        timeRequired: 15,
        suitablePersonas: ['stressed_professional'],
        efficacyScore: 8.0,
        evidenceLevel: 'high',
        prerequisites: ['quiet_environment'],
        contraindications: ['muscle_pain']
      }
    ];
    
    // User constraints mapping
    this.constraintMapping = {
      timeAvailability: {
        low: 10,    // max minutes per day
        medium: 20,
        high: 30
      },
      motivationLevel: {
        low: 1,     // difficulty threshold
        medium: 2,
        high: 3,
        very_high: 4
      }
    };
  }

  // Main recommendation function
  generateRecommendations(userProfile, persona) {
    console.log(`Generating recommendations for ${persona} persona...`);
    
    // Step 1: Filter by persona suitability
    let filtered = this.techniques.filter(tech => 
      tech.suitablePersonas.includes(persona) || 
      tech.suitablePersonas.includes('all')
    );
    
    console.log(`After persona filter: ${filtered.length} techniques`);
    
    // Step 2: Filter by user constraints
    filtered = filtered.filter(tech => {
      // Time constraint
      const maxTime = this.constraintMapping.timeAvailability[userProfile.timeAvailability];
      if (tech.timeRequired > maxTime) return false;
      
      // Difficulty constraint
      const difficultyMap = { easy: 1, medium: 2, hard: 3 };
      const maxDifficulty = this.constraintMapping.motivationLevel[userProfile.motivationLevel];
      if (difficultyMap[tech.difficulty] > maxDifficulty) return false;
      
      // Prerequisites check (simplified)
      if (tech.prerequisites.length > 0) {
        // In reality, check if user has prerequisites
        return true; // Simplified for example
      }
      
      return true;
    });
    
    console.log(`After constraint filter: ${filtered.length} techniques`);
    
    // Step 3: Rank by predicted efficacy for this user
    const ranked = filtered.sort((a, b) => {
      const scoreA = this.calculatePredictedEfficacy(a, userProfile, persona);
      const scoreB = this.calculatePredictedEfficacy(b, userProfile, persona);
      return scoreB - scoreA; // Descending order
    });
    
    // Step 4: Select top recommendations (3-5)
    const topRecommendations = ranked.slice(0, 4);
    
    // Step 5: Generate personalized explanations
    return topRecommendations.map(tech => 
      this.generatePersonalizedRecommendation(tech, userProfile, persona)
    );
  }
  
  // Calculate predicted efficacy based on user profile
  calculatePredictedEfficacy(technique, userProfile, persona) {
    let score = technique.efficacyScore;
    
    // Adjust based on persona alignment
    if (technique.suitablePersonas.includes(persona)) {
      score *= 1.2; // 20% boost for perfect persona match
    }
    
    // Adjust based on user's specific challenges
    if (userProfile.primaryChallenge === 'falling_asleep' && 
        technique.category === 'relaxation') {
      score *= 1.15;
    }
    
    if (userProfile.secondaryChallenge === 'screen_time' && 
        technique.name.includes('Digital')) {
      score *= 1.25;
    }
    
    // Adjust based on previous attempts (simplified)
    if (userProfile.previousAttempts > 2 && technique.difficulty === 'easy') {
      score *= 0.9; // Slight penalty for too-simple techniques
    }
    
    return score;
  }
  
  // Generate personalized recommendation object
  generatePersonalizedRecommendation(technique, userProfile, persona) {
    const rationale = this.generateRationale(technique, userProfile);
    const actionSteps = this.generateActionSteps(technique, userProfile);
    const expectedBenefits = this.generateExpectedBenefits(technique, userProfile);
    
    return {
      technique: technique.name,
      category: technique.category,
      difficulty: technique.difficulty,
      timeRequired: technique.timeRequired,
      rationale: rationale,
      actionSteps: actionSteps,
      expectedBenefits: expectedBenefits,
      successMetrics: this.defineSuccessMetrics(technique),
      personalizedTips: this.generatePersonalizedTips(technique, userProfile, persona)
    };
  }
  
  // Generate rationale explaining why this technique is recommended
  generateRationale(technique, userProfile) {
    const rationales = {
      'struggling_starter': `This is a foundational technique that will help establish the consistency your sleep needs.`,
      'inconsistent_sleeper': `This addresses your schedule variability by creating a reliable anchor point.`,
      'stressed_professional': `This technique directly targets the stress and anxiety that's affecting your sleep.`,
      'tech_dependent': `This helps create the digital boundaries needed for better sleep onset.`,
      'environment_sensitive': `This optimizes an environmental factor that significantly impacts your sleep quality.`
    };
    
    const baseRationale = `Research shows ${technique.name} improves sleep quality by addressing ${technique.category} factors.`;
    const personaRationale = rationales[userProfile.persona] || '';
    
    return `${baseRationale} ${personaRationale}`;
  }
  
  // Generate specific action steps
  generateActionSteps(technique, userProfile) {
    const steps = [];
    
    switch(technique.id) {
      case 'tech_001': // Consistent Wake Time
        steps.push(`Set your alarm for ${userProfile.targetWakeTime} every day`);
        steps.push('Place alarm across the room to force getting up');
        steps.push('Get sunlight within 30 minutes of waking');
        steps.push('Track consistency for 7 days');
        break;
        
      case 'tech_002': // Digital Sunset
        steps.push(`Start at ${this.calculateSunsetTime(userProfile.bedtime)}`);
        steps.push('Enable blue light filters on all devices');
        steps.push('Charge phone outside bedroom');
        steps.push('Replace with: reading, meditation, or gentle stretching');
        break;
        
      case 'tech_003': // 4-7-8 Breathing
        steps.push('Sit or lie comfortably');
        steps.push('Exhale completely through mouth');
        steps.push('Inhale quietly through nose for 4 seconds');
        steps.push('Hold breath for 7 seconds');
        steps.push('Exhale completely through mouth for 8 seconds');
        steps.push('Repeat 4 times');
        break;
        
      default:
        steps.push(`Implement ${technique.name} as described`);
        steps.push('Track results for 3-5 days');
        steps.push('Adjust based on effectiveness');
    }
    
    return steps;
  }
  
  // Generate expected benefits
  generateExpectedBenefits(technique, userProfile) {
    const benefits = [];
    
    if (technique.category === 'foundation') {
      benefits.push('More consistent sleep schedule');
      benefits.push('Improved circadian rhythm alignment');
      benefits.push('Better morning energy levels');
    }
    
    if (technique.category === 'relaxation') {
      benefits.push('Reduced sleep latency (faster falling asleep)');
      benefits.push('Decreased nighttime anxiety');
      benefits.push('Improved sleep quality perception');
    }
    
    if (technique.category === 'environment') {
      benefits.push('Fewer nighttime awakenings');
      benefits.push('Deeper, more restorative sleep');
      benefits.push('Improved sleep continuity');
    }
    
    // Add persona-specific benefits
    if (userProfile.persona === 'stressed_professional') {
      benefits.push('Reduced bedtime racing thoughts');
    }
    
    if (userProfile.persona === 'tech_dependent') {
      benefits.push('Reduced blue light interference with melatonin');
    }
    
    return benefits;
  }
  
  // Define success metrics
  defineSuccessMetrics(technique) {
    const metrics = {
      'tech_001': ['Wake time consistency (±30 minutes)', 'Morning energy improvement'],
      'tech_002': ['Screen-free time before bed (60+ minutes)', 'Sleep latency reduction'],
      'tech_003': ['Sleep latency <15 minutes', 'Pre-sleep calmness rating'],
      'tech_004': ['Bedroom temperature 67°F', 'Sleep continuity improvement'],
      'tech_005': ['Muscle tension reduction', 'Sleep onset improvement']
    };
    
    return metrics[technique.id] || ['Implementation consistency', 'Sleep quality improvement'];
  }
  
  // Generate personalized tips
  generatePersonalizedTips(technique, userProfile, persona) {
    const tips = [];
    
    // Time-based tips
    if (userProfile.timeAvailability === 'low') {
      tips.push(`Since you have limited time, focus on quality over quantity with this technique.`);
    }
    
    // Motivation-based tips
    if (userProfile.motivationLevel === 'low') {
      tips.push(`Start with just 2-3 days per week and build from there.`);
    }
    
    // Persona-specific tips
    if (persona === 'struggling_starter') {
      tips.push(`Don't worry about perfection - consistency matters more.`);
    }
    
    if (persona === 'inconsistent_sleeper') {
      tips.push(`Use calendar reminders to help maintain consistency.`);
    }
    
    return tips;
  }
  
  // Helper function to calculate digital sunset time
  calculateSunsetTime(bedtime) {
    // Simple calculation: 60 minutes before bedtime
    const [hours, minutes] = bedtime.split(':').map(Number);
    let sunsetHours = hours - 1;
    if (sunsetHours < 0) sunsetHours += 24;
    
    return `${sunsetHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

// Example usage
const engine = new SleepRecommendationEngine();

// Sample user profile
const sampleUser = {
  persona: 'stressed_professional',
  primaryChallenge: 'falling_asleep',
  secondaryChallenge: 'screen_time',
  targetWakeTime: '07:00',
  bedtime: '23:00',
  timeAvailability: 'medium',
  motivationLevel: 'high',
  previousAttempts: 2
};

// Generate recommendations
const recommendations = engine.generateRecommendations(sampleUser, sampleUser.persona);

console.log('\n=== PERSONALIZED SLEEP RECOMMENDATIONS ===\n');
console.log(`For: ${sampleUser.persona}`);
console.log(`Primary Challenge: ${sampleUser.primaryChallenge}`);
console.log(`Secondary Challenge: ${sampleUser.secondaryChallenge}\n`);

recommendations.forEach((rec, index) => {
  console.log(`\n${index + 1}. ${rec.technique} (${rec.difficulty}, ${rec.timeRequired} min/day)`);
  console.log(`   Rationale: ${rec.rationale}`);
  console.log(`   Action Steps:`);
  rec.actionSteps.forEach(step => console.log(`     • ${step}`));
  console.log(`   Expected Benefits:`);
  rec.expectedBenefits.forEach(benefit => console.log(`     • ${benefit}`));
  console.log(`   Success Metrics:`);
  rec.successMetrics.forEach(metric => console.log(`     • ${metric}`));
  if (rec.personalizedTips.length > 0) {
    console.log(`   Personalized Tips:`);
    rec.personalizedTips.forEach(tip => console.log(`     • ${tip}`));
  }
});

console.log('\n=== END OF RECOMMENDATIONS ===\n');

// Export for use in other systems
module.exports = {
  SleepRecommendationEngine,
  generateRecommendations: engine.generateRecommendations.bind(engine)
};
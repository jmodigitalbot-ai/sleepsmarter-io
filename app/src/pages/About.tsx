export default function About() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-8">
          About <span className="text-[#a8dadc]">Sleep Smarter</span>
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-[#f1faee]/80 mb-6">
            Sleep Smarter is a free tool designed to help you wake up feeling refreshed 
            by aligning your sleep schedule with your natural sleep cycles.
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">The Science</h2>
          <p className="text-[#f1faee]/70 mb-4">
            During sleep, your brain cycles through different stages approximately every 
            90 minutes. These stages include light sleep, deep sleep, and REM (rapid eye movement) sleep.
          </p>
          <p className="text-[#f1faee]/70 mb-4">
            When you wake up in the middle of a sleep cycle—especially during deep sleep—you 
            often feel groggy and disoriented. This is called "sleep inertia." But when you 
            wake up at the end of a complete cycle, you feel naturally refreshed and alert.
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">How We Calculate</h2>
          <p className="text-[#f1faee]/70 mb-4">
            Our calculator uses the standard 90-minute sleep cycle as a baseline. We also 
            account for the average time it takes to fall asleep (about 14 minutes) to give 
            you accurate recommendations.
          </p>
          <p className="text-[#f1faee]/70 mb-4">
            We suggest multiple options—ranging from 4 to 6 complete sleep cycles—so you 
            can choose based on your schedule and sleep needs.
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">Our Mission</h2>
          <p className="text-[#f1faee]/70 mb-4">
            We believe everyone deserves to wake up feeling their best. Poor sleep affects 
            every aspect of life—from mood and productivity to long-term health. Our goal 
            is to make sleep optimization simple and accessible.
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">Disclaimer</h2>
          <p className="text-[#f1faee]/70 mb-4">
            Sleep Smarter is an educational tool and is not a substitute for medical advice. 
            If you consistently have trouble sleeping or feel tired despite getting enough 
            sleep, please consult a healthcare professional.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30">
          <a href="/" className="text-[#a8dadc] hover:underline">← Back to Calculator</a>
        </div>
      </div>
    </div>
  )
}

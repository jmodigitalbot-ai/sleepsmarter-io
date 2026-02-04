export default function Terms() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-8">
          Terms of Service
        </h1>
        
        <p className="text-sm text-[#f1faee]/50 mb-8">Last updated: February 2026</p>
        
        <div className="prose prose-invert max-w-none space-y-6 text-[#f1faee]/70">
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using Sleep Smarter (sleepsmarter.io), you agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not 
              use our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Description of Service</h2>
            <p>
              Sleep Smarter provides a free sleep calculator tool that helps users calculate 
              optimal bedtimes and wake-up times based on sleep cycle science. We also 
              provide educational content about sleep health.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Disclaimer</h2>
            <p className="mb-4">
              <strong className="text-[#f1faee]">Not Medical Advice:</strong> The information 
              and tools provided on Sleep Smarter are for educational and informational 
              purposes only. They are not intended to be a substitute for professional 
              medical advice, diagnosis, or treatment.
            </p>
            <p className="mb-4">
              <strong className="text-[#f1faee]">Individual Variation:</strong> Sleep needs 
              vary from person to person. Our calculator uses average values (90-minute 
              cycles, 14-minute fall-asleep time) that may not perfectly match your 
              individual sleep patterns.
            </p>
            <p>
              <strong className="text-[#f1faee]">No Guarantees:</strong> We do not guarantee 
              that using our calculator will improve your sleep quality. Results may vary.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Intellectual Property</h2>
            <p>
              All content on Sleep Smarter, including text, graphics, logos, and software, 
              is our property or the property of our licensors and is protected by 
              copyright and other intellectual property laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Sleep Smarter shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages 
              arising out of or related to your use of our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes 
              will be effective immediately upon posting to this page.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Contact</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at 
              legal@sleepsmarter.io.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30">
          <a href="/" className="text-[#a8dadc] hover:underline">← Back to Calculator</a>
        </div>
      </div>
    </div>
  )
}

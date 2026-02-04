export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-[#f1faee]/50 mb-8">Last updated: February 2026</p>
        
        <div className="prose prose-invert max-w-none space-y-6 text-[#f1faee]/70">
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Overview</h2>
            <p>
              Sleep Smarter ("we," "our," or "us") respects your privacy. This Privacy 
              Policy explains how we collect, use, and protect information when you use 
              our website at sleepsmarter.io.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Information We Collect</h2>
            <p className="mb-4">
              <strong className="text-[#f1faee]">Calculator Data:</strong> The times you enter 
              into our sleep calculator are processed locally in your browser. We do not 
              store, transmit, or have access to this data.
            </p>
            <p className="mb-4">
              <strong className="text-[#f1faee]">Analytics:</strong> We use Google Analytics 
              to understand how visitors use our site. This includes anonymized data such 
              as pages visited, time on site, and general location (country/city level).
            </p>
            <p>
              <strong className="text-[#f1faee]">Cookies:</strong> We use essential cookies 
              to make our site work properly. Third-party services (like Google Analytics 
              and ad networks) may also set cookies.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Improve our website and user experience</li>
              <li>Understand usage patterns and popular content</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services including Google Analytics, Google AdSense, 
              and affiliate partners. These services have their own privacy policies 
              governing how they collect and use data.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Your Rights</h2>
            <p>
              You can disable cookies in your browser settings. You can opt out of 
              Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-4">Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at 
              privacy@sleepsmarter.io.
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

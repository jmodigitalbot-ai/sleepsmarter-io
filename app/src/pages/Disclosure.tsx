import { Link } from 'react-router-dom'

export default function Disclosure() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-8">
          Affiliate Disclosure
        </h1>
        
        <div className="max-w-none">
          <p className="text-sm text-[#f1faee]/50 mb-8">
            Last updated: February 2026
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">How We Keep Sleep Smarter Free</h2>
          <p className="text-[#f1faee]/70 mb-6">
            Sleep Smarter is committed to helping you get better sleep — and we provide our sleep 
            calculator and educational content completely free of charge.
          </p>
          <p className="text-[#f1faee]/70 mb-6">
            To support our work, we participate in affiliate programs. This means we may earn a 
            commission when you click on certain links and make a purchase — at no extra cost to you.
          </p>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">What This Means for You</h2>
          <ul className="list-disc list-outside ml-6 mb-6 space-y-3 text-[#f1faee]/70">
            <li>
              <strong className="text-[#f1faee]">We only recommend products we believe in.</strong> Our 
              recommendations are based on research, user reviews, and sleep science — not commission rates.
            </li>
            <li>
              <strong className="text-[#f1faee]">You pay the same price.</strong> Affiliate links don't 
              increase your cost. The retailer pays us a small referral fee from their marketing budget.
            </li>
            <li>
              <strong className="text-[#f1faee]">Our content is honest.</strong> We'll never recommend a 
              product just because it pays well. Our reputation depends on your trust.
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">Our Affiliate Partners</h2>
          <p className="text-[#f1faee]/70 mb-6">
            We may earn commissions from the following types of products and services:
          </p>
          <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[#f1faee]/70">
            <li>Mattresses and bedding</li>
            <li>Pillows and sleep accessories</li>
            <li>Sleep tracking devices</li>
            <li>Books and courses about sleep</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">FTC Disclosure</h2>
          <p className="text-[#f1faee]/70 mb-6">
            In accordance with the Federal Trade Commission's 16 CFR Part 255, we disclose that we 
            receive compensation from companies whose products we review or recommend. This compensation 
            may influence which products we write about and where they appear on our site, but it does 
            not affect our honest opinions and recommendations.
          </p>
          
          <div className="mt-12 p-4 bg-[#16213e] rounded-lg text-sm text-[#f1faee]/60 italic">
            Sleep Smarter is a participant in various affiliate programs designed to provide a means 
            for sites to earn advertising fees by advertising and linking to partner websites.
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30">
          <Link to="/" className="text-[#a8dadc] hover:underline">← Back to Calculator</Link>
        </div>
      </div>
    </div>
  )
}

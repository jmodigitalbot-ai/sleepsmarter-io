interface ProductCardProps {
  badge?: string
  title: string
  features?: string[]
  ctaText?: string
  ctaUrl: string
  highlight?: boolean
}

export default function ProductCard({ 
  badge = "Our Top Pick",
  title, 
  features = [], 
  ctaText = "Shop Now",
  ctaUrl,
  highlight = false
}: ProductCardProps) {
  return (
    <div className={`my-8 rounded-xl overflow-hidden ${highlight ? 'ring-2 ring-[#a8dadc]' : ''}`}>
      <div className="bg-[#16213e] p-6">
        {/* Badge */}
        {badge && (
          <div className="inline-block bg-[#a8dadc] text-[#1a1a2e] text-xs font-bold px-3 py-1 rounded-full mb-4">
            {badge}
          </div>
        )}
        
        {/* Title */}
        <h4 className="text-xl font-semibold text-[#f1faee] mb-4">
          {title}
        </h4>
        
        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-[#f1faee]/70">
                <span className="text-[#a8dadc] mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* CTA Button */}
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition group"
        >
          {ctaText}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  )
}

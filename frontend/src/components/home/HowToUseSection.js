import React from 'react';

const groups = [
  {
    title: "If you're a Holder",
    subtitle: 'Watch long-term health metrics',
    items: ['Treasury ETH — is treasury growing', 'Total Burned — is supply decreasing', 'Price Gap — is market healthy']
  },
  {
    title: "If you're a Buyer",
    subtitle: 'Check entry timing and strategy pressure',
    items: ['Price Gap — how far from floor', 'Strategy Pressure — is support active', 'Last Buyback — when was the last one']
  },
  {
    title: "If you're a Trader",
    subtitle: 'Analyze depth and market speed',
    items: ['NFTs to Floor — order book depth', 'LP Depth — can you trade size', 'Recent Activity — momentum direction']
  }
];

function HowToUseSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How to Use It</h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Playbook for different user types
      </p>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {groups.map((group, index) => (
          <div key={index} className="card">
            <h3 className="text-base font-semibold text-gray-900 mb-2">{group.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{group.subtitle}</p>
            <ul className="space-y-2">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {groups.map((group, index) => (
              <div key={index} className="card snap-center shrink-0" style={{ width: '300px' }}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{group.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{group.subtitle}</p>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator dots - outside of scroll container */}
        <div className="flex justify-center gap-2 mt-4">
          {groups.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToUseSection;

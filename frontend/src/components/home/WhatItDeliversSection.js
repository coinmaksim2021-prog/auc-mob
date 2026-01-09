import React from 'react';

const items = [
  {
    title: 'Supply Becomes Scarcer',
    desc: 'Burns reduce circulating supply — each burned token makes remaining ones rarer.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  },
  {
    title: 'Market Gets Support',
    desc: 'Buybacks create constant demand — strategy acts as buyer of last resort.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    title: 'Liquidity Gets Deeper',
    desc: 'LP additions reduce volatility and spreads — trading becomes more comfortable for everyone.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  }
];

function WhatItDeliversSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">What It Delivers</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Three key outcomes without promising unrealistic returns
        </p>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="card">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {items.map((item, index) => (
                <div key={index} className="card snap-center shrink-0" style={{ width: '300px' }}>
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Scroll indicator dots - outside of scroll container */}
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatItDeliversSection;

import React from 'react';

const scenarios = [
  { mode: 'Low Activity', items: ['Treasury grows slowly', 'Buybacks rarer', 'Steady accumulation'], color: 'blue' },
  { mode: 'Base Activity', items: ['Steady buybacks', 'Regular burns', 'Balanced LP growth'], color: 'emerald' },
  { mode: 'High Activity', items: ['Frequent buybacks', 'Faster supply reduction', 'Strong support'], color: 'orange' }
];

function ScenariosSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Strategy Scenarios</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Clear examples instead of complex calculator
        </p>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <div key={index} className="card">
              <h3 className="text-base font-semibold text-gray-900 mb-3">{scenario.mode}</h3>
              <div className="space-y-2 mb-4">
                {scenario.items.map((item, i) => (
                  <div key={i} className="text-sm text-gray-600">→ {item}</div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                <div className={`w-2 h-2 bg-${scenario.color}-400 rounded-full animate-pulse`}></div>
                {scenario.mode.split(' ')[0]} mode
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {scenarios.map((scenario, index) => (
                <div key={index} className="card snap-center shrink-0" style={{ width: '300px' }}>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">{scenario.mode}</h3>
                  <div className="space-y-2 mb-4">
                    {scenario.items.map((item, i) => (
                      <div key={i} className="text-sm text-gray-600">→ {item}</div>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <div className={`w-2 h-2 bg-${scenario.color}-400 rounded-full animate-pulse`}></div>
                    {scenario.mode.split(' ')[0]} mode
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots indicator - outside of scroll container */}
          <div className="flex justify-center gap-2 mt-4">
            {scenarios.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScenariosSection;

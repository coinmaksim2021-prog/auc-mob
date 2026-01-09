import React from 'react';

const mainCollectionRarity = [
  { name: 'FOMO GOLD', chance: 0.2, count: 9, intensity: 'from-orange-300 to-orange-400' },
  { name: 'Legendary', chance: 1, count: 44, intensity: 'from-orange-400 to-orange-500' },
  { name: 'Epic', chance: 10, count: 444, intensity: 'from-orange-500 to-orange-600' },
  { name: 'Rare', chance: 25, count: 1111, intensity: 'from-orange-600 to-orange-700' },
  { name: 'Uncommon', chance: 63.8, count: 2836, intensity: 'from-orange-700 to-orange-800' }
];

const bidRanges = [
  { range: '< 500 USDC', bids: 57, percent: 35, intensity: 'from-emerald-300 to-emerald-400' },
  { range: '500–1000 USDC', bids: 45, percent: 28, intensity: 'from-emerald-400 to-emerald-500' },
  { range: '1000–2000 USDC', bids: 23, percent: 22, intensity: 'from-emerald-500 to-emerald-600' },
  { range: '> 2000 USDC', bids: 12, percent: 15, intensity: 'from-emerald-600 to-emerald-700' }
];

const RaritySection = ({ timeLeft }) => {
  // Логика скрытия: за час до окончания (days = 0, hours = 0)
  const isBlindModeHidden = timeLeft.days === 0 && timeLeft.hours === 0;

  return (
    <>
      {/* Desktop: Grid 2 columns */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {/* Main Collection Rarity */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg" data-testid="rarity-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Collection Rarity</h3>
          <div className="space-y-3">
            {mainCollectionRarity.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-xl bg-gradient-to-r ${item.intensity}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.chance}% ({item.count})</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-xl overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${item.intensity} rounded-xl`} style={{ width: `${Math.min(item.chance * 1.5, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blind Mode Active */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg relative" data-testid="blind-mode-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Blind Mode Active</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-600">Live</span>
            </div>
          </div>
          
          {!isBlindModeHidden ? (
            <>
              <p className="text-sm text-gray-600 mb-4">Bid amounts hidden. Only ranges visible.</p>
              <div className="space-y-3">
                {bidRanges.map((range, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{range.range}</span>
                      <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-xl overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${range.intensity} rounded-xl transition-all duration-500`} 
                        style={{ width: `${range.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-red-600 font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Final hour - All bid data hidden
              </p>
              <div className="space-y-3 relative">
                <div className="filter blur-md select-none pointer-events-none">
                  {bidRanges.map((range, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-900">{range.range}</span>
                        <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-xl overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${range.intensity} rounded-xl`} 
                          style={{ width: `${range.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-2xl text-sm font-medium">
                    🔒 Revealed after auction
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: Stack vertically */}
      <div className="md:hidden space-y-6">
        {/* Main Collection Rarity */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Collection Rarity</h3>
          <div className="space-y-3">
            {mainCollectionRarity.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-xl bg-gradient-to-r ${item.intensity} shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs text-gray-500 shrink-0">{item.chance}% ({item.count})</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-xl overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${item.intensity} rounded-xl`} style={{ width: `${Math.min(item.chance * 1.5, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blind Mode Active */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Blind Mode Active</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-600">Live</span>
            </div>
          </div>
          
          {!isBlindModeHidden ? (
            <>
              <p className="text-sm text-gray-600 mb-4">Bid amounts hidden. Only ranges visible.</p>
              <div className="space-y-3">
                {bidRanges.map((range, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{range.range}</span>
                      <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-xl overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${range.intensity} rounded-xl transition-all duration-500`} 
                        style={{ width: `${range.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-red-600 font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Final hour - All bid data hidden
              </p>
              <div className="space-y-3 relative">
                <div className="filter blur-md select-none pointer-events-none">
                  {bidRanges.map((range, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-900">{range.range}</span>
                        <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-xl overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${range.intensity} rounded-xl`} 
                          style={{ width: `${range.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-2xl text-sm font-medium">
                    🔒 Revealed after auction
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RaritySection;

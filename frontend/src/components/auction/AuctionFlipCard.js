import React, { useState } from 'react';

const getRarityColor = (rarity) => {
  const colors = {
    'Common': 'text-gray-600 bg-gray-100',
    'Uncommon': 'text-green-600 bg-green-50',
    'Rare': 'text-blue-600 bg-blue-50',
    'Epic': 'text-purple-600 bg-purple-50',
    'Legendary': 'text-orange-600 bg-orange-50',
    'FOMO GOLD': 'text-yellow-600 bg-yellow-50'
  };
  return colors[rarity] || 'text-gray-600 bg-gray-100';
};

const recentActivityData = [
  { user: '0x7a3...f2d', action: 'Bid placed', amount: '1200 USDC', time: '2 min ago', rarity: 'Rare' },
  { user: '0x9c1...a8b', action: 'Bid placed', amount: '950 USDC', time: '5 min ago', rarity: 'Uncommon' },
  { user: '0x4e2...c7f', action: 'Box Fusion', amount: '—', time: '8 min ago', rarity: 'Epic' },
  { user: '0x2b5...d9e', action: 'Bid placed', amount: '750 USDC', time: '12 min ago', rarity: 'Uncommon' },
  { user: '0x8f4...b3a', action: 'Bid placed', amount: '2100 USDC', time: '15 min ago', rarity: 'Legendary' },
  { user: '0x1c9...e4a', action: 'Bid placed', amount: '1850 USDC', time: '18 min ago', rarity: 'Epic' },
  { user: '0x6d2...b7c', action: 'Bid placed', amount: '680 USDC', time: '22 min ago', rarity: 'Common' }
];

const auctionSteps = [
  { step: '1', title: 'Blind Bid', desc: 'Your bid stays hidden from other participants until auction ends' },
  { step: '2', title: 'Rarity Calc', desc: 'Higher bids increase your chances for rare NFTs' },
  { step: '3', title: 'Auction Ends', desc: 'NFTs are distributed based on bid amounts' },
  { step: '4', title: 'Reveal & XP', desc: 'Get your NFT and earn XP boost rewards' }
];

const AuctionFlipCard = ({ ogTrailblazers, totalBids, participants, timeLeft }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOgTooltip, setShowOgTooltip] = useState(false);

  // Логика Blind Mode: за час до окончания (days = 0, hours = 0)
  const isBlindMode = timeLeft && timeLeft.days === 0 && timeLeft.hours === 0;

  const handleFlip = (toFlipped) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(toFlipped);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div 
      className="relative w-full"
      style={{ perspective: '2000px', minHeight: '540px' }}
      data-testid="auction-flip-card"
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ${isAnimating ? 'scale-[0.97]' : 'scale-100'}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped 
            ? 'rotateY(180deg) translateZ(20px)' 
            : 'rotateY(0deg) translateZ(0px)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), scale 0.4s ease-in-out',
          minHeight: '540px'
        }}
      >
        {/* Front Side - Auction Chart */}
        <div
          className={`absolute inset-0 w-full bg-white rounded-3xl border border-gray-200 transition-shadow duration-700 ${
            isAnimating && !isFlipped ? 'shadow-2xl' : 'shadow-lg'
          }`}
          style={{ backfaceVisibility: 'hidden', overflow: 'visible' }}
        >
          <div className="p-6 h-full flex flex-col">
            {/* How Auction Works - Compact Steps */}
            <div className="mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">How Auction Works</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-red-600">LIVE</span>
                  </div>
                  {/* Flip Button - Compact Icon */}
                  <button
                    onClick={() => handleFlip(true)}
                    disabled={isAnimating}
                    className={`p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110 active:scale-95 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    data-testid="flip-to-activity-btn"
                    title="Recent Activity"
                  >
                    <svg className={`w-5 h-5 text-gray-500 hover:text-gray-700 transition-transform duration-300 ${isAnimating ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 relative" style={{ overflow: 'visible' }}>
                {auctionSteps.map((item, i) => (
                  <div key={i} className="group relative flex-1" style={{ overflow: 'visible' }}>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full border border-gray-100 hover:border-gray-300 hover:bg-gray-100 transition-all cursor-help">
                      <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {item.step}
                      </div>
                      <span className="text-xs font-medium text-gray-700 truncate">{item.title}</span>
                    </div>
                    {/* Tooltip - positioned above with high z-index */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 px-4 py-3 bg-gray-800 text-white text-xs rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-normal shadow-2xl w-48 text-center leading-relaxed"
                      style={{ 
                        bottom: 'calc(100% + 12px)', 
                        zIndex: 99999,
                        position: 'absolute'
                      }}
                    >
                      <span className="font-semibold">{item.title}</span>
                      <br />
                      {item.desc}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"
                        style={{ top: '100%' }}
                      ></div>
                    </div>
                    {/* Connector line */}
                    {i < auctionSteps.length - 1 && (
                      <div className="absolute top-1/2 -right-1 w-2 h-px bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Header with stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-6">
                {/* OG Trailblazer - simple text style */}
                {ogTrailblazers < 100 && (
                  <div 
                    className="group relative flex items-center gap-2 cursor-help"
                    onMouseEnter={() => setShowOgTooltip(true)}
                    onMouseLeave={() => setShowOgTooltip(false)}
                  >
                    <span className="text-sm text-gray-600">OG Trailblazer</span>
                    <span className="text-sm font-bold text-blue-600 tabular-nums">{ogTrailblazers}/100</span>
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    
                    {showOgTooltip && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 px-4 py-2.5 bg-gray-800 text-white text-xs rounded-2xl shadow-2xl w-56 text-center"
                        style={{ bottom: 'calc(100% + 8px)', zIndex: 99999 }}
                      >
                        First 100 auction participants get OG Trailblazer status with exclusive benefits
                        <div className="absolute left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" style={{ top: '100%' }}></div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600"><span className="font-bold text-blue-600 tabular-nums">{totalBids}</span> bids</span>
                  <span className="text-gray-600"><span className="font-bold text-blue-600 tabular-nums">{participants}</span> participants</span>
                </div>
              </div>
            </div>
            
            {/* Chart Header with Legend */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Auction Activity</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Avg. Bid Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-orange-500 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)' }}></div>
                  <span className="text-xs text-gray-600">Time Remaining</span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="relative flex-1 min-h-[240px]">
              {/* Left Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
                <span className="text-emerald-600 font-medium">$1000</span>
                <span>$750</span>
                <span>$500</span>
                <span>$250</span>
                <span>$0</span>
              </div>
              
              {/* Right Y-axis labels */}
              <div className="absolute right-0 top-0 bottom-8 w-10 flex flex-col justify-between text-xs text-gray-500 text-right">
                <span className="text-orange-600 font-medium">72h</span>
                <span>54h</span>
                <span>36h</span>
                <span>18h</span>
                <span>0h</span>
              </div>
                  
              {/* Chart area */}
              <div className="ml-12 mr-12 h-[calc(100%-32px)] relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 25, 50, 75, 100].map((pos) => (
                    <div key={pos} className="absolute w-full border-t border-gray-200" style={{ top: `${pos}%` }}></div>
                  ))}
                </div>
                
                {/* Dual Line chart */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                  <polyline
                    points="0,220 100,198 200,170 300,136 400,110 500,85 600,64 700,45 800,30"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,220 100,198 200,170 300,136 400,110 500,85 600,64 700,45 800,30 800,240 0,240"
                    fill="url(#priceGradientFlip)"
                    fillOpacity="0.15"
                  />
                  
                  <polyline
                    points="0,30 100,55 200,85 300,115 400,145 500,175 600,198 700,215 800,225"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8,4"
                  />
                  <polyline
                    points="0,30 100,55 200,85 300,115 400,145 500,175 600,198 700,215 800,225 800,240 0,240"
                    fill="url(#timeGradientFlip)"
                    fillOpacity="0.1"
                  />
                  
                  <circle cx="800" cy="30" r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                  <circle cx="800" cy="225" r="6" fill="#f97316" stroke="white" strokeWidth="2" />
                  
                  <defs>
                    <linearGradient id="priceGradientFlip" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="timeGradientFlip" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0"/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
                  
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-12 right-12 flex justify-between text-xs text-gray-500">
                <span>72h ago</span>
                <span>48h ago</span>
                <span>24h ago</span>
                <span className="font-medium text-gray-700">Now</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">As time decreases, bid competition increases — driving average prices higher</p>
          </div>
        </div>

        {/* Back Side - Recent Activity */}
        <div
          className={`absolute inset-0 w-full bg-white rounded-3xl border border-gray-200 overflow-hidden transition-shadow duration-700 ${
            isAnimating && isFlipped ? 'shadow-2xl' : 'shadow-lg'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                {!isBlindMode ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-600">LIVE</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-200">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-red-600">BLIND MODE</span>
                  </div>
                )}
              </div>
              {/* Flip Button - Always in top right corner like on front side */}
              <button
                onClick={() => handleFlip(false)}
                disabled={isAnimating}
                className={`p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110 active:scale-95 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                data-testid="flip-to-chart-btn"
                title="View Chart"
              >
                <svg className={`w-5 h-5 text-gray-500 hover:text-gray-700 transition-transform duration-300 ${isAnimating ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            
            {/* Blind Mode Warning */}
            {isBlindMode && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Final hour - All bid activity hidden
                </p>
              </div>
            )}
            
            {/* Activity Table */}
            <div className={`flex-1 ${isBlindMode ? 'overflow-hidden' : 'overflow-y-auto'} relative ${isBlindMode ? 'pointer-events-none select-none' : ''}`}>
              <div className={isBlindMode ? 'filter blur-md' : ''}>
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Target Rarity</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivityData.map((activity, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4"><span className="font-mono text-sm text-gray-700">{activity.user}</span></td>
                        <td className="py-3 px-4"><span className="text-sm text-gray-600">{activity.action}</span></td>
                        <td className="py-3 px-4"><span className="text-sm font-semibold text-gray-900">{activity.amount}</span></td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRarityColor(activity.rarity)}`}>{activity.rarity}</span>
                        </td>
                        <td className="py-3 px-4 text-right"><span className="text-xs text-gray-500">{activity.time}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">Showing latest {recentActivityData.length} activities</p>
              {!isBlindMode ? (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Updates in real-time</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-red-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Data locked</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionFlipCard;

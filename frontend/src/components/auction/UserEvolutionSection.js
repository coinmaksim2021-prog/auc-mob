import React, { useState, useEffect } from 'react';

const UserEvolutionSection = () => {
  const fomoScoreBadges = [
    { name: 'Stellar Awakening', range: '0-199', score: 0, description: "First steps into the FOMO universe", color: 'from-gray-400 to-gray-500' },
    { name: 'Cosmic Explorer', range: '200-399', score: 200, description: "Expanding presence and exploring", color: 'from-blue-400 to-blue-500' },
    { name: 'Galactic Navigator', range: '400-599', score: 400, description: "Reliable contributor in community", color: 'from-cyan-400 to-cyan-500' },
    { name: 'Celestial Master', range: '600-799', score: 600, description: "Impact felt across the galaxy", color: 'from-purple-400 to-purple-500' },
    { name: 'Astral Sage', range: '800-899', score: 800, description: "Recognized guide in FOMO cosmos", color: 'from-orange-400 to-orange-500' },
    { name: 'Universal Enlightenment', range: '900-1000', score: 900, description: "Ultimate level, cosmic influence", color: 'from-amber-400 to-amber-500' }
  ];

  // Static score - no animation
  const currentScore = 350;
  
  return (
    <section className="mt-12 mb-12 py-12 bg-gray-50 rounded-3xl">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-semibold text-purple-700">NFT Holders Only</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">FOMO Score Progression</h2>
        </div>
        <p className="text-center text-gray-600 mb-3 max-w-2xl mx-auto">
          Earn FOMO Score through engagement and unlock exclusive badges as you progress
        </p>
        <p className="text-center text-sm text-purple-600 font-medium mb-12 max-w-2xl mx-auto">
          ⚠️ NFT ownership required to activate and progress through FOMO Score levels
        </p>

        <div className="relative">
          {/* Desktop: Progress bar */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${(currentScore / 1000) * 100}%` }}
            ></div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-6 gap-4 relative">
            {fomoScoreBadges.map((badge, index) => {
              const isAchieved = currentScore >= badge.score;
              const isCurrent = currentScore >= badge.score && (index === fomoScoreBadges.length - 1 || currentScore < fomoScoreBadges[index + 1].score);
              
              // Define unique icons for each level
              const icons = [
                // Stellar Awakening - Star icon
                <path key={0} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
                
                // Cosmic Explorer - Globe/Planet icon
                <path key={1} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                
                // Galactic Navigator - Rocket icon  
                <path key={2} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />,
                
                // Celestial Master - Lightning/Spark icon
                <path key={3} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                
                // Astral Sage - Sparkles/Constellation icon
                <g key={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </g>,
                
                // Universal Enlightenment - Sun/Light icon
                <path key={5} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              ];
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out transform ${
                    isCurrent
                      ? `bg-gradient-to-br ${badge.color} shadow-lg ring-4 ring-blue-300 scale-110 shadow-2xl`
                      : isAchieved
                      ? 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-md'
                      : 'bg-gray-200 border-2 border-gray-300'
                  }`}>
                    <svg className={`w-10 h-10 transition-all duration-500 ${isAchieved || isCurrent ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icons[index]}
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-bold mb-1 transition-all duration-500 ${
                      isCurrent ? 'text-blue-600 scale-105' : isAchieved ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {badge.name}
                    </p>
                    <p className={`text-xs font-semibold mb-1 transition-all duration-500 ${
                      isCurrent ? 'text-blue-500' : isAchieved ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {badge.range}
                    </p>
                    <p className={`text-xs transition-all duration-500 ${
                      isCurrent ? 'text-gray-600' : isAchieved ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {fomoScoreBadges.map((badge, index) => {
                const isAchieved = currentScore >= badge.score;
                const isCurrent = currentScore >= badge.score && (index === fomoScoreBadges.length - 1 || currentScore < fomoScoreBadges[index + 1].score);
                
                // Define unique icons for each level
                const icons = [
                  // Stellar Awakening - Star icon
                  <path key={0} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
                  
                  // Cosmic Explorer - Globe/Planet icon
                  <path key={1} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  
                  // Galactic Navigator - Rocket icon  
                  <path key={2} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />,
                  
                  // Celestial Master - Lightning/Spark icon
                  <path key={3} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  
                  // Astral Sage - Sparkles/Constellation icon
                  <g key={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </g>,
                  
                  // Universal Enlightenment - Sun/Light icon
                  <path key={5} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ];
                
                return (
                  <div key={index} className="flex flex-col items-center snap-center shrink-0" style={{ width: '180px' }}>
                    <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out transform ${
                      isCurrent
                        ? `bg-gradient-to-br ${badge.color} shadow-lg ring-4 ring-blue-300 scale-110 shadow-2xl`
                        : isAchieved
                        ? 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-md'
                        : 'bg-gray-200 border-2 border-gray-300'
                    }`}>
                      <svg className={`w-10 h-10 transition-all duration-500 ${isAchieved || isCurrent ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icons[index]}
                      </svg>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-bold mb-1 transition-all duration-500 ${
                        isCurrent ? 'text-blue-600 scale-105' : isAchieved ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {badge.name}
                      </p>
                      <p className={`text-xs font-semibold mb-1 transition-all duration-500 ${
                        isCurrent ? 'text-blue-500' : isAchieved ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {badge.range}
                      </p>
                      <p className={`text-xs transition-all duration-500 ${
                        isCurrent ? 'text-gray-600' : isAchieved ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {fomoScoreBadges.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            Current Score: <span className="text-blue-600">{currentScore}</span> / 1000
          </p>
          <p className="text-sm text-gray-600">
            {currentScore < 200 
              ? `${200 - currentScore} more points to reach Cosmic Explorer`
              : currentScore < 400 
              ? `${400 - currentScore} more points to reach Galactic Navigator`
              : currentScore < 600
              ? `${600 - currentScore} more points to reach Celestial Master`
              : currentScore < 800
              ? `${800 - currentScore} more points to reach Astral Sage`
              : currentScore < 900
              ? `${900 - currentScore} more points to reach Universal Enlightenment`
              : 'Maximum level reached! 🎉'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserEvolutionSection;

import React from 'react';
import { motion } from 'framer-motion';

const StrategyValueSection = () => {
  const steps = [
    {
      num: '01',
      title: 'You Buy NFT',
      desc: 'Participate in auction and get unique NFT at floor price',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" className="stroke-gray-300" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="14" className="stroke-gray-400" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="8" className="fill-gray-800"/>
          <path d="M24 4V8M24 40V44M4 24H8M40 24H44" className="stroke-gray-300" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Strategy Works',
      desc: 'Trading fees automatically flow into Treasury',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" className="stroke-gray-300" strokeWidth="2" strokeDasharray="4 2"/>
          <path d="M24 12L24 24L32 28" className="stroke-gray-800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="24" r="3" className="fill-gray-800"/>
          <path d="M38 24a14 14 0 01-14 14" className="stroke-emerald-500" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Buyback & Burn',
      desc: 'Strategy buys NFTs from market and burns them',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <path d="M24 44c-8 0-14-6-14-14 0-10 14-22 14-22s14 12 14 22c0 8-6 14-14 14z" className="fill-gray-200 stroke-gray-400" strokeWidth="2"/>
          <path d="M24 44c-4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-3 7-7 7z" className="fill-gray-400"/>
          <path d="M24 44c-2 0-3.5-1.5-3.5-3.5 0-2.5 3.5-5.5 3.5-5.5s3.5 3 3.5 5.5c0 2-1.5 3.5-3.5 3.5z" className="fill-gray-700"/>
        </svg>
      )
    },
    {
      num: '04',
      title: 'Floor Rises',
      desc: 'Less supply + constant demand = price growth',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="36" width="6" height="8" rx="1" className="fill-gray-300"/>
          <rect x="16" y="28" width="6" height="16" rx="1" className="fill-gray-400"/>
          <rect x="26" y="20" width="6" height="24" rx="1" className="fill-gray-500"/>
          <rect x="36" y="10" width="6" height="34" rx="1" className="fill-gray-800"/>
          <path d="M8 32L18 24L28 18L40 8" className="stroke-emerald-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="40" cy="8" r="3" className="fill-emerald-500"/>
        </svg>
      )
    }
  ];

  return (
    <section className="my-16" data-testid="strategy-value-section">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl mb-4 tracking-wide">
          WHY BUY NOW?
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your NFT Will Only <span className="text-emerald-500">Grow in Value</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          FOMO Strategy creates perpetual buying pressure. Every trade feeds the machine that pushes your NFT floor price higher.
        </p>
      </div>

      {/* Animated Flow */}
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200 transition-all text-center group">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-xl flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
                
                {/* Icon Container with subtle glow effect */}
                <div className="w-20 h-20 mx-auto mb-4 mt-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>

              {/* Arrow between cards (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-xl flex items-center justify-center z-20 shadow-sm">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="mt-12 bg-gray-900 rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-white font-semibold">Perpetual Buyback</div>
            <div className="text-gray-400 text-sm">Strategy never stops working</div>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-gray-700 py-6 md:py-0">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="text-white font-semibold">Decreasing Supply</div>
            <div className="text-gray-400 text-sm">NFTs burned permanently</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-white font-semibold">Rising Floor</div>
            <div className="text-gray-400 text-sm">Price can only go up</div>
          </div>
        </div>
        
        {/* Bottom message */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-300 text-sm">
            <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            <span className="text-white font-medium">Early bidders get lowest prices.</span> As floor rises, auction prices follow.
          </p>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="text-center mt-8">
        <button 
          onClick={() => { 
            // Dispatch custom event to navigate to home page
            window.dispatchEvent(new CustomEvent('navigateTo', { detail: 'home' }));
          }}
          data-testid="learn-more-btn"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Learn more about FOMO Strategy
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default StrategyValueSection;

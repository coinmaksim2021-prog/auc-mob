import React from 'react';
import { motion } from 'framer-motion';

const FOMOUniverseSection = () => {
  const universeItems = [
    {
      num: '01',
      title: 'Pre-Mint BOX',
      desc: '666 boxes with 3 rarity levels for Box Fusion',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="14" width="32" height="26" rx="3" className="fill-gray-200 stroke-gray-400" strokeWidth="2"/>
          <path d="M8 20h32" className="stroke-gray-400" strokeWidth="2"/>
          <rect x="18" y="14" width="12" height="6" rx="1" className="fill-gray-400"/>
          <circle cx="24" cy="30" r="6" className="fill-gray-800"/>
          <path d="M22 30l2 2 4-4" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Main Collection',
      desc: '4,444 NFTs across 5 rarity tiers with XP multipliers',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="8" width="16" height="16" rx="2" className="fill-gray-300 stroke-gray-400" strokeWidth="2"/>
          <rect x="26" y="8" width="16" height="16" rx="2" className="fill-gray-400 stroke-gray-500" strokeWidth="2"/>
          <rect x="6" y="28" width="16" height="16" rx="2" className="fill-gray-500 stroke-gray-600" strokeWidth="2"/>
          <rect x="26" y="28" width="16" height="16" rx="2" className="fill-gray-800 stroke-gray-900" strokeWidth="2"/>
          <circle cx="34" cy="36" r="4" className="fill-emerald-500"/>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Box Fusion',
      desc: 'Burn 2 boxes → 1 NFT with ~2% Hidden NFT chance',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <circle cx="14" cy="24" r="8" className="fill-gray-300 stroke-gray-400" strokeWidth="2"/>
          <circle cx="34" cy="24" r="8" className="fill-gray-300 stroke-gray-400" strokeWidth="2"/>
          <path d="M22 24h4" className="stroke-gray-600" strokeWidth="3" strokeLinecap="round"/>
          <path d="M24 18v12" className="stroke-gray-600" strokeWidth="3" strokeLinecap="round"/>
          <path d="M24 40l-4-6h8l-4 6z" className="fill-emerald-500"/>
          <circle cx="24" cy="44" r="3" className="fill-gray-800"/>
        </svg>
      )
    },
    {
      num: '04',
      title: 'Rare NFTs',
      desc: 'Hidden (~2-5%) & Singularity (max 33) with up to x2.5 XP',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          <polygon points="24,4 30,18 44,20 34,30 36,44 24,38 12,44 14,30 4,20 18,18" className="fill-gray-200 stroke-gray-400" strokeWidth="2"/>
          <polygon points="24,12 27,20 36,21 30,27 31,36 24,32 17,36 18,27 12,21 21,20" className="fill-gray-800"/>
          <circle cx="24" cy="24" r="4" className="fill-emerald-500"/>
        </svg>
      )
    }
  ];

  return (
    <section className="my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-4 tracking-wide">
          ECOSYSTEM
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          FOMO <span className="text-emerald-500">Universe</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore the complete ecosystem of NFTs, fusion mechanics, and rare collectibles
        </p>
      </div>

      {/* Cards Grid - 4 columns */}
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative z-10">
          {universeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200 transition-all text-center group h-full">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {item.num}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-3 mt-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  {item.icon}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>

              {/* Arrow between cards (desktop) */}
              {i < universeItems.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2.5 transform -translate-y-1/2 w-5 h-5 bg-white border border-gray-200 rounded-full items-center justify-center z-20 shadow-sm">
                  <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Horizontal Scroll Alternative */}
      <div className="md:hidden mt-6">
        <div className="overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {universeItems.map((item, i) => (
              <div key={i} className="snap-center shrink-0" style={{ width: '240px' }}>
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-lg text-center h-full">
                  <div className="w-7 h-7 mx-auto mb-3 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.num}
                  </div>
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FOMOUniverseSection;

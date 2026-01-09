import React from 'react';
import BuybackCycleAnimation from '../BuybackCycleAnimation';

function HeroSection({ setCurrentPage, strategyState }) {
  // Extract data from strategyState with fallbacks
  const nftSupply = strategyState?.nft_supply || {};
  const activity = strategyState?.activity || {};
  const treasury = strategyState?.treasury || {};

  // Format numbers with locale
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '—';
    return num.toLocaleString('en-US');
  };

  // Format ETH with 2 decimals
  const formatETH = (num) => {
    if (num === undefined || num === null) return '—';
    return `${num.toFixed(2)} ETH`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
      {/* Background Animation - only in hero */}
      <BuybackCycleAnimation />
      
      <div className="hero-background">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="text-center animate-fade-in relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          FOMO Strategy
          <span className="block text-gray-800 mt-2 text-3xl sm:text-4xl lg:text-5xl">NFT Buyback & Burn</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
          An automated perpetual machine combining NFT and token buybacks to create sustainable value through strategic treasury management and supply reduction
        </p>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button 
            onClick={() => setCurrentPage('strategy')}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-telegram-xl font-semibold text-sm sm:text-base hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            Explore Strategy →
          </button>
          <a
            href="https://www.fomo.cx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-gray-200 text-gray-900 px-6 sm:px-10 py-3 sm:py-4 rounded-telegram-xl font-semibold text-sm sm:text-base hover:bg-gray-50 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            Buy NFT
          </a>
        </div>
      </div>

      {/* Stats Cards - Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-6 mt-20 animate-slide-up relative z-10">
        {/* NFT Circulation */}
        <div className="bg-white rounded-telegram-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group">
          <div className="stat-number mb-2 group-hover:scale-105 transition-transform">
            {formatNumber(nftSupply.market_circulating)}
          </div>
          <p className="text-gray-500 font-medium">NFT Circulation</p>
          {strategyState && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          )}
        </div>

        {/* $F Tokens Burned */}
        <div className="bg-white rounded-telegram-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group">
          <div className="stat-number mb-2 group-hover:scale-105 transition-transform">
            {formatNumber(activity.tokens_burned)}
          </div>
          <p className="text-gray-500 font-medium">F Tokens Burned</p>
          {strategyState && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          )}
        </div>

        {/* Treasury Accumulation */}
        <div className="bg-white rounded-telegram-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group">
          <div className="stat-number mb-2 group-hover:scale-105 transition-transform">
            {formatETH(treasury.eth_balance)}
          </div>
          <p className="text-gray-500 font-medium">Treasury Accumulation</p>
          {strategyState && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards - Mobile: Horizontal Scroll */}
      <div className="sm:hidden mt-16 animate-slide-up relative z-10">
        <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {/* NFT Circulation */}
            <div className="bg-white rounded-telegram-xl p-6 shadow-lg border border-gray-100 text-center snap-center shrink-0" style={{ width: '260px' }}>
              <div className="stat-number mb-2">
                {formatNumber(nftSupply.market_circulating)}
              </div>
              <p className="text-gray-500 font-medium">NFT Circulation</p>
              {strategyState && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              )}
            </div>

            {/* $F Tokens Burned */}
            <div className="bg-white rounded-telegram-xl p-6 shadow-lg border border-gray-100 text-center snap-center shrink-0" style={{ width: '260px' }}>
              <div className="stat-number mb-2">
                {formatNumber(activity.tokens_burned)}
              </div>
              <p className="text-gray-500 font-medium">F Tokens Burned</p>
              {strategyState && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              )}
            </div>

            {/* Treasury Accumulation */}
            <div className="bg-white rounded-telegram-xl p-6 shadow-lg border border-gray-100 text-center snap-center shrink-0" style={{ width: '260px' }}>
              <div className="stat-number mb-2">
                {formatETH(treasury.eth_balance)}
              </div>
              <p className="text-gray-500 font-medium">Treasury Accumulation</p>
              {strategyState && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

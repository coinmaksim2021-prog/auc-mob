import React from 'react';
import Tooltip from './Tooltip';

const StrategyHero = ({ strategyState }) => {
  if (!strategyState) return null;

  const treasury = strategyState?.treasury || {};
  const nftSupply = strategyState?.nft_supply || {};
  const market = strategyState?.market || {};
  const activity = strategyState?.activity || {};

  // Calculate key metrics
  const tvl = treasury.eth_balance || 0;
  const totalBurned = nftSupply.burned || 0;
  const burnPercent = nftSupply.total_minted > 0 
    ? ((totalBurned / nftSupply.total_minted) * 100).toFixed(1)
    : 0;
  
  // Calculate estimated APY based on activity
  const monthlyProfit = (activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0);
  const estimatedAPY = tvl > 0 ? ((monthlyProfit * 12) / tvl * 100).toFixed(1) : 0;

  const scrollToSwap = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-telegram-xl border border-emerald-100 mb-8 shadow-lg hover:shadow-xl transition-all">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        ></div>
      </div>

      <div className="relative z-10 px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">FOMO Strategy Dashboard</h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-200 rounded-pill">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-700">Live</span>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Automated NFT buyback & burn strategy powered by community token swaps. Every swap fuels the ecosystem growth.
            </p>
          </div>
          
          {/* Text CTA instead of button - swap is visible below */}
          <div className="hidden lg:flex items-center gap-2 text-emerald-600 font-medium">
            <span className="text-sm">Swap below</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Key Metrics - Horizontal scroll on mobile */}
        <div className="overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex sm:grid sm:grid-cols-3 gap-4 min-w-max sm:min-w-0">
          {/* TVL */}
          <div className="w-44 sm:w-auto flex-shrink-0 sm:flex-shrink bg-white rounded-telegram-lg p-4 sm:p-5 border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                Total Value Locked
              </span>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Tooltip content="Total amount of ETH in strategy treasury ready for NFT purchases">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Tooltip>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {tvl.toFixed(2)} <span className="text-xl text-gray-500">ETH</span>
            </div>
            <div className="text-xs text-gray-500">
              ≈ ${(tvl * (market.eth_price_usd || 2000)).toLocaleString()} USD
            </div>
          </div>

          {/* NFTs Burned */}
          <div className="w-44 sm:w-auto flex-shrink-0 sm:flex-shrink bg-white rounded-telegram-lg p-4 sm:p-5 border border-gray-200 hover:border-orange-300 transition-all hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                NFTs Burned
              </span>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <Tooltip content="Number of NFTs permanently removed from circulation. Burning reduces supply and increases value of remaining NFTs">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Tooltip>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalBurned.toLocaleString()}
              <span className="text-lg text-orange-600 ml-2">🔥</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-pill h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
                  style={{ width: `${Math.min(burnPercent, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{burnPercent}%</span>
            </div>
          </div>

          {/* Strategy Performance */}
          <div className="w-44 sm:w-auto flex-shrink-0 sm:flex-shrink bg-white rounded-telegram-lg p-4 sm:p-5 border border-gray-200 hover:border-teal-300 transition-all hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                Est. Strategy APY
              </span>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <Tooltip content="Estimated annual yield based on profit from NFT sales minus buyback costs">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Tooltip>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {estimatedAPY > 0 ? '+' : ''}{estimatedAPY}%
            </div>
            <div className="text-xs text-gray-500">
              Based on recent performance
            </div>
          </div>
          </div>
        </div>
        {/* Scroll indicators - Mobile only */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-3">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Mobile hint - swap is visible below */}
        <div className="lg:hidden mt-6 flex items-center justify-center gap-2 text-emerald-600 font-medium">
          <span className="text-sm">Swap below</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StrategyHero;

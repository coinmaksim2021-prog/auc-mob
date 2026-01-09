import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSEO, { SEO_CONFIG } from '../utils/useSEO';
import StrategyHero from '../components/StrategyHero';
import ChartSection from '../components/ChartSection';
import CompactStats from '../components/CompactStats';
import StrategyCalculator from '../components/StrategyCalculator';
import SwapSection from '../components/SwapSection';
import FloorNFT from '../components/FloorNFT';
import Holdings from '../components/Holdings';
import Sales from '../components/Sales';
import StrategyValueFlow from '../components/StrategyValueFlow';
import StrategyCTASection from '../components/StrategyCTASection';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Strategy() {
  // SEO optimization
  useSEO(SEO_CONFIG.strategy);

  const [strategyState, setStrategyState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStrategyState();
    const interval = setInterval(fetchStrategyState, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStrategyState = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/strategy/state`);
      setStrategyState(response.data);
    } catch (error) {
      console.error('Error fetching strategy state:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !strategyState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading Strategy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 relative overflow-hidden">
      {/* Trading-style background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern - more visible */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        {/* Gradient blobs for depth - more visible */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-emerald-300/8 rounded-full blur-3xl"></div>
        {/* Trading chart lines - more visible */}
        <svg className="absolute top-10 left-0 w-full h-40 opacity-[0.08]" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path 
            d="M0,50 Q100,20 200,45 T400,30 T600,55 T800,25 T1000,50 T1200,35" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3"
          />
          <path 
            d="M0,60 Q150,80 300,55 T600,70 T900,45 T1200,60" 
            fill="none" 
            stroke="#6b7280" 
            strokeWidth="2"
          />
        </svg>
        <svg className="absolute bottom-40 left-0 w-full h-32 opacity-[0.06]" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path 
            d="M0,30 Q200,60 400,35 T800,55 T1200,40" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Hero Section */}
        <StrategyHero strategyState={strategyState} />

        {/* Main Grid: Chart + Stats Left, Swap + Floor NFT Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mobile only: Swap -> Chart -> ActivityStats -> CompactStats -> FloorNFT */}
          <div className="lg:hidden space-y-4">
            <SwapSection strategyState={strategyState} hideMobileStats={true} />
            <ChartSection strategyState={strategyState} />
            {/* Activity Stats - Mobile version after chart */}
            <div className="card">
              <div className="grid grid-cols-2 gap-4">
                {/* Activity Stats Column */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-3">Activity Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600">Total Spent</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {(strategyState?.activity?.eth_spent_on_buybacks || 0).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600">Total Earned</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {(strategyState?.activity?.eth_received_from_sales || 0).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-[10px] text-gray-600">Net Profit</span>
                      <span className="text-xs font-bold text-emerald-600">
                        +{((strategyState?.activity?.eth_received_from_sales || 0) - (strategyState?.activity?.eth_spent_on_buybacks || 0)).toFixed(2)} ETH
                      </span>
                    </div>
                  </div>
                </div>
                {/* Supply Info Column */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-3">Supply Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600">Total Supply</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {(strategyState?.nft_supply?.total_minted || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600">Circulating</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {(strategyState?.nft_supply?.market_circulating || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-[10px] text-gray-600">Strategy</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {(strategyState?.nft_supply?.strategy_owned || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600">Burned</span>
                      <span className="text-xs font-bold text-orange-600">
                        {(strategyState?.nft_supply?.burned || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CompactStats strategyState={strategyState} />
            <FloorNFT strategyState={strategyState} />
          </div>

          {/* Desktop: Left Column - Chart + Stats (2/3 width) */}
          <div className="hidden lg:block lg:col-span-2 space-y-6">
            <ChartSection strategyState={strategyState} />
            <CompactStats strategyState={strategyState} />
          </div>

          {/* Desktop: Right Column - Swap + Floor NFT */}
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            <SwapSection strategyState={strategyState} />
            <FloorNFT strategyState={strategyState} />
          </div>
        </div>

        {/* Holdings Section */}
        <div className="mt-8">
          <Holdings strategyState={strategyState} />
        </div>

        {/* Sales Section */}
        <div className="mt-8">
          <Sales strategyState={strategyState} />
        </div>

        {/* Strategy Value Flow Section */}
        <div className="mt-8">
          <StrategyValueFlow strategyState={strategyState} />
        </div>
      </div>
      
      {/* CTA Section */}
      <StrategyCTASection />
      
      <Footer />
    </div>
  );
}

export default Strategy;

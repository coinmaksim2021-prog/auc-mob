import React from 'react';

const PlaceBidPanel = ({ currentBid, totalBids, participants, onPlaceBid }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg" data-testid="place-bid-panel">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Place Your Bid</h3>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-emerald-600 tracking-wide">LIVE</span>
        </div>
      </div>
      
      {/* Current Bid */}
      <div className="p-4 bg-gray-50 rounded-2xl mb-4">
        <p className="text-xs text-gray-500 mb-1">Current Highest Bid</p>
        <p className="text-3xl font-bold text-gray-900">{currentBid} <span className="text-base text-gray-500">USDC</span></p>
      </div>

      {/* Bonus Sections - Two columns side by side */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">⭐</span>
            <span className="text-xs font-semibold text-gray-900">Higher Bid</span>
          </div>
          <p className="text-[11px] text-gray-500">More XP & Rewards</p>
        </div>
        
        <div className="p-3 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">⏱</span>
            <span className="text-xs font-semibold text-gray-900">Early Bidder</span>
          </div>
          <p className="text-[11px] text-gray-500">Time Bonus Boost</p>
        </div>
      </div>
      
      {/* Place Bid Button with min bid hint */}
      <button 
        onClick={onPlaceBid}
        className="w-full bg-gray-900 text-white py-4 rounded-3xl font-semibold text-sm hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        data-testid="place-bid-btn"
      >
        Place Bid <span className="text-gray-400 font-normal">(min 100 USDC)</span>
      </button>

      {/* Stats under button - wider and more prominent */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="text-center flex-1">
          <p className="text-xl font-bold text-gray-900">{totalBids}</p>
          <p className="text-xs text-gray-400">Total Bids</p>
        </div>
        <div className="w-px h-8 bg-gray-200"></div>
        <div className="text-center flex-1">
          <p className="text-xl font-bold text-gray-900">{participants}</p>
          <p className="text-xs text-gray-400">Participants</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceBidPanel;

import React from 'react';

const steps = [
  { step: '1', title: 'Place Blind Bid', desc: 'Your bid stays hidden from others' },
  { step: '2', title: 'Rarity Calculated', desc: 'Higher bids = better rarity odds' },
  { step: '3', title: 'Auction Ends', desc: 'NFTs distributed by bid amount' },
  { step: '4', title: 'Reveal & Earn XP', desc: 'Get your NFT + XP boost' }
];

const HowAuctionWorks = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg" data-testid="how-auction-works">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">How Auction Works</h3>
      
      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {steps.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all hover:shadow-sm">
            <div className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-3">
              {item.step}
            </div>
            <p className="font-medium text-gray-900 text-sm mb-1">{item.title}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {steps.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-5 bg-gray-50 rounded-2xl snap-center shrink-0" style={{ width: '200px' }}>
              <div className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-3">
                {item.step}
              </div>
              <p className="font-medium text-gray-900 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-xl bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowAuctionWorks;

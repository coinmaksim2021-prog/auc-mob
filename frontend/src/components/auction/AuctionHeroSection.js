import React from 'react';

const AuctionHeroSection = ({ timeLeft, totalBids, participants, onPlaceBid }) => {
  return (
    <section className="relative py-10 mb-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 -right-20 w-[350px] h-[350px] bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] bg-teal-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Urgency Banner - Last Hour */}
        {timeLeft.days === 0 && timeLeft.hours === 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl shadow-lg mb-4 animate-pulse-scale">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-bold tracking-wide">LAST HOUR — Don't miss out!</span>
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          FOMO NFT Auction
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Blind bidding for 4,444 unique NFTs. Higher bids unlock rarer tiers. 
          Your final NFT rarity is revealed after the auction ends.
        </p>

        {/* Timer */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Auction ends in</p>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <TimerDigit value={timeLeft.days} label="DAYS" />
            <Separator />
            <TimerDigit value={timeLeft.hours} label="HOURS" />
            <Separator />
            <TimerDigit value={timeLeft.minutes} label="MIN" />
            <Separator />
            <TimerDigit value={timeLeft.seconds} label="SEC" isSeconds />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimerDigit = ({ value, label, isSeconds = false }) => (
  <div className="text-center">
    <div className={`text-4xl md:text-[3.4rem] font-bold tracking-tight tabular-nums ${isSeconds ? 'text-emerald-600' : 'text-gray-900'}`}>
      {String(value).padStart(2, '0')}
    </div>
    <div className={`text-[9px] mt-0.5 font-medium tracking-wider ${isSeconds ? 'text-emerald-500' : 'text-gray-400'}`}>
      {label}
    </div>
  </div>
);

const Separator = () => (
  <span className="text-2xl md:text-4xl text-gray-300 font-light">:</span>
);

export default AuctionHeroSection;

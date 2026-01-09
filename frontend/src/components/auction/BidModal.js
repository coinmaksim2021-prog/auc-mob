import React from 'react';

const BidModal = ({ bidAmount, setBidAmount, onClose, onConfirm }) => {
  const quickBids = [
    { amount: '100', label: 'Minimum bid' },
    { amount: '200', label: '+5% Rarity Boost', highlight: true },
    { amount: '300', label: '+10% Rarity Boost', highlight: true },
    { amount: '500', label: '+20% Rarity + Early Bird', highlight: true }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()} data-testid="bid-modal">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Place Your Bid</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-xl hover:bg-gray-100 transition-colors" data-testid="close-modal-btn">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (USDC)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              data-testid="bid-amount-input"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-2 gap-3">
              {quickBids.map((quick, i) => (
                <button
                  key={i}
                  onClick={() => setBidAmount(quick.amount)}
                  data-testid={`quick-bid-${quick.amount}`}
                  className={`p-3.5 rounded-2xl border text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    bidAmount === quick.amount 
                      ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{quick.amount} USDC</p>
                  <p className={`text-xs ${quick.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {quick.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-xs text-gray-600">
              Higher bids increase your chances for rare NFTs. Unique bid amounts give additional bonus.
            </p>
          </div>
          
          <button 
            className="w-full bg-gray-900 text-white py-4 rounded-3xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={onConfirm}
            data-testid="confirm-bid-btn"
          >
            Confirm Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;

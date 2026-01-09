import React from 'react';

const topCategories = [
  { title: 'Azart Ranking', subtitle: 'Top 10', description: 'Highest number of bids & most original amounts' },
  { title: 'Pattern Masters', subtitle: 'Top 10', description: 'Most unique bid patterns discovered' },
  { title: 'Early Birds', subtitle: 'First 6h', description: 'Participated within first 6 hours' }
];

const TopBidders = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm" data-testid="top-bidders">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <span className="text-sm font-semibold text-gray-900">Top Bidders</span>
        <div className="group relative ml-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full cursor-help">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-medium text-emerald-600">Hidden</span>
          </div>
          {/* Tooltip for "Rankings are secret" */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-xl">
            Rankings are secret. Compete for mystery rewards!
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {topCategories.map((category, i) => (
          <div key={i} className="group relative">
            <div className="px-2.5 py-1.5 rounded-full border text-xs font-medium cursor-help transition-all bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300">
              {category.title}
              <span className="ml-1 text-[10px] opacity-50">{category.subtitle}</span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-[11px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-xl">
              {category.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBidders;

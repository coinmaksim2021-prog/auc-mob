import React from 'react';

const CollectionOverview = ({ variant = 'card' }) => {
  // Horizontal compact variant for placement above rarity section
  if (variant === 'horizontal') {
    return (
      <div className="flex items-center justify-between py-4 px-6 bg-white rounded-3xl border border-gray-200 shadow-sm" data-testid="collection-overview-horizontal">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">Collection Overview</span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Pre-Mint BOX:</span>
            <span className="text-sm font-bold text-gray-900">666</span>
          </div>
          
          <div className="w-px h-4 bg-gray-200"></div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Main Collection:</span>
            <span className="text-sm font-bold text-gray-900">4,444</span>
          </div>
          
          <div className="w-px h-4 bg-gray-200"></div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Supply:</span>
            <span className="text-sm font-bold text-emerald-600">4,777</span>
            <span className="text-xs text-gray-400">(+333 from Fusion)</span>
          </div>
        </div>
      </div>
    );
  }

  // Default card variant (for sidebar)
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Collection Overview
      </h3>
      
      <div className="space-y-3">
        <OverviewItem label="Pre-Mint BOX" value="666" />
        <OverviewItem label="Main Collection" value="4,444" />
        <OverviewItem 
          label="Total Supply" 
          value="4,777" 
          sublabel="incl. +333 from Box Fusion" 
          highlight 
        />
      </div>
    </div>
  );
};

const OverviewItem = ({ label, value, sublabel, highlight }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl ${highlight ? 'bg-gray-100' : 'bg-gray-50'}`}>
    <div>
      <p className={`text-sm ${highlight ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{label}</p>
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
    <p className={`text-lg font-bold ${highlight ? 'text-gray-900' : 'text-gray-700'}`}>{value}</p>
  </div>
);

export default CollectionOverview;

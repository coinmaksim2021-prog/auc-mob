import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useWeb3 } from '../context/Web3Context';
import { WalletConnectModal } from './modals';
import WalletBalance from './WalletBalance';

function Header({ currentPage, setCurrentPage }) {
  const { 
    walletAddress, 
    isConnecting, 
    isCorrectNetwork, 
    error,
    activeNetwork,
    connectWallet, 
    disconnectWallet,
    switchToZkSync 
  } = useWeb3();

  // Get Dynamic context for logout - always call hook
  const { handleLogOut: dynamicHandleLogOut } = useDynamicContext();

  const [showInviteModal, setShowInviteModal] = useState(false);
  
  console.log('Header render, showInviteModal:', showInviteModal, 'walletAddress:', walletAddress);

  const handleConnect = async () => {
    console.log('=== Header handleConnect called ===');
    console.log('Before setState, showInviteModal:', showInviteModal);
    console.log('isConnecting:', isConnecting);
    
    if (isConnecting) {
      console.log('Button is disabled, isConnecting=true');
      return;
    }
    
    // Open InviteModal instead of direct connect
    setShowInviteModal(true);
    console.log('After setState, should be true');
  };

  const handleDisconnect = () => {
    // Disconnect from Dynamic Labs
    console.log('=== Disconnecting Dynamic wallet ===');
    if (dynamicHandleLogOut) {
      dynamicHandleLogOut();
    }
    // Also disconnect classic wallet if needed
    disconnectWallet();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left side: Logo (clickable -> home) */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
            data-testid="logo-home-button"
          >
            <img src="/logo.svg" alt="FOMO Strategy" className="h-8 sm:h-10" />
          </button>
        </div>

        {/* Right side: Enter App + Auction + Connect Wallet */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => setCurrentPage('strategy')}
            data-testid="nav-enter-app-button"
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-telegram-lg font-semibold text-xs sm:text-sm transition-all border transform hover:scale-105 active:scale-95 whitespace-nowrap ${
              currentPage === 'strategy' 
                ? walletAddress
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-500 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="hidden sm:inline">Enter App</span>
            <span className="sm:hidden">App</span>
          </button>

          <button
            onClick={() => setCurrentPage('auction')}
            data-testid="nav-auction-button"
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-telegram-lg font-semibold text-xs sm:text-sm transition-all border transform hover:scale-105 active:scale-95 whitespace-nowrap ${
              currentPage === 'auction' 
                ? walletAddress
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-500 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg'
            }`}
          >
            Auction
          </button>

          {/* Network indicator when connected */}
          {walletAddress && !isCorrectNetwork && (
            <button
              onClick={switchToZkSync}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-telegram text-xs font-semibold text-red-700 hover:bg-red-100 transition-all transform hover:scale-105 active:scale-95"
              data-testid="switch-network-button"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Switch to zkSync
            </button>
          )}

          {!walletAddress ? (
            <button
              onClick={() => {
                console.log('=== HEADER BUTTON CLICKED ===');
                handleConnect();
              }}
              disabled={isConnecting}
              data-testid="connect-wallet-button"
              id="header-connect-wallet-btn"
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-telegram-lg font-semibold text-sm hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all disabled:opacity-50 transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {isConnecting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </>
              )}
            </button>
          ) : (
            <WalletBalance onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-b border-red-100 px-6 py-2">
          <p className="text-sm text-red-700 text-center">{error}</p>
        </div>
      )}

      {/* Wallet Connect Modal - rendered in portal at body level via position fixed */}
      {showInviteModal && ReactDOM.createPortal(
        <WalletConnectModal 
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />,
        document.body
      )}
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import './App.css';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { Web3Provider } from './context/Web3Context';
import { DYNAMIC_ENVIRONMENT_ID } from './config/constants';
import Header from './components/Header';
import Home from './pages/Home';
import Strategy from './pages/Strategy';
import Auction from './pages/Auction';
import FloatingShapes from './components/FloatingShapes';
import CookieConsent from './components/CookieConsent';
import CustomCursor from './components/CustomCursor';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Listen for navigation events from child components
  useEffect(() => {
    const handleNavigate = (e) => {
      setCurrentPage(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigateTo', handleNavigate);
    return () => window.removeEventListener('navigateTo', handleNavigate);
  }, []);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <Web3Provider>
        <div className="App relative">
          <CustomCursor />
          <FloatingShapes />
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="relative z-10">
            {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
            {currentPage === 'strategy' && <Strategy />}
            {currentPage === 'auction' && <Auction />}
          </main>
          <CookieConsent />
        </div>
      </Web3Provider>
    </DynamicContextProvider>
  );
}

export default App;

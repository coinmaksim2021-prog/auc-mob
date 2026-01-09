/**
 * WalletConnectModal Component
 * 
 * Two modes:
 * 1. Registration flow (new users): Wallet → Invite → Twitter → Done
 * 2. Connected view (returning users): Show wallet info with Disconnect/Change options
 */

import React, { useState, useEffect, useCallback } from 'react';
import { DynamicContextProvider, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DYNAMIC_ENVIRONMENT_ID } from '../../config/constants';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// ==================== LIGHTNING ICON ====================
const LightningIcon = () => (
  <div className="relative w-14 h-14 mx-auto mb-4">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl opacity-20" />
    <div className="absolute inset-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
  </div>
);

// ==================== WALLET ICON ====================
const WalletIcon = () => (
  <div className="relative w-16 h-16 mx-auto mb-4">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl opacity-20" />
    <div className="absolute inset-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    </div>
  </div>
);

// ==================== STEP INDICATOR ====================
const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {steps.map((step, idx) => (
      <React.Fragment key={step.number}>
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all ${
          step.completed 
            ? 'bg-emerald-500 text-white' 
            : currentStep === step.number
              ? 'bg-emerald-500 text-white ring-2 ring-emerald-200'
              : 'bg-gray-100 text-gray-400'
        }`}>
          {step.completed ? '✓' : step.number}
        </div>
        {idx < steps.length - 1 && (
          <div className={`w-8 h-0.5 ${step.completed ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

// ==================== CONNECTED WALLET VIEW ====================
const ConnectedWalletView = ({ walletAddress, userInfo, onDisconnect, onChangeWallet, onClose }) => {
  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  return (
    <div className="space-y-5">
      <WalletIcon />
      
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Wallet Connected</h2>
        <p className="text-sm text-gray-500 mt-1">Your wallet is linked to FOMO</p>
      </div>

      {/* Wallet Info Card */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Connected</p>
            <p className="text-xs text-gray-500 font-mono truncate">{shortAddress}</p>
          </div>
          <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
            Active
          </div>
        </div>

        {/* User Stats */}
        {userInfo && (
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Invite Code</p>
              <p className="text-sm font-bold text-gray-900 font-mono">{userInfo.invite_code || '—'}</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Twitter</p>
              <p className="text-sm font-bold text-gray-900">
                {userInfo.twitter_verified ? '✓ Linked' : 'Not linked'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onChangeWallet}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Change Wallet
        </button>
        
        <button
          onClick={onDisconnect}
          className="w-full py-3 px-4 bg-white hover:bg-red-50 text-red-600 font-medium rounded-xl transition-all border border-red-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Disconnect
        </button>
      </div>

      <button
        onClick={onClose}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
      >
        Close
      </button>
    </div>
  );
};

// ==================== REGISTRATION STEPS ====================

// Step 1: Connect Wallet
const WalletStep = ({ onConnect }) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-base font-semibold text-gray-900">Connect Wallet</h3>
      <p className="text-sm text-gray-500 mt-1">Link your crypto wallet to continue</p>
    </div>
    <button
      onClick={onConnect}
      className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Connect Wallet
    </button>
    <p className="text-xs text-center text-gray-400">MetaMask, WalletConnect, Coinbase & more</p>
  </div>
);

// Step 2: Invite Code
const InviteStep = ({ inviteCode, setInviteCode, onVerify, onSkip, isLoading, error }) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-base font-semibold text-gray-900">Enter Invite Code</h3>
      <p className="text-sm text-gray-500 mt-1">Got a referral code? Enter it below</p>
    </div>
    
    <div>
      <input
        type="text"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value.toUpperCase().slice(0, 6))}
        placeholder="ABC123"
        maxLength={6}
        className="w-full px-4 py-3 text-center text-lg font-mono font-semibold tracking-widest border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none uppercase"
      />
      {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
    </div>
    
    <button
      onClick={onVerify}
      disabled={isLoading || inviteCode.length !== 6}
      className={`w-full py-3 font-medium rounded-xl transition-all ${
        inviteCode.length === 6 
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isLoading ? 'Verifying...' : 'Verify Code'}
    </button>
    
    <button onClick={onSkip} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
      Skip for now
    </button>
  </div>
);

// Step 3: Twitter
const TwitterStep = ({ onConnect, onSkip, isConnected, username, isLoading }) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-base font-semibold text-gray-900">Connect Twitter</h3>
      <p className="text-sm text-gray-500 mt-1">Link your Twitter for bonus rewards</p>
    </div>
    
    {isConnected ? (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-700">Connected</p>
          <p className="text-xs text-blue-600">{username}</p>
        </div>
      </div>
    ) : (
      <button
        onClick={onConnect}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        {isLoading ? 'Connecting...' : 'Connect Twitter'}
      </button>
    )}
    
    <button onClick={onSkip} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
      Skip for now
    </button>
  </div>
);

// Step 4: Complete (only for first-time registration)
const CompleteStep = ({ acceptedTerms, setAcceptedTerms, onComplete, isLoading }) => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900">Almost Done!</h3>
      <p className="text-sm text-gray-500 mt-1">Accept terms to complete registration</p>
    </div>
    
    <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
      <input
        type="checkbox"
        checked={acceptedTerms}
        onChange={(e) => setAcceptedTerms(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
      />
      <span className="text-sm text-gray-600">
        I agree to the <a href="/terms" className="text-emerald-600 hover:underline">Terms of Service</a> and{' '}
        <a href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</a>
      </span>
    </label>
    
    <button
      onClick={onComplete}
      disabled={!acceptedTerms || isLoading}
      className={`w-full py-3 font-semibold rounded-xl transition-all ${
        acceptedTerms 
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isLoading ? 'Completing...' : 'Complete Registration'}
    </button>
  </div>
);

// ==================== MAIN MODAL CONTENT ====================
const ModalContent = ({ onClose, inviteCodeFromUrl }) => {
  const { primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext();
  
  const [mode, setMode] = useState('loading'); // 'loading', 'registration', 'connected'
  const [currentStep, setCurrentStep] = useState(1);
  const [inviteCode, setInviteCode] = useState(inviteCodeFromUrl || '');
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [lastCheckedWallet, setLastCheckedWallet] = useState('');

  const isWalletConnected = !!primaryWallet;
  const walletAddress = primaryWallet?.address || '';

  const [urlInviteCode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('ref') || urlParams.get('invite') || inviteCodeFromUrl || '').toUpperCase();
  });

  useEffect(() => {
    if (urlInviteCode && !inviteCode) {
      setInviteCode(urlInviteCode);
    }
  }, [urlInviteCode]);

  // Check user status when wallet connects or changes
  const checkUserStatus = useCallback(async (address) => {
    if (!address) {
      setMode('registration');
      setCurrentStep(1);
      return;
    }

    setMode('loading');
    try {
      const res = await fetch(`${API_URL}/api/user/${address}`);
      const data = await res.json();
      setLastCheckedWallet(address);

      if (data.exists && data.user) {
        setUserInfo(data.user);
        
        // Check if user has completed registration (accepted terms)
        if (data.user.terms_accepted) {
          // Returning user - show connected view
          setMode('connected');
          if (data.user.twitter_verified) {
            setIsTwitterConnected(true);
            setTwitterUsername(data.user.twitter_username || '');
          }
        } else {
          // User exists but hasn't completed registration
          setMode('registration');
          if (data.user.twitter_verified) {
            setIsTwitterConnected(true);
            setTwitterUsername(data.user.twitter_username || '');
            setCurrentStep(4); // Go to terms
          } else if (data.user.referred_by) {
            setCurrentStep(3); // Go to Twitter
          } else {
            setCurrentStep(2); // Go to invite
          }
        }
      } else {
        // New user
        setMode('registration');
        const codeToUse = urlInviteCode || inviteCode || '';
        await registerWallet(address, codeToUse);
        
        if (codeToUse.length === 6) {
          setCurrentStep(3);
        } else {
          setCurrentStep(2);
        }
      }
    } catch (err) {
      console.error('Error checking user:', err);
      setMode('registration');
      setCurrentStep(2);
    }
  }, [urlInviteCode, inviteCode]);

  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      if (walletAddress !== lastCheckedWallet) {
        // Reset for new wallet
        setUserInfo(null);
        setIsTwitterConnected(false);
        setTwitterUsername('');
        setAcceptedTerms(false);
        setError('');
        checkUserStatus(walletAddress);
      }
    } else {
      setMode('registration');
      setCurrentStep(1);
    }
  }, [isWalletConnected, walletAddress, lastCheckedWallet, checkUserStatus]);

  const registerWallet = async (address, codeToUse = '') => {
    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: address, invite_code: codeToUse })
      });
      const data = await res.json();
      if (data.success) {
        setUserInfo(data.user);
      }
    } catch (err) {
      console.error('Error registering wallet:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (handleLogOut) {
        await handleLogOut();
      }
      setMode('registration');
      setCurrentStep(1);
      setUserInfo(null);
      setLastCheckedWallet('');
      setIsTwitterConnected(false);
      setTwitterUsername('');
      setAcceptedTerms(false);
      setError('');
    } catch (err) {
      console.error('Error disconnecting:', err);
    }
  };

  const handleChangeWallet = async () => {
    await handleDisconnect();
    setTimeout(() => {
      setShowAuthFlow(true);
    }, 100);
  };

  const verifyInviteCode = async () => {
    if (!inviteCode.trim() || inviteCode.length !== 6) {
      setError('Please enter a valid 6-character code');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/invite/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invite_code: inviteCode })
      });
      const data = await res.json();
      
      if (data.valid) {
        if (walletAddress) {
          await fetch(`${API_URL}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wallet_address: walletAddress, invite_code: inviteCode })
          });
        }
        setCurrentStep(3);
      } else {
        setError(data.message || 'Invalid invite code');
      }
    } catch (err) {
      setError('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const connectTwitter = async () => {
    setIsLoading(true);
    try {
      const mockUsername = '@user_' + Math.random().toString(36).slice(2, 8);
      
      await fetch(`${API_URL}/api/twitter/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: walletAddress, twitter_username: mockUsername })
      });
      
      setTwitterUsername(mockUsername);
      setIsTwitterConnected(true);
      setCurrentStep(4);
    } catch (err) {
      setError('Failed to connect Twitter');
    } finally {
      setIsLoading(false);
    }
  };

  const completeRegistration = async () => {
    if (!acceptedTerms) return;
    setIsLoading(true);
    
    try {
      // Mark terms as accepted
      await fetch(`${API_URL}/api/user/accept-terms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: walletAddress })
      });
      
      // Switch to connected view
      setMode('connected');
    } catch (err) {
      console.error('Error completing registration:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Wallet', completed: isWalletConnected },
    { number: 2, title: 'Invite', completed: currentStep > 2 },
    { number: 3, title: 'Twitter', completed: isTwitterConnected },
    { number: 4, title: 'Done', completed: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          {/* Loading State */}
          {mode === 'loading' && (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-500">Checking wallet...</p>
            </div>
          )}

          {/* Connected View - for returning users */}
          {mode === 'connected' && (
            <ConnectedWalletView
              walletAddress={walletAddress}
              userInfo={userInfo}
              onDisconnect={handleDisconnect}
              onChangeWallet={handleChangeWallet}
              onClose={onClose}
            />
          )}

          {/* Registration Flow - for new users */}
          {mode === 'registration' && (
            <>
              <LightningIcon />
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Welcome to FOMO</h2>
              </div>
              
              <StepIndicator steps={steps} currentStep={currentStep} />
              
              {currentStep === 1 && !isWalletConnected && (
                <WalletStep onConnect={() => setShowAuthFlow(true)} />
              )}
              
              {currentStep === 2 && (
                <InviteStep
                  inviteCode={inviteCode}
                  setInviteCode={setInviteCode}
                  onVerify={verifyInviteCode}
                  onSkip={() => setCurrentStep(3)}
                  isLoading={isLoading}
                  error={error}
                />
              )}
              
              {currentStep === 3 && (
                <TwitterStep
                  onConnect={connectTwitter}
                  onSkip={() => setCurrentStep(4)}
                  isConnected={isTwitterConnected}
                  username={twitterUsername}
                  isLoading={isLoading}
                />
              )}
              
              {currentStep === 4 && (
                <CompleteStep
                  acceptedTerms={acceptedTerms}
                  setAcceptedTerms={setAcceptedTerms}
                  onComplete={completeRegistration}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN EXPORT ====================
const WalletConnectModal = ({ isOpen, onClose, inviteCodeFromUrl }) => {
  if (!isOpen) return null;

  // DynamicContextProvider already wraps the app in App.js
  // No need to nest it here
  return (
    <ModalContent onClose={onClose} inviteCodeFromUrl={inviteCodeFromUrl} />
  );
};

export default WalletConnectModal;

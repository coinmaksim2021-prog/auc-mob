import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ACTIVE_NETWORK, TOKENS, CONTRACTS } from '../config/zkSync';
import InviteModalSimple from './InviteModalSimple';
import Tooltip from './Tooltip';

function SwapSection({ strategyState, hideMobileStats = false }) {
  const { walletAddress, isCorrectNetwork, connectWallet, switchToZkSync, getBalance } = useWeb3();
  
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState(TOKENS[0]); // ETH
  const [toToken, setToToken] = useState(TOKENS[2]); // F Token
  const [balance, setBalance] = useState('0');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState(null); // null, 'pending', 'success', 'error'
  const [txHash, setTxHash] = useState(null);
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock exchange rate (in real app, this would come from the DEX)
  const MOCK_RATE = 23809.52; // 1 ETH = 23809.52 F tokens (for testing)
  const FEE_PERCENT = 10; // 10% fee as per strategy

  // Calculate output amount based on input
  const calculateOutput = useCallback((inputAmount, isFromETH) => {
    if (!inputAmount || isNaN(parseFloat(inputAmount))) return '';
    
    const amount = parseFloat(inputAmount);
    const feeMultiplier = (100 - FEE_PERCENT) / 100;
    
    if (isFromETH) {
      // ETH -> F
      return (amount * MOCK_RATE * feeMultiplier).toFixed(2);
    } else {
      // F -> ETH
      return (amount / MOCK_RATE * feeMultiplier).toFixed(6);
    }
  }, []);

  // Update balance when wallet connects
  useEffect(() => {
    const updateBalance = async () => {
      if (walletAddress) {
        const bal = await getBalance(walletAddress);
        setBalance(bal);
      }
    };
    updateBalance();
  }, [walletAddress, getBalance]);

  // Update toAmount when fromAmount changes
  useEffect(() => {
    const isFromETH = fromToken.symbol === 'ETH' || fromToken.symbol === 'WETH';
    const output = calculateOutput(fromAmount, isFromETH);
    setToAmount(output);
  }, [fromAmount, fromToken, calculateOutput]);

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleMaxClick = () => {
    if (fromToken.isNative) {
      // Leave some ETH for gas
      const maxAmount = Math.max(0, parseFloat(balance) - 0.001);
      setFromAmount(maxAmount.toFixed(4));
    } else {
      setFromAmount(balance);
    }
  };

  const handleSwap = async () => {
    console.log('handleSwap called, walletAddress:', walletAddress);
    
    if (!walletAddress) {
      // Open InviteModalSimple for wallet connection
      console.log('Opening InviteModal...');
      setShowInviteModal(true);
      return;
    }

    if (!isCorrectNetwork) {
      await switchToZkSync();
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setSwapStatus('error');
      return;
    }

    setIsSwapping(true);
    setSwapStatus('pending');

    try {
      // For testing: simulate swap transaction
      // In production, this would call the actual SyncSwap router contract
      
      const amountInWei = BigInt(Math.floor(parseFloat(fromAmount) * 1e18));
      const minAmountOut = BigInt(Math.floor(parseFloat(toAmount) * (1 - slippage / 100) * 1e18));
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

      console.log('Swap params:', {
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        amountIn: amountInWei.toString(),
        minAmountOut: minAmountOut.toString(),
        deadline,
        network: ACTIVE_NETWORK.name
      });

      // Simulate transaction (in real implementation, this would be:)
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const router = new ethers.Contract(CONTRACTS.SYNCSWAP_ROUTER_V2, SYNCSWAP_ROUTER_ABI, signer);
      // const tx = await router.swap(...);
      
      // For demo: simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful transaction
      const mockTxHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setTxHash(mockTxHash);
      setSwapStatus('success');
      
      // Clear inputs after successful swap
      setTimeout(() => {
        setFromAmount('');
        setToAmount('');
        setSwapStatus(null);
        setTxHash(null);
      }, 5000);
      
    } catch (error) {
      console.error('Swap error:', error);
      setSwapStatus('error');
    } finally {
      setIsSwapping(false);
    }
  };

  if (!strategyState) return null;

  const activity = strategyState.activity || {};
  const nftSupply = strategyState.nft_supply || {};

  const getButtonText = () => {
    if (!walletAddress) return 'Connect Wallet';
    if (!isCorrectNetwork) return 'Switch to zkSync';
    if (!fromAmount || parseFloat(fromAmount) <= 0) return 'Enter Amount';
    if (parseFloat(fromAmount) > parseFloat(balance) && fromToken.isNative) return 'Insufficient Balance';
    if (isSwapping) return 'Swapping...';
    return 'Swap Now';
  };

  const isButtonDisabled = () => {
    if (!walletAddress) return false;
    if (!isCorrectNetwork) return false;
    if (!fromAmount || parseFloat(fromAmount) <= 0) return true;
    if (parseFloat(fromAmount) > parseFloat(balance) && fromToken.isNative) return true;
    if (isSwapping) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Swap Card */}
      <div className="card border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">Token Swap</h3>
            <Tooltip content="Swap ETH for F tokens. 10% fee fuels NFT buybacks, token burns, and ecosystem development">
              <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-2">
            <Tooltip content="40% NFT buybacks · 30% token burns · 20% liquidity · 10% development" position="left">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold cursor-help">
                {FEE_PERCENT}% Fee
              </span>
            </Tooltip>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-1 mb-2">
              <label className="text-xs font-medium text-gray-700">Slippage Tolerance</label>
              <Tooltip content="Maximum price change you're willing to accept. Higher slippage increases transaction success chance but may result in worse price">
                <svg className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-4 py-2 text-xs font-semibold rounded-telegram transition-all transform hover:scale-105 active:scale-95 ${
                    slippage === value
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {value}%
                </button>
              ))}
              <div className="flex items-center">
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                  className="w-16 px-2 py-1.5 text-xs border border-gray-200 rounded-xl text-center"
                  step="0.1"
                  min="0.1"
                  max="50"
                />
                <span className="ml-1 text-xs text-gray-500">%</span>
              </div>
            </div>
          </div>
        )}

        {/* From Token */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-gray-600 font-medium">You Pay</label>
            {walletAddress && fromToken.isNative && (
              <button 
                onClick={handleMaxClick}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Max: {balance} ETH
              </button>
            )}
          </div>
          <div className="border border-gray-200 rounded-telegram-lg p-4 hover:border-gray-400 transition-colors bg-white">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || parseFloat(val) >= 0) {
                    setFromAmount(val);
                  }
                }}
                placeholder="0.0"
                min="0"
                className="text-2xl font-semibold bg-transparent outline-none w-full text-gray-900"
                data-testid="from-amount-input"
              />
              <div className="flex items-center gap-2">
                {fromToken.symbol === 'ETH' ? (
                  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                    <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                    <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602"/>
                    <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
                  </svg>
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    F
                  </div>
                )}
                <span className="font-semibold text-sm text-gray-900">{fromToken.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={switchTokens}
            className="bg-white border-2 border-gray-200 w-12 h-12 rounded-pill flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 hover:rotate-180 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
            data-testid="switch-tokens-button"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To Token */}
        <div className="mb-4">
          <label className="text-xs text-gray-600 mb-2 block font-medium">You Receive</label>
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="text-2xl font-semibold bg-transparent outline-none w-full text-gray-900"
                data-testid="to-amount-input"
              />
              <div className="flex items-center gap-2">
                {toToken.symbol === 'ETH' ? (
                  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                    <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                    <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602"/>
                    <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
                  </svg>
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    F
                  </div>
                )}
                <span className="font-semibold text-sm text-gray-900">{toToken.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Info */}
        {fromAmount && toAmount && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl text-xs">
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Rate</span>
              <span>1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(2)} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Fee ({FEE_PERCENT}%)</span>
              <span>{(parseFloat(fromAmount) * FEE_PERCENT / 100).toFixed(6)} {fromToken.symbol}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Slippage</span>
              <span>{slippage}%</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button 
          onClick={handleSwap} 
          disabled={isButtonDisabled()}
          className={`w-full py-4 rounded-telegram-xl font-semibold text-base transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${
            isButtonDisabled()
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl'
          }`}
          data-testid="swap-button"
        >
          {isSwapping && (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {getButtonText()}
        </button>

        {/* Transaction Status */}
        {swapStatus && (
          <div className={`mt-4 p-3 rounded-xl text-sm ${
            swapStatus === 'pending' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
            swapStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-100' :
            'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {swapStatus === 'pending' && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Transaction pending...
              </div>
            )}
            {swapStatus === 'success' && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Swap successful!
                </div>
                {txHash && (
                  <a 
                    href={`${ACTIVE_NETWORK.blockExplorer}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline hover:no-underline"
                  >
                    View on Explorer →
                  </a>
                )}
              </div>
            )}
            {swapStatus === 'error' && 'Transaction failed. Please try again.'}
          </div>
        )}

        {/* Fee Distribution Info */}
        <div className="mt-4 pt-4 border-t border-gray-100 px-3 py-2.5 bg-emerald-50/50 rounded-lg border-b border-emerald-100/50">
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Fee Distribution:</span> 10% swap fee fuels the ecosystem — 
            <span className="text-emerald-700 font-medium"> 40%</span> NFT buybacks, 
            <span className="text-emerald-700 font-medium"> 30%</span> token burns, 
            <span className="text-emerald-700 font-medium"> 20%</span> liquidity, 
            <span className="text-emerald-700 font-medium"> 10%</span> development.
          </p>
        </div>
      </div>

      {/* Activity Stats & Supply Info - Combined - Hidden on mobile, shown separately */}
      <div className="card hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Stats Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Activity Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total Spent</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(activity.eth_spent_on_buybacks || 0).toFixed(3)} ETH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total Earned</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(activity.eth_received_from_sales || 0).toFixed(3)} ETH
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-600">Net Profit</span>
                <span className="text-sm font-bold text-emerald-600">
                  +{((activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0)).toFixed(3)} ETH
                </span>
              </div>
            </div>
          </div>

          {/* Supply Info Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Supply Info</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total Supply</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(nftSupply.total_minted || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Circulating</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(nftSupply.market_circulating || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-600">Strategy Owned</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(nftSupply.strategy_owned || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Burned</span>
                <span className="text-sm font-bold text-orange-600">
                  {(nftSupply.burned || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stats & Supply Info - Mobile only - shows after chart */}
      {!hideMobileStats && (
        <div className="card lg:hidden">
          <div className="grid grid-cols-2 gap-4">
          {/* Activity Stats Column */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Activity Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-600">Total Spent</span>
                <span className="text-xs font-semibold text-gray-900">
                  {(activity.eth_spent_on_buybacks || 0).toFixed(2)} ETH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-600">Total Earned</span>
                <span className="text-xs font-semibold text-gray-900">
                  {(activity.eth_received_from_sales || 0).toFixed(2)} ETH
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-[10px] text-gray-600">Net Profit</span>
                <span className="text-xs font-bold text-emerald-600">
                  +{((activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0)).toFixed(2)} ETH
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
                  {(nftSupply.total_minted || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-600">Circulating</span>
                <span className="text-xs font-semibold text-gray-900">
                  {(nftSupply.market_circulating || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-[10px] text-gray-600">Strategy</span>
                <span className="text-xs font-semibold text-gray-900">
                  {(nftSupply.strategy_owned || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-600">Burned</span>
                <span className="text-xs font-bold text-orange-600">
                  {(nftSupply.burned || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteModalSimple 
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
}

export default SwapSection;

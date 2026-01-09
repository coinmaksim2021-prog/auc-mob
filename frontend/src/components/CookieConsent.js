import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState(null);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  const API = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('fomo_consent');
    if (!consent) {
      // Load settings from API
      fetch(`${API}/api/cookie-consent-settings`)
        .then(res => res.json())
        .then(data => {
          setSettings(data);
          if (data.enabled) {
            // Small delay before showing
            setTimeout(() => setIsVisible(true), 1000);
          }
        })
        .catch(err => {
          console.error('Failed to load cookie consent settings:', err);
          // Show with default settings on error
          setTimeout(() => setIsVisible(true), 1000);
        });
    }
  }, [API]);

  const handleAccept = () => {
    if (acceptedCookies && acceptedPrivacy) {
      localStorage.setItem('fomo_consent', JSON.stringify({
        cookies: true,
        privacy: true,
        timestamp: new Date().toISOString()
      }));
      setIsVisible(false);
    }
  };

  const openLegalModal = (type) => {
    let title = '';
    let content = '';
    
    if (type === 'cookies') {
      title = 'Cookie Policy';
      content = settings?.cookie_policy_content || getDefaultCookiePolicy();
    } else if (type === 'privacy') {
      title = 'Privacy Policy';
      content = settings?.privacy_policy_content || getDefaultPrivacyPolicy();
    } else if (type === 'terms') {
      title = 'Terms of Use';
      content = settings?.terms_content || getDefaultTerms();
    }
    
    setLegalModal({ isOpen: true, title, content });
  };

  const allAccepted = acceptedCookies && acceptedPrivacy;

  const title = settings?.title_en || 'Cookie & Privacy Settings';
  const description = settings?.description_en || 'We value your privacy. Please accept our cookies and privacy policy to continue exploring the FOMO platform.';

  return (
    <>
      {/* Overlay to block interaction */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            style={{ pointerEvents: 'auto' }}
            onClick={() => {
              // Allow closing by clicking backdrop if both checkboxes are checked
              if (acceptedCookies && acceptedPrivacy) {
                handleAccept();
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-3 pb-4 md:p-4 md:pb-6"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200/80">
                {/* Light gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-emerald-50/30" />
                
                {/* Subtle animated accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-pulse opacity-50" />
                </div>
                
                <div className="relative bg-white/95 backdrop-blur-xl p-4 md:p-5">
                  {/* Content */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                    {/* Icon & Text */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        {/* Cookie Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 font-bold text-base md:text-lg mb-1 flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1.5">
                              🍪 {title}
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-semibold border border-emerald-200">
                              Required
                            </span>
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {description}
                          </p>

                          {/* Checkboxes */}
                          <div className="space-y-2">
                            {/* Cookies */}
                            <label className="flex items-start gap-2.5 cursor-pointer group">
                              <div className="relative flex-shrink-0 mt-0.5">
                                <input
                                  type="checkbox"
                                  checked={acceptedCookies}
                                  onChange={(e) => setAcceptedCookies(e.target.checked)}
                                  className="peer sr-only"
                                />
                                <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 group-hover:border-emerald-400 shadow-sm flex items-center justify-center ${acceptedCookies ? 'border-emerald-500 bg-gradient-to-br from-emerald-400 to-teal-500' : 'border-gray-300'}`}>
                                  {acceptedCookies && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-gray-900 text-sm font-semibold">
                                  Essential Cookies
                                </span>
                                <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                                  Required for platform functionality, authentication, and security.{' '}
                                  <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLegalModal('cookies'); }}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors"
                                  >
                                    Cookie Policy
                                  </button>
                                </p>
                              </div>
                            </label>

                            {/* Privacy Policy */}
                            <label className="flex items-start gap-2.5 cursor-pointer group">
                              <div className="relative flex-shrink-0 mt-0.5">
                                <input
                                  type="checkbox"
                                  checked={acceptedPrivacy}
                                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                  className="peer sr-only"
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-emerald-500 peer-checked:bg-gradient-to-br peer-checked:from-emerald-400 peer-checked:to-teal-500 transition-all duration-200 group-hover:border-emerald-400 shadow-sm">
                                  <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-gray-900 text-sm font-semibold">
                                  Privacy Policy & Terms
                                </span>
                                <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                                  I agree to the{' '}
                                  <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLegalModal('privacy'); }}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors"
                                  >
                                    Privacy Policy
                                  </button>
                                  {' '}and{' '}
                                  <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLegalModal('terms'); }}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors"
                                  >
                                    Terms of Use
                                  </button>
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* Details Section */}
                          <AnimatePresence>
                            {showDetails && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 overflow-hidden"
                              >
                                <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-xl p-3 border border-gray-200 shadow-sm">
                                  <h4 className="text-emerald-700 font-semibold text-xs mb-2 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    What we collect:
                                  </h4>
                                  <ul className="text-gray-700 text-xs space-y-1.5 list-disc list-inside ml-1">
                                    <li>Essential cookies for authentication & security</li>
                                    <li>Analytics to improve platform performance</li>
                                    <li>User preferences and settings</li>
                                    <li>Wallet connection data (encrypted)</li>
                                  </ul>
                                  <div className="mt-2 flex items-start gap-1.5 text-gray-600 text-xs bg-white/50 rounded-lg p-2 border border-gray-200">
                                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="flex-1">
                                      Your data is encrypted and never sold to third parties.{' '}
                                      <button 
                                        onClick={(e) => { e.preventDefault(); openLegalModal('privacy'); }}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2"
                                      >
                                        Full Privacy Policy
                                      </button>
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[150px]">
                      <button
                        onClick={handleAccept}
                        disabled={!allAccepted}
                        className={`
                          px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg
                          ${allAccepted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer hover:from-emerald-600 hover:to-teal-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                          }
                        `}
                      >
                        {allAccepted ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Accept All
                          </span>
                        ) : (
                          'Select All'
                        )}
                      </button>
                      
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="px-5 py-2 text-gray-500 hover:text-emerald-600 text-xs font-medium transition-colors hover:bg-gray-50 rounded-lg"
                      >
                        {showDetails ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: acceptedCookies && acceptedPrivacy ? '100%' : 
                                 acceptedCookies || acceptedPrivacy ? '50%' : '0%' 
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-sm"
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-semibold whitespace-nowrap">
                      {acceptedCookies && acceptedPrivacy ? '2/2' : 
                       acceptedCookies || acceptedPrivacy ? '1/2' : '0/2'}
                    </span>
                  </div>

                  {/* Secure Badge */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 text-gray-400 text-xs">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secured by FOMO Platform • GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legal Modal */}
      <AnimatePresence>
        {legalModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setLegalModal({ isOpen: false, title: '', content: '' })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-emerald-700">{legalModal.title}</h2>
                <button
                  onClick={() => setLegalModal({ isOpen: false, title: '', content: '' })}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {legalModal.content || 'No content available. Please configure this policy in the admin panel.'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Default policy content - matching Footer legal pages
const getDefaultCookiePolicy = () => `FOMO Platform
COOKIE POLICY
Last updated: January 2026

This Cookie Policy explains how FOMO ("Company", "we", "us", "our") uses cookies and similar technologies on the FOMO website, auction interfaces, NFT sale pages, and related services (collectively, the "Platform").

This Cookie Policy should be read together with our Privacy Policy and Terms of Use.

1. What Are Cookies?
Cookies are small text files stored on your device when you visit a website.
They help websites function properly, improve user experience, and provide analytical insights.
Cookies do not give us access to your device or private wallet keys.

2. Types of Cookies We Use

2.1 Strictly Necessary Cookies
These cookies are essential for the Platform to operate correctly and cannot be disabled.
They are used to:
• Maintain session integrity
• Ensure platform security
• Enable core functionality
Without these cookies, the Platform may not function properly.

2.2 Functional Cookies
These cookies allow the Platform to:
• Remember user preferences
• Improve interface usability
• Enhance overall experience
Functional cookies do not track your activity outside the Platform.

2.3 Analytics Cookies
Analytics cookies help us understand how users interact with the Platform.
They may collect information such as:
• Pages visited
• Time spent on pages
• Interaction patterns
This data is used only in aggregated form to improve performance and usability.

2.4 Third-Party Cookies
Some features may rely on third-party services (e.g., analytics or infrastructure providers).
These third parties may place cookies in accordance with their own privacy policies.
We do not control third-party cookies.

3. Blockchain and Cookies
Blockchain interactions (such as wallet addresses or transactions) are not stored in cookies.
All blockchain data is:
• Public by nature
• Processed independently of cookies
• Governed by the underlying blockchain network

4. How You Can Manage Cookies
You can control or disable cookies through your browser settings.
Please note:
• Disabling necessary cookies may limit functionality
• Some features may not work as intended
Browser instructions vary depending on your device and browser.

5. Legal Basis for Cookies
Where required by law, cookies are used based on:
• Your consent
• Legitimate interests (platform security and functionality)
• Legal obligations

By continuing to use the Platform, you consent to the use of cookies as described in this Policy, unless you disable them through browser settings.

6. Changes to This Cookie Policy
We may update this Cookie Policy from time to time.
Any changes will be posted on the Platform, and the "Last updated" date will be revised accordingly.

7. Contact Information
If you have questions about this Cookie Policy, you may contact us through the official communication channels listed on the Platform.`;

const getDefaultPrivacyPolicy = () => `FOMO Platform
PRIVACY POLICY
Last updated: January 2026

This Privacy Policy explains how FOMO collects, uses, and protects information in connection with the Platform.

1. Information We Collect

1.1 Automatically Collected Data
• IP address
• Device and browser information
• Usage analytics
• Cookies and similar technologies

1.2 Blockchain Data
Public blockchain data, including:
• Wallet addresses
• Transaction hashes
• NFT ownership information
This data is public by nature and not controlled by us.

1.3 Voluntary Information
Information you voluntarily provide, such as:
• Contact email
• Support communications

2. How We Use Information
We use information to:
• Operate and maintain the Platform
• Ensure security and prevent abuse
• Analyze usage and improve functionality
• Comply with legal obligations

3. Data Sharing
We do not sell personal data.
We may share limited data with:
• Infrastructure and hosting providers
• Analytics services
• Legal authorities if required by law

4. Cookies
Cookies are used to:
• Maintain session integrity
• Improve user experience
• Analyze platform performance
You may disable cookies in your browser settings, but functionality may be affected.

5. Data Retention
We retain data only as long as necessary for:
• Operational purposes
• Legal compliance
• Security requirements

6. User Rights
Depending on your jurisdiction, you may have rights to:
• Access personal data
• Request correction or deletion
• Object to certain processing activities
Requests may be subject to legal and technical limitations.

7. Policy Updates
We may update this Privacy Policy periodically. The updated version will be published on the Platform.`;

const getDefaultTerms = () => `FOMO Auction & NFT Sale Platform
TERMS OF USE
Last updated: January 2026

These Terms of Use ("Terms") constitute a legally binding agreement between you ("User", "you") and FOMO ("Company", "we", "us", "our") governing your access to and use of the FOMO auction platform, NFT sale interfaces, smart-contract integrations, and related services (collectively, the "Platform").

By accessing or using the Platform, you confirm that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Disclaimer, which are incorporated herein by reference.

1. Purpose of the Platform
The Platform provides a technical interface for:
• Conducting NFT auctions
• Participating in primary NFT sales
• Interacting with smart contracts
• Accessing the FOMO strategy concept and related mechanics

The Platform does not provide financial, investment, legal, or tax advice and does not guarantee any outcomes.

2. Eligibility
You must be legally permitted to use blockchain-based services in your jurisdiction.
By using the Platform, you represent and warrant that:
• You are of legal age
• Your use does not violate applicable laws
• You are not restricted from using crypto-related services

3. User Responsibilities
You are solely responsible for:
• The security of your wallet, private keys, and credentials
• All blockchain transactions initiated from your wallet
• Understanding the mechanics and risks of NFTs and auctions

We do not have access to private keys and cannot recover lost assets.

4. NFT Sales and Auctions

4.1 Nature of NFTs
NFTs are blockchain-based digital assets. Purchasing an NFT does not imply:
• Ownership of intellectual property (unless explicitly stated)
• Future value, liquidity, or utility
• Entitlement to profits or rewards

4.2 Auction Mechanics
Auction rules, timing, pricing logic, and settlement are defined by the Platform interface and/or smart contracts. All auction outcomes are final, subject only to blockchain finality.

4.3 No Guarantees
We make no representations regarding:
• Future price or market demand
• Secondary market availability
• Continued functionality of NFTs

5. Prohibited Conduct
You agree not to:
• Exploit vulnerabilities
• Manipulate auctions or pricing mechanisms
• Interfere with smart contracts
• Use the Platform for unlawful activities

Violation may result in suspension or restriction of access.

6. Intellectual Property
The Platform's interface, branding, content, and software are owned by or licensed to FOMO.
No rights are granted except as explicitly stated.

7. Limitation of Liability
To the maximum extent permitted by law, FOMO shall not be liable for:
• Loss of digital assets
• Smart-contract failures
• Blockchain network issues
• Market volatility
• Indirect or consequential damages

Your use of the Platform is entirely at your own risk.

8. Modifications
We reserve the right to update these Terms at any time. Continued use constitutes acceptance of updated Terms.

9. Governing Law
These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict-of-law principles.`;

export default CookieConsent;

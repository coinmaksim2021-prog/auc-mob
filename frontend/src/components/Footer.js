import React, { useState } from 'react';

/**
 * Compact Footer for FOMO Strategy
 * Features: Resources, Legal Links, 2 Platform Buttons
 */

function Footer() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  const legalPages = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      content: `FOMO Platform
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
We may update this Privacy Policy periodically. The updated version will be published on the Platform.`
    },
    {
      id: 'terms',
      title: 'Terms of Use',
      content: `FOMO Auction & NFT Sale Platform
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
These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict-of-law principles.`
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: `FOMO Platform
DISCLAIMER
Last updated: January 2026

1. No Financial or Investment Advice
Nothing on the Platform constitutes financial, investment, legal, or tax advice.
All content is provided for informational and technical purposes only.

2. Risk Disclosure
Blockchain technology and NFTs involve significant risks, including:
• Price volatility
• Smart-contract vulnerabilities
• Regulatory uncertainty
• Irreversible transactions

You acknowledge and accept all risks associated with using the Platform.

3. "As Is" Basis
The Platform is provided "as is" and "as available" without warranties of any kind, express or implied.

We do not guarantee:
• Uninterrupted service
• Error-free operation
• Future availability of any feature

4. Third-Party Technologies
The Platform interacts with third-party blockchains, wallets, and smart contracts.
We are not responsible for failures or issues arising from third-party systems.

5. Limitation of Responsibility
Under no circumstances shall FOMO be liable for any losses or damages arising from:
• Use or inability to use the Platform
• NFT purchases or auction participation
• Reliance on Platform information

6. User Acknowledgment
By using the Platform, you confirm that:
• You understand the risks
• You act voluntarily
• You assume full responsibility for your actions`
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      content: `FOMO Platform
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
If you have questions about this Cookie Policy, you may contact us through the official communication channels listed on the Platform.`
    }
  ];

  const openLegalModal = (pageId) => {
    const page = legalPages.find(p => p.id === pageId);
    if (page) {
      setLegalModal({ isOpen: true, title: page.title, content: page.content });
    }
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, title: '', content: '' });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: grid 4 columns, Mobile: flex-col */}
          <div className="hidden md:grid md:grid-cols-4 md:items-start md:gap-8">
            {/* Left: Logo + Description */}
            <div className="space-y-3 text-left">
              <img 
                src="https://customer-assets.emergentagent.com/job_crypto-dashboard-91/artifacts/6ozprlkp_Main%20Logo.svg" 
                alt="FOMO Strategy" 
                className="h-8"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                NFT Buyback & Burn strategy for sustainable value creation.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automated perpetual machine combining NFT and token buybacks.
              </p>
            </div>

            {/* Platform Buttons */}
            <div className="flex flex-row gap-2 justify-start">
              <a
                href="https://www.fomo.cx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1.5 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all btn-hover-lift"
              >
                FOMO Platform
              </a>
              <a
                href="https://www.fomo.wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-900 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all btn-hover-lift"
              >
                FOMO Info
              </a>
            </div>

            {/* Resources */}
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Resources</h3>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">About</a>
                <a href="#fomo-strategy" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">FOMO Strategy</a>
                <a href="#nft-market" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">NFT Market</a>
              </div>
            </div>

            {/* Legal */}
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Legal</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => openLegalModal('privacy')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 text-left">Privacy Policy</button>
                <button onClick={() => openLegalModal('terms')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 text-left">Terms of Use</button>
                <button onClick={() => openLegalModal('disclaimer')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 text-left">Disclaimer</button>
                <button onClick={() => openLegalModal('cookies')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 text-left">Cookie Policy</button>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-6 md:hidden">
            {/* Logo + Description */}
            <div className="space-y-3 text-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_crypto-dashboard-91/artifacts/6ozprlkp_Main%20Logo.svg" 
                alt="FOMO Strategy" 
                className="h-8 mx-auto"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                NFT Buyback & Burn strategy for sustainable value creation.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automated perpetual machine combining NFT and token buybacks.
              </p>
            </div>

            {/* Platform Buttons - В ряд */}
            <div className="flex flex-row gap-2 justify-center">
              <a
                href="https://www.fomo.cx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1.5 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all btn-hover-lift"
              >
                FOMO Platform
              </a>
              <a
                href="https://www.fomo.wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-900 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all btn-hover-lift"
              >
                FOMO Info
              </a>
            </div>

            {/* Resources + Legal - 2 columns */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              {/* Resources */}
              <div className="text-center">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Resources</h3>
                <div className="flex flex-col gap-2">
                  <a href="#about" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">About</a>
                  <a href="#fomo-strategy" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">FOMO Strategy</a>
                  <a href="#nft-market" className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">NFT Market</a>
                </div>
              </div>

              {/* Legal */}
              <div className="text-center">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Legal</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => openLegalModal('privacy')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">Privacy Policy</button>
                  <button onClick={() => openLegalModal('terms')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">Terms of Use</button>
                  <button onClick={() => openLegalModal('disclaimer')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">Disclaimer</button>
                  <button onClick={() => openLegalModal('cookies')} className="text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200">Cookie Policy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Copyright - Compact */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} FOMO Strategy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModal.isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg"
          onClick={closeLegalModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with green gradient like CookieConsent */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-emerald-700">{legalModal.title}</h2>
              <button
                onClick={closeLegalModal}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {legalModal.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

# Changelog

All notable changes to FOMO Strategy platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-01-10

### 📱 Mobile Adaptive Design Update

This release focuses on comprehensive mobile optimization, implementing horizontal scroll patterns, compact layouts, and improved touch interactions.

### Added

#### 🎯 Horizontal Scroll Patterns
- **Hero Stats** (Total Value Locked, NFTs Burned, Est. Strategy APY):
  - Horizontal scroll instead of vertical stack
  - 3 dot pagination indicators
  - Fixed card width (w-44) for consistency
  
- **Stats Rows** (% Token in LP, NFTs to Floor, Price Gap, SPI, Treasury, etc.):
  - Two rows of 4 cards each with horizontal scroll
  - 4 dot indicators per row
  - Fixed card width (w-36)

- **Holdings & Sales NFT Grids**:
  - Horizontal scroll for NFT cards
  - 6 dot pagination indicators
  - Fixed card width (w-32)

#### 🎨 CSS Utilities
```css
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

### Changed

#### 📐 Header Navigation
- Reduced button sizes on mobile (`px-3 py-2` vs `px-6 py-3`)
- Smaller font size (`text-xs` vs `text-sm`)
- Tighter gaps (`gap-1.5` vs `gap-3`)

#### 📊 F Token Price Section
- Smaller title on mobile (`text-base` vs `text-xl`)
- Compact price format: `$0.0{5}42` instead of `$0.000042`
- Short labels: "Price", "24h", "Vol", "MCap"
- Full labels on desktop: "Price", "24h Change", "Volume 24h", "Market Cap"

#### 🔥 Token Burn Status
- Reduced stat sizes (`text-lg` vs `text-2xl`)
- Compact padding (`p-2` vs `p-4`)
- Smaller labels (`text-[10px]` vs `text-xs`)

#### 📱 Strategy Page Layout (Mobile)
- New order: Token Swap → F Token Price → Activity Stats → Holdings
- Activity Stats separated from SwapSection
- Activity Stats shown after chart on mobile

#### 🎬 CTA Sections
- **Strategy CTA** ("Ready to Join the Strategy?"):
  - Compact buttons (`px-4 py-2.5 text-xs`)
  - Shorter text: "Swap Tokens →" instead of "Swap Tokens Now →"
  
- **Home CTA** ("Ready to Get Started?"):
  - Title size matched to FAQ (`text-3xl`)
  - Subtitle size matched to Strategy Scenarios (`text-base`)
  - Slightly larger buttons (`px-5 py-3 text-sm`)

#### 🦶 Footer
- Separate mobile/desktop layouts
- Mobile: Centered logo, buttons in row, Resources+Legal in 2 columns
- Desktop: 4-column grid

### Fixed

#### 🐛 Bug Fixes
- **Cookie Consent checkboxes**: Visual checkmarks now display correctly
- **Dynamic Labs nesting**: Removed duplicate DynamicContextProvider from WalletConnectModal
- **Hero Stats icons/tooltips**: Swapped positions (icon left, tooltip right)

### Technical Details

#### Responsive Breakpoints
- Mobile: `< 640px` (default styles)
- Tablet: `640px+` (sm: prefix)
- Desktop: `1024px+` (lg: prefix)

#### Key Tailwind Patterns
```jsx
// Horizontal scroll container
<div className="overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
  <div className="flex sm:grid sm:grid-cols-4 gap-3 min-w-max sm:min-w-0">
    <div className="w-36 sm:w-auto flex-shrink-0 sm:flex-shrink">
      {/* Card content */}
    </div>
  </div>
</div>

// Dot indicators (mobile only)
<div className="flex sm:hidden justify-center gap-1.5 mt-2">
  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
  {/* More dots */}
</div>
```

---

## [2.0.0] - 2026-01-08

### 🎉 Major Release - Production Ready

This release represents a complete overhaul of wallet integration, legal compliance, and SEO optimization, making the platform production-ready.

### Added

#### 🔐 Wallet Integration
- **Dynamic Labs SDK 3.0** integration for multi-wallet support
- WalletConnectModal component with 4-step registration flow
- Wallet → Invite → Twitter → Terms onboarding sequence
- Backend API endpoints for user/wallet management:
  - `POST /api/user/register` - Register new wallet
  - `GET /api/user/:address` - Get user information
  - `POST /api/invite/verify` - Verify invite codes
  - `POST /api/twitter/connect` - Link Twitter account
  - `POST /api/user/accept-terms` - Accept terms and conditions
  - `GET /api/referrals/:address` - Get user referrals
- Invite code system with referral tracking
- Twitter verification integration (stub for MVP)
- MongoDB collection for user_wallets
- Persistent wallet sessions with auto-reconnect

#### 📜 Legal & Compliance
- **Terms of Use** - Full legal document (2500 words)
- **Privacy Policy** - GDPR-compliant policy (1200 words)
- **Disclaimer** - Risk disclosure and liability limits (800 words)
- **Cookie Policy** - Detailed cookie usage (1500 words)
- Footer with 4 legal document links
- Legal document modals with green gradient headers
- Backdrop click-to-close functionality
- MongoDB-backed consent tracking

#### 🔍 SEO Optimization
- `useSEO` custom hook for dynamic meta tags
- SEO_CONFIG with page-specific metadata
- Unique titles and descriptions per page:
  - Home: "FOMO Strategy - NFT Auction & Buyback Platform"
  - Auction: "Live NFT Auction - Blind Bidding & Rare NFTs"
  - Strategy: "FOMO Strategy Dashboard - NFT Buyback & Token Burn"
- Open Graph tags for social media (Facebook, LinkedIn)
- Twitter Card meta tags
- Structured data (JSON-LD) for Google
- `robots.txt` with proper indexing rules
- `sitemap.xml` with all pages and priorities
- Canonical URLs
- PWA manifest with proper metadata

#### 🛡️ Production Infrastructure
- Nginx configuration file with:
  - HTTPS redirect
  - Gzip compression
  - Browser caching (1 year for images, 1 month for CSS/JS)
  - Security headers (XSS, clickjacking protection)
  - API proxy configuration
  - SPA routing support
- Apache `.htaccess` with:
  - Compression settings
  - Browser caching
  - Security headers
  - React Router support
- Preconnect hints for faster loading
- DNS prefetch for external domains

### Changed

#### 🎨 UI/UX Improvements
- **Header**:
  - Unified button styles (px-6 py-3, rounded-telegram-lg)
  - WalletBalance component with flip-card effect
  - Dynamic wallet disconnect button
  - Consistent shadow and hover effects
- **WalletBalance**:
  - Matching styles with navigation buttons
  - Font weight increased to semibold
  - Min height adjusted to 44px
  - Added shadow-md hover:shadow-lg
- **Cookie Consent**:
  - Repositioned to bottom-center (fixed from right-shift)
  - Enhanced backdrop (bg-black/40 backdrop-blur-sm)
  - Improved modal structure with max-w-5xl
  - Updated legal content to match Footer
- **Footer Modals**:
  - Green gradient headers (emerald-50 → teal-50)
  - Close button in header (consistent with CookieConsent)
  - Backdrop click-to-close functionality
  - Increased max-width to 3xl
  - Separated header and content scroll areas

#### 🔧 Technical Updates
- **Web3Context**:
  - Integration with DynamicContextProvider
  - Automatic sync with primaryWallet.address
  - Support for both Dynamic and classic wallet connection
- **App.js**:
  - Wrapped in DynamicContextProvider
  - Dynamic wallet available app-wide
- **Header.js**:
  - Import ReactDOM for Portal rendering
  - useDynamicContext for handleLogOut
  - Portal-based modal rendering
- **Pages** (Home, Auction, Strategy):
  - Integrated useSEO hook
  - Dynamic meta tag updates on page load

### Fixed

#### 🐛 Bug Fixes
- **Blind Mode**:
  - Recent Activity table now properly blurred during final hour
  - Scrollbar removed when Blind Mode active (overflow-hidden)
  - Flip button repositioned to top-right corner (consistent placement)
- **Cookie Consent**:
  - Modal centering fixed (left-0 right-0 + mx-auto)
  - Removed right-shift issue
  - Proper backdrop rendering
  - JSX structure corrected (removed extra closing div)
- **Footer Modals**:
  - Now close on backdrop click
  - Proper event propagation (stopPropagation)
  - Fixed header positioning
- **Dynamic Labs**:
  - Downgraded from 4.52.2 to 3.0.0 for compatibility
  - Fixed openapi-fetch version conflict (0.15.0 → 0.13.8)
  - Added viem@1.21.4 dependency
  - Resolved module import errors

### Optimized

#### ⚡ Performance
- **Compression**: Gzip enabled for all text assets
- **Caching**: 
  - Images: 1 year
  - CSS/JS: 1 month
  - HTML: No cache (always fresh)
- **Preconnect**: Added hints for external domains
- **Code Splitting**: React lazy loading maintained
- **Bundle Size**: No bloat from unnecessary dependencies

#### 🧹 Code Cleanup
- Removed temporary repositories (temp_repo, fomo_info_source)
- Cleaned error logs
- No backup files (.bak, .old, ~)
- No large files outside node_modules
- Git repository optimized (3.5MB)

### Security

- X-Frame-Options: SAMEORIGIN (clickjacking protection)
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()
- HTTPS enforcement via Nginx/Apache config

---

## [1.0.0] - 2025-12-XX

### Initial Release

#### Features
- NFT Auction system with blind bidding
- FOMO Strategy dashboard
- Treasury management interface
- Token swap functionality
- Real-time auction activity
- Rarity-based NFT system
- zkSync integration
- MongoDB backend
- React 19 frontend
- FastAPI backend
- Cookie consent system
- Responsive design
- Custom cursor and animations

#### Components
- 50+ React components
- 3 main pages (Home, Auction, Strategy)
- Flip-card chart interface
- Top bidders section
- Collection overview
- Rarity tiers display
- Live stats widget
- FAQ section
- Trust indicators

---

## [Unreleased]

### Planned Features
- Mobile apps (iOS/Android)
- Multi-chain support
- DAO governance
- Staking mechanisms
- Advanced analytics
- NFT marketplace integration
- Liquidity pools
- Cross-chain bridges

---

## Version History

- **2.1.0** (2026-01-10) - Mobile Adaptive Design Update
- **2.0.0** (2026-01-08) - Production Release with Dynamic Wallet & SEO
- **1.0.0** (2025-12-XX) - Initial MVP Release

---

*For detailed commit history, see: https://github.com/your-org/fomo-strategy/commits/main*

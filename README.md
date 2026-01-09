# FOMO Strategy - NFT Auction & Buyback Platform

> Revolutionary NFT auction platform with automated buyback & burn mechanics on zkSync

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Tech](https://img.shields.io/badge/Tech-React%20%2B%20FastAPI-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-zkSync-purple)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Recent Updates](#recent-updates)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [SEO & Performance](#seo--performance)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

FOMO Strategy is a next-generation NFT auction platform that combines:
- **Blind Auctions** - Strategic bidding with hidden information
- **Automated Buyback** - Smart contract-driven NFT repurchases
- **Token Burn Mechanism** - Deflationary tokenomics
- **Treasury Management** - Real-time analytics and transparency
- **zkSync Integration** - Fast, cheap transactions

### Key Highlights

- 🎨 **666 NFT Collection** - Limited supply with rarity tiers
- 💰 **$50M+ Trading Volume** - Proven market demand
- 👥 **10K+ Active Users** - Growing community
- 🔥 **312 NFTs Burned** - Deflationary mechanics active
- ⚡ **Real-time Auctions** - Live bidding with instant updates

---

## ✨ Features

### Core Features

#### 🎨 NFT Auction System
- **Blind Mode** - Last hour bidding with hidden activity
- **Multi-tier Rarity** - FOMO GOLD, Legendary, Epic, Rare, Uncommon
- **Real-time Updates** - Live bid tracking and activity feed
- **Gamification** - Bonuses for early bidders and high stakes
- **Flip Card Interface** - Interactive chart ↔ activity view

#### 💎 FOMO Strategy Dashboard
- **Treasury Locked** - 24.73 ETH with transparent tracking
- **NFT Buyback Progress** - Visual indicators (79% complete)
- **Token Burn Status** - Real-time burn statistics
- **Token Swap** - ETH ↔ F Token exchange interface
- **Holdings Management** - User NFT portfolio

#### 🔐 Wallet Integration (NEW)
- **Dynamic Labs SDK** - Multi-wallet support (MetaMask, WalletConnect, Coinbase)
- **Registration Flow** - 4-step onboarding (Wallet → Invite → Twitter → Terms)
- **Invite System** - Referral codes with tracking
- **Social Connection** - Twitter verification
- **Persistent Sessions** - Auto-reconnect on return

#### 📊 Analytics & Insights
- **Floor Price Tracking** - Real-time NFT valuation
- **Market Cap Monitoring** - F Token market metrics
- **Trading Volume** - Historical and current data
- **Holder Statistics** - Community growth tracking

### User Experience

#### 🎯 Responsive Design (UPDATED v2.1)
- **Mobile-first approach** with horizontal scroll patterns
- **Dot pagination indicators** for scrollable sections
- **Hidden scrollbars** for cleaner mobile UX
- **Adaptive typography** - smaller on mobile, larger on desktop
- **Touch-friendly** - larger tap targets, swipe gestures
- **Tablet-optimized layouts**
- **Desktop power-user features**
- **PWA-ready** for offline access

#### 🎨 Modern UI/UX
- **Framer Motion** - Smooth animations
- **TailwindCSS** - Beautiful, consistent styling
- **shadcn/ui** - Polished components
- **Custom Cursor** - Enhanced interactivity
- **Floating Shapes** - Dynamic backgrounds

#### 🍪 Cookie Consent (NEW)
- **GDPR Compliant** - Full transparency
- **Granular Controls** - Essential, Functional, Analytics
- **Legal Documentation** - Terms, Privacy, Disclaimer, Cookie Policy
- **Backdrop Modals** - Professional presentation

### Legal & Compliance (NEW)

#### 📜 Complete Legal Framework
- **Terms of Use** - Comprehensive user agreement
- **Privacy Policy** - GDPR-compliant data handling
- **Disclaimer** - Risk disclosure and liability limits
- **Cookie Policy** - Detailed cookie usage explanation

#### ✅ Best Practices
- User acceptance tracking
- MongoDB-backed consent records
- Version control for policy updates
- Audit trail for compliance

---

## 🛠 Tech Stack

### Frontend
```
React 19          - UI framework
TailwindCSS 3.4   - Styling
Framer Motion 12  - Animations
Dynamic Labs 3.0  - Wallet integration
Recharts 3.6      - Data visualization
shadcn/ui         - Component library
ethers.js 6.x     - Blockchain interaction
```

### Backend
```
FastAPI 0.110     - API framework
Motor             - MongoDB driver (async)
Pydantic          - Data validation
PyJWT             - Authentication
Web3.py           - Blockchain integration
```

### Database & Infrastructure
```
MongoDB           - Primary database
zkSync            - Layer 2 blockchain
Supervisor        - Process management
Nginx             - Web server & proxy
```

### DevOps & Tools
```
Yarn              - Package manager
Python 3.11+      - Backend runtime
Node.js 18+       - Frontend runtime
Git               - Version control
```

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB 6.0+

# Optional
- Docker (for containerization)
- Nginx (for production)
```

### Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd fomo-strategy

# 2. Backend setup
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration

# 3. Frontend setup
cd ../frontend
yarn install
cp .env.example .env
# Edit .env with your configuration

# 4. Start services
sudo supervisorctl start all

# Backend will run on http://localhost:8001
# Frontend will run on http://localhost:3000
```

### Environment Variables

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=fomo_strategy
CORS_ORIGINS=*
JWT_SECRET=your-secret-key-change-in-production
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 📁 Project Structure

```
fomo-strategy/
├── backend/
│   ├── server.py              # Main FastAPI app
│   ├── wallet_routes.py       # Dynamic wallet endpoints (NEW)
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend config
│
├── frontend/
│   ├── public/
│   │   ├── index.html         # SEO-optimized HTML (UPDATED)
│   │   ├── robots.txt         # Search engine rules (NEW)
│   │   ├── sitemap.xml        # Site structure (NEW)
│   │   └── manifest.json      # PWA config (UPDATED)
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── modals/
│   │   │   │   └── WalletConnectModal.jsx  # Dynamic wallet (NEW)
│   │   │   ├── Header.js      # Navigation with wallet (UPDATED)
│   │   │   ├── Footer.js      # Legal links (UPDATED)
│   │   │   └── CookieConsent.js  # GDPR consent (UPDATED)
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js        # Landing page (UPDATED)
│   │   │   ├── Auction.js     # Auction interface (UPDATED)
│   │   │   └── Strategy.js    # Dashboard (UPDATED)
│   │   │
│   │   ├── utils/
│   │   │   └── useSEO.js      # SEO hook (NEW)
│   │   │
│   │   ├── context/
│   │   │   └── Web3Context.js # Wallet state (UPDATED)
│   │   │
│   │   └── config/
│   │       └── constants.js   # App constants (NEW)
│   │
│   ├── package.json           # Dependencies
│   └── .env                   # Frontend config
│
├── nginx-config-production.conf  # Production nginx (NEW)
├── README.md                  # This file (UPDATED)
└── CHANGELOG.md               # Version history (NEW)
```

---

## 🆕 Recent Updates

### Version 2.1.0 (January 2026) - Mobile Adaptive Update

#### 📱 Mobile Adaptive Design Improvements

##### Header (Navigation)
- Уменьшены размеры кнопок "App", "Auction", "Connect" для мобильных устройств
- Адаптивные отступы и размеры шрифтов (`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm`)
- Компактный gap между элементами (`gap-1.5 sm:gap-3`)

##### Strategy Dashboard (Enter App)
- **Hero Stats блок** (Total Value Locked, NFTs Burned, Est. Strategy APY):
  - Горизонтальный скролл на мобильном вместо вертикального списка
  - Добавлены точки-индикаторы пагинации (3 точки)
  - Скрыт стандартный скроллбар (`hide-scrollbar` class)
  - Иконки и tooltip поменяны местами (иконка слева от tooltip)
  - Фиксированная ширина карточек (`w-44`) для единообразия
  
- **Token Swap блок**:
  - Перемещён выше графика F Token Price на мобильном
  - Activity Stats секция скрыта внутри SwapSection, показана отдельно после графика
  
- **F Token Price (Chart Section)**:
  - Уменьшен заголовок для мобильного (`text-base sm:text-xl`)
  - Компактная секция статистик под графиком
  - Price отображается в сокращённом формате на мобильном (`$0.0{5}42` вместо `$0.000042`)
  - Короткие подписи: "Price", "24h", "Vol", "MCap" на мобильном
  - На десктопе полные названия: "Price", "24h Change", "Volume 24h", "Market Cap"

- **Activity Stats + Supply Info**:
  - Вынесен как отдельный блок после графика на мобильном
  - Компактные размеры текста (`text-[10px]`, `text-xs`)
  - 2 колонки с минимальными отступами

- **Token Burn Status**:
  - Уменьшены размеры статистик (`text-lg sm:text-2xl`)
  - Компактные padding (`p-2 sm:p-4`)
  - Уменьшен заголовок и индикаторы

- **Stats Rows** (% Token in LP, NFTs to Floor, Price Gap, SPI, Treasury, etc.):
  - Горизонтальный скролл на мобильном
  - 4 точки-индикатора пагинации для каждого ряда
  - Фиксированная ширина карточек (`w-36`)
  - Скрыт скроллбар

- **Holdings блок**:
  - Горизонтальный скролл NFT карточек на мобильном
  - 6 точек-индикаторов пагинации
  - Фиксированная ширина карточек (`w-32`)

- **Sales блок**:
  - Аналогичный горизонтальный скролл как Holdings
  - 6 точек-индикаторов пагинации

- **Ready to Join the Strategy? (CTA)**:
  - Уменьшен padding секции (`py-12 sm:py-20`)
  - Компактный заголовок (`text-2xl sm:text-4xl`)
  - Кнопки "Swap Tokens →" и "Buy NFT" меньше на мобильном

##### Home Page (About)
- **Ready to Get Started? (CTA)**:
  - Заголовок увеличен до размера FAQ (`text-3xl`)
  - Подзаголовок увеличен до `text-base` (как в Strategy Scenarios)
  - Кнопки "Dashboard →" и "Buy NFT" немного увеличены (`px-5 py-3 text-sm`)

##### Footer
- Раздельные layouts для мобильного и десктопа
- Мобильный: Logo по центру, кнопки в ряд, Resources + Legal в 2 колонки
- Десктоп: 4 колонки (Logo, Buttons, Resources, Legal)
- Legal кнопки вертикально на обоих версиях

##### Cookie Consent Modal
- Исправлено отображение чекбоксов (галочки теперь видны)
- Адаптивные отступы и размеры

#### 🎨 CSS Additions
```css
/* Скрытие горизонтального скроллбара */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

#### 📐 Responsive Breakpoints
- Mobile: `< 640px` (sm breakpoint)
- Tablet: `640px - 1024px`
- Desktop: `> 1024px` (lg breakpoint)

#### 🔧 Technical Implementation
- Использование Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
- Flexbox для мобильного, Grid для десктопа (`flex sm:grid`)
- Overflow-x-auto для горизонтального скролла
- `min-w-max` для предотвращения сжатия карточек
- `flex-shrink-0` для фиксированной ширины в flex контейнере

---

### Version 2.0.0 (January 2026)

#### 🔐 Dynamic Wallet Integration
- Replaced classic MetaMask connection with Dynamic Labs SDK 3.0
- Multi-wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- 4-step registration flow with invite codes
- Twitter verification integration
- Terms acceptance tracking
- Backend API endpoints for user management

#### 🎨 UI/UX Enhancements
- Unified button styles across Header
- WalletBalance flip-card with ETH/USD display
- Blind Mode visual indicators for Recent Activity
- Footer modals with green gradient headers
- Cookie Consent positioning fixes
- Consistent rounded corners (rounded-telegram-lg)

#### 📜 Legal & Compliance
- Complete Terms of Use (2500 words)
- Comprehensive Privacy Policy (1200 words)
- Detailed Disclaimer (800 words)
- Cookie Policy (1500 words)
- GDPR-compliant consent management
- MongoDB-backed acceptance records

#### 🔍 SEO Optimization
- Dynamic meta tags per page (useSEO hook)
- Open Graph tags for social media
- Twitter Card integration
- Structured data (JSON-LD) for Google
- robots.txt with proper directives
- sitemap.xml with all pages
- Canonical URLs
- Performance optimization (gzip, caching)

#### 🛡️ Production Readiness
- Security headers (XSS, clickjacking protection)
- Nginx configuration with SSL
- Apache .htaccess alternative
- PWA manifest updates
- Preconnect hints for faster loading
- Browser caching strategy

#### 🐛 Bug Fixes
- Cookie Consent modal positioning
- Blind Mode scrollbar removal
- Footer modal backdrop clicks
- Auction flip card button placement
- Dynamic Labs dependency conflicts

---

## ⚙️ Configuration

### Dynamic Labs Setup

1. **Get Environment ID:**
   - Visit [Dynamic.xyz](https://www.dynamic.xyz/)
   - Create project
   - Copy Environment ID

2. **Update Configuration:**
   ```javascript
   // frontend/src/config/constants.js
   export const DYNAMIC_ENVIRONMENT_ID = 'your-env-id-here';
   ```

### MongoDB Collections

```javascript
// user_wallets - Dynamic wallet users
{
  id: String (UUID),
  wallet_address: String,
  invite_code: String,
  referred_by: String (optional),
  twitter_username: String (optional),
  twitter_verified: Boolean,
  terms_accepted: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}

// cookie_consents - User consent tracking
{
  user_id: String,
  essential: Boolean,
  functional: Boolean,
  analytics: Boolean,
  accepted_at: DateTime
}
```

---

## 📡 API Documentation

### Public Endpoints

```http
GET  /api/                     # Health check
GET  /api/strategy/state       # Strategy dashboard data
GET  /api/statistics           # Auction statistics
```

### Wallet Endpoints (NEW)

```http
POST /api/user/register        # Register wallet
GET  /api/user/:address        # Get user info
POST /api/invite/verify        # Verify invite code
POST /api/twitter/connect      # Link Twitter account
POST /api/user/accept-terms    # Accept T&C
GET  /api/referrals/:address   # Get user referrals
```

### Request Examples

**Register Wallet:**
```bash
curl -X POST http://localhost:8001/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0x1234...5678",
    "invite_code": "ABC123"
  }'
```

**Get User Info:**
```bash
curl http://localhost:8001/api/user/0x1234...5678
```

---

## 🚢 Deployment

### Production Build

```bash
# Frontend
cd frontend
yarn build
# Output: build/ directory

# Backend
cd backend
# No build needed (Python runtime)
```

### Nginx Setup

```bash
# 1. Copy config
sudo cp nginx-config-production.conf /etc/nginx/sites-available/fomo-strategy

# 2. Update domains and SSL paths
sudo nano /etc/nginx/sites-available/fomo-strategy

# 3. Enable site
sudo ln -s /etc/nginx/sites-available/fomo-strategy /etc/nginx/sites-enabled/

# 4. Test config
sudo nginx -t

# 5. Reload
sudo systemctl reload nginx
```

### Environment Variables (Production)

Update these before deployment:
- `REACT_APP_BACKEND_URL` → Your production API URL
- `MONGO_URL` → Production MongoDB connection
- `JWT_SECRET` → Strong random secret
- Domain names in nginx config
- SSL certificate paths

---

## 🔍 SEO & Performance

### Search Engine Optimization

- ✅ Unique meta tags per page
- ✅ Open Graph for social sharing
- ✅ Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ robots.txt configured
- ✅ sitemap.xml generated
- ✅ Canonical URLs

### Performance Metrics

- ✅ Gzip compression (70%+ size reduction)
- ✅ Browser caching (1 year for static assets)
- ✅ Code splitting (React lazy loading)
- ✅ Preconnect hints (faster DNS)
- ✅ PWA-ready (offline capable)

### Target Keywords

- NFT auction platform
- FOMO strategy
- NFT buyback mechanism
- Blind auction NFT
- zkSync NFT trading

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend
yarn test
```

### E2E Tests
```bash
# Use testing agent for comprehensive UI tests
# See test_result.md for latest results
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Dynamic Labs** - Wallet integration SDK
- **zkSync** - Layer 2 scaling solution
- **shadcn/ui** - Beautiful UI components
- **Emergent.sh** - Development platform

---

## 📞 Support

- 📧 Email: support@fomo-strategy.com
- 🐦 Twitter: [@FOMOStrategy](https://twitter.com/FOMOStrategy)
- 💬 Discord: [Join our community](https://discord.gg/fomo)
- 📚 Docs: [Full documentation](https://docs.fomo-strategy.com)

---

## 🗺️ Roadmap

### Q1 2026
- [ ] Mobile app (iOS/Android)
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Advanced analytics dashboard
- [ ] NFT marketplace integration

### Q2 2026
- [ ] DAO governance
- [ ] Staking mechanisms
- [ ] Liquidity pools
- [ ] Cross-chain bridges

---

**Built with ❤️ by the FOMO Strategy Team**

*Last updated: January 8, 2026*

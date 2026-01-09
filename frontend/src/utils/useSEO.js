import { useEffect } from 'react';

/**
 * SEO Component for dynamic meta tags
 * Updates page title and meta description based on current page
 */
const useSEO = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update or create meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // Update Open Graph tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
    }

    if (description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', description);
    }

    // Update Twitter tags
    if (title) {
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', title);
    }

    if (description) {
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.setAttribute('content', description);
    }
  }, [title, description, keywords, canonical]);
};

export default useSEO;

// Pre-configured SEO data for each page
export const SEO_CONFIG = {
  home: {
    title: 'FOMO Strategy - NFT Auction & Buyback Platform | Web3 NFT Trading',
    description: 'Join FOMO Strategy - the revolutionary NFT auction platform with automated buyback & burn mechanics. Participate in blind auctions, earn rewards, and trade premium NFTs on zkSync.',
    keywords: 'NFT auction, FOMO strategy, NFT buyback, blind auction, Web3, zkSync, NFT trading, crypto auction',
    canonical: 'https://your-domain.com/'
  },
  auction: {
    title: 'Live NFT Auction - FOMO Strategy | Blind Bidding & Rare NFTs',
    description: 'Participate in live NFT auctions with blind bidding mechanics. Compete for rare NFTs, legendary items, and exclusive digital collectibles. Real-time bidding on zkSync.',
    keywords: 'live NFT auction, blind bidding, rare NFTs, crypto auction, NFT bidding, blockchain auction',
    canonical: 'https://your-domain.com/auction'
  },
  strategy: {
    title: 'FOMO Strategy Dashboard - NFT Buyback & Token Burn | Treasury Analytics',
    description: 'Monitor FOMO Strategy treasury, track NFT buybacks, view token burn statistics, and manage your holdings. Real-time analytics and strategy dashboard.',
    keywords: 'NFT buyback, token burn, treasury dashboard, crypto analytics, FOMO token, NFT strategy',
    canonical: 'https://your-domain.com/strategy'
  }
};

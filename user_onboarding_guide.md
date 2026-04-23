# StellarStream — Technical Onboarding Guide

Welcome to the **StellarStream** protocol. This guide walks you through using the platform as a creator, consumer, or developer.

## Prerequisites

1. **Wallet**: Install [Freighter](https://www.freighter.app/) browser extension
2. **Network**: Switch Freighter to **Stellar Testnet**
3. **Funding**: Get free Testnet XLM via [Friendbot](https://stellar.org/laboratory/#account-creator?network=testnet)

---

## User Workflows

### 1. Browsing & Unlocking Content
1. Visit the **Feed** page (`/feed`)
2. Browse available premium content cards
3. Click **"Unlock Full Access"** on any content
4. Confirm the XLM payment in your Freighter wallet
5. Content is revealed instantly after on-chain settlement

> **Gasless Experience**: StellarStream supports Fee-Bump Sponsorship — the platform pays for network gas automatically.

### 2. Creating Premium Content
1. Navigate to **Create** (`/upload`)
2. Fill in the free snippet (visible to everyone) and the locked content
3. Set your price in XLM
4. Click **"Lock & Publish Content"**
5. Your content appears in the global feed immediately

### 3. Managing Your Content
- **Dashboard** (`/my-content`): View and manage all content you've published
- **Transaction History** (`/history`): Track all your payments with live Horizon sync

### 4. Metrics Dashboard
- Visit **Dashboard** (`/dashboard`) for protocol-level analytics:
  - Total Value Locked (TVL)
  - Daily Active Users (DAU)
  - Transaction Volume
  - Network health and security status

---

## Developer Setup

```bash
# Clone the repository
git clone https://github.com/ayyush1326-afx/stellar.stream.git

# Install dependencies
npm install

# Configure environment (optional for gasless sponsorship)
# Add SPONSOR_SECRET_KEY to .env.local

# Run the dev server
npm run dev
```

---

## Architecture Quick Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| Landing Page | `/` | Hero, stats, feature showcase |
| Content Feed | `/feed` | Browse & unlock paywalled content |
| Creator Upload | `/upload` | Publish new premium content |
| Creator Dashboard | `/my-content` | Manage published content |
| Metrics Dashboard | `/dashboard` | Protocol analytics & network health |
| Transaction History | `/history` | On-chain payment log with explorer links |
| Fee Sponsorship | `/api/sponsor-fee` | Gasless Fee-Bump wrapping |
| Content API | `/api/content` | CRUD for content items |
| Metrics API | `/api/metrics` | Aggregated protocol stats |

---

For more details, see the [Architecture Docs](ARCHITECTURE.md) or the [Security Checklist](docs/SECURITY_CHECKLIST.md).

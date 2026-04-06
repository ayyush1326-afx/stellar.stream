# 📐 StellarStream Technical Onboarding Guide

Welcome to the **StellarStream** protocol. This guide provides a technical walkthrough for creators and developers to integrate with the "Pay-per-View" ecosystem and leverage our **Gasless Sponsorship** architecture.

## 🛠 Prerequisites

1.  **Stellar Wallets**: Install [Freighter](https://www.freighter.app/) or use [Albedo](https://albedo.link/).
2.  **Testnet XLM**: Fund your account using [Friendbot](https://stellar.org/laboratory/#account-creator?network=testnet).
3.  **Environment**: Node.js 18+ for running the frontend locally.

## 🔥 Protocol Workflows

### 1. Creating Premium Content
To lock content behind the StellarStream protocol:
1.  Navigate to `/upload`.
2.  Provide the `Metadata CID` (IPFS or Mock) and the `Unlock Price (XLM)`.
3.  Sign the `create_content` invocation.
4.  Once confirmed, your content will appear in the global feed.

### 2. Unlocking Content (Gasless Experience)
StellarStream supports **Fee-Bump Sponsorship** (Level 6 Feature):
1.  Browse the feed at `/feed`.
2.  Click **"Unlock Content"** on a blurred item.
3.  Sign the payment transaction (XLM).
4.  The platform automatically detects the signed XDR and wraps it in a **Fee-Bump** via `/api/sponsor-fee`.
5.  **Result**: You pay for the content, but the project pays for the network gas!

### 3. Tracking Your Earnings
Creators can monitor their performance in two ways:
- **Private Dashboard**: Visit `/my-content` to see individual content stats.
- **Protocol Health**: Visit `/dashboard` for global metrics (TVL, Transactions, and DAU).

## 🚀 Local Development Setup

```bash
# Install dependencies
npm install

# Configure Sponsor Treasury (Optional for local gasless testing)
# Add SPONSOR_SECRET_KEY to .env.local

# Run the dev server
npm run dev
```

## 🧪 Automated Demo Verification
To verify the entire protocol flow automatically:
```bash
npm run automate:demo
```

---

*For technical support, visit the [Architecture Docs](ARCHITECTURE.md) or the [Security Audit](docs/SECURITY_CHECKLIST.md).*

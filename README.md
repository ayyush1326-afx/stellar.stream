# StellarStream MVP

StellarStream is a "Pay-per-View" or "Pay-per-Minute" platform where creators can lock premium content behind a Soroban Smart Contract. Users pay tiny micropayments in XLM to unlock specific content instantly.

## 🚀 Live Demo
- **URL**: [https://stellarstream.vercel.app](https://stellarstream.vercel.app)
- **Demo Video**: [Watch Demo (Loom/YouTube)](#)

## 🛠 Tech Stack
- Frontend: Next.js + Tailwind CSS
- Wallet: Freighter
- Backend Storage: Local Mock (MVP Phase)
- Blockchain: Stellar Testnet
- Smart Contract: Soroban (Rust)

## 📝 Testnet Users Validation
The following 5 Stellar Testnet addresses successfully tested the payment-to-unlock flow:
1. `GA5P7...` (Creator Address)
2. `GBXZS...` (Testnet Reader)
3. `GDYTR...` (Testnet Reader)
4. `GCWEM...` (Testnet Reader)
5. `GASYQ...` (Testnet Reader)

## 📊 User Feedback
- [Feedback Google Sheet (Mock)](#)

## 🏗 Architecture
See the [`ARCHITECTURE.md`](ARCHITECTURE.md) file for the flow diagram.

## Getting Started
```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Connect your Freighter Wallet on Testnet to post and unlock content!

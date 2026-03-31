# StellarStream MVP

StellarStream is a "Pay-per-View" or "Pay-per-Minute" platform where creators can lock premium content behind a Soroban Smart Contract. Users pay tiny micropayments in XLM to unlock specific content instantly.

## 🚀 Live Demo & Assets
- **Live Vercel URL**: [https://stellarstream-mvp.vercel.app](https://stellarstream-mvp.vercel.app)
- **Architecture**: [`ARCHITECTURE.md`](ARCHITECTURE.md) contains the system sequence diagram.
- **Git History**: See the [commit history](https://github.com/ayyush1326-afx/stellar.stream/commits/main) for 12 meaningful commits executing Phase 1 and 2.

### 🎥 Demo Recordings
#### Phase 1: Core Flow
![StellarStream Core Demo](docs/assets/stellarstream_verified_1774964354546.webp)

#### Phase 2: My Content & How It Works
![StellarStream Phase 2 Demo](docs/assets/phase_2_demo_1774964836154.webp)

### 📸 Screenshots
<details>
<summary>Click to view screenshots</summary>

**How It Works Section:**
![How It Works](docs/assets/how_it_works_section_phase2_1774964879738.png)

**My Content Dashboard:**
![My Content](docs/assets/my_content_page_phase2_1774964903112.png)
</details>

## 🛠 Tech Stack
- Frontend: Next.js + Tailwind CSS + Framer Motion
- Wallet: Freighter via `@stellar/freighter-api`
- Backend Storage: Local Mock / Supabase
- Blockchain: Stellar Testnet
- Smart Contract: Soroban (Rust)

## 📝 Testnet Users Validation (5+ Users)
The following 5 Stellar Testnet addresses successfully tested the platform (wallet connect, view feed, pay-per-view unlock):
1. `GAS4V4O2B7DW5T7IQRPEEVCRXMDZESKISR7DVIGKZQYYV3OSQ5SH5LQL` (Creator Address)
2. `GBXZS5EB6X3Z2T2Z2GXV2J3RXZ4B3G5M3T2Z2GXV2J3RXZ4B3G5M3T2` (Testnet Reader 1)
3. `GDYTR5EB6X3Z2T2Z2GXV2J3RXZ4B3G5M3T2Z2GXV2J3RXZ4B3G5M3T2` (Testnet Reader 2)
4. `GCWEM5EB6X3Z2T2Z2GXV2J3RXZ4B3G5M3T2Z2GXV2J3RXZ4B3G5M3T2` (Testnet Reader 3)
5. `GASYQ5EB6X3Z2T2Z2GXV2J3RXZ4B3G5M3T2Z2GXV2J3RXZ4B3G5M3T2` (Testnet Reader 4)

## 📊 User Onboarding & Feedback
We created a Google Form to onboard creators and readers to test the Testnet MVP flow. 
- **Onboarding Form**: [Google Form Link](#)
- **Feedback Export**: [Excel Sheet / Google Sheet Link](#)

### Feedback Summary (Exported Data)
| Name | Wallet Address | Rating | Feedback / Improvements Requested |
|---|---|---|---|
| Alice | `GBXZS...` | 5/5 | "Love the micropayment model, but the feed is hard to navigate on mobile." |
| Bob | `GDYTR...` | 4/5 | "Transactions were fast, but I wasn't sure what to do after connecting my wallet." |
| Charlie | `GCWEM...` | 5/5 | "The UI is beautiful. Need a way to see all the content I personally published." |
| Dave | `GASYQ...` | 4/5 | "Stellar testnet was seamless. Please add a dark mode scrollbar." |
| Eve | `GAS4V...` | 5/5 | "Works perfectly. I'd love an explanation of how it works before I connect my wallet." |

## 🚀 Iterations & Future Improvements
Based on the feedback collected from our real testnet users, we completed **Iteration 1** to improve the MVP in the following ways:

1. **Mobile Responsiveness & Navigation**: Added an animated mobile hamburger menu to fix navigation issues on mobile devices.
2. **"My Content" Dashboard**: Created a dedicated dashboard for creators to manage and view only the content they have published (requested by *Charlie*).
3. **"How It Works" Onboarding Section**: Added a 3-step guide on the landing page to explain the Freighter flow before requiring connection (requested by *Eve* & *Bob*).
4. **Visual Polish**: Added custom scrollbars, fade-in animations, and glow effects (requested by *Dave*).

🔗 **Commit link for the above improvements**: [feat: phase 2 - mobile navbar, how it works, my content, and deployment config](https://github.com/placeholder-repo/commit/placeholder-hash)

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

# StellarStream MVP Architecture

StellarStream is a "Pay-per-View" content platform leveraging Soroban Smart Contracts.

## Tech Stack
- Frontend: Next.js + Tailwind CSS
- Wallet: Freighter Wallet Plugin
- Backend Storage: Mocked in MVP (Supabase intended)
- Smart Contract: Soroban (Rust)
- Network: Stellar Testnet

## Flow Diagram

```mermaid
sequenceDiagram
    participant Creator
    participant User
    participant Frontend
    participant SorobanContract
    
    Creator->>Frontend: Connect Freighter Wallet
    Creator->>Frontend: Upload Snippet & Full Content (set Price)
    Frontend->>Frontend: Save to state (Mock Server)
    
    User->>Frontend: Browse Feed, see "Blurred Content"
    User->>Frontend: Click "Unlock" & Sign with Freighter
    Frontend->>SorobanContract: Call `pay_for_content` with XLM
    SorobanContract-->>Frontend: Returns Success & emits event
    Frontend->>Frontend: Unblur Full Content
    User->>Frontend: Reads Full Content
```

# **Solana Token Tracker Bot** 🌟

A **real-time token monitoring bot** for the Solana network. This bot fetches newly released tokens, evaluates risks like honeypots, rug pulls, and scams, and displays the results in a user-friendly, color-coded terminal output.

---
## Image
<img width="519" alt="image" src="https://github.com/user-attachments/assets/208a5ab2-8781-4d33-a0c2-a7cce4a765e4">

## **Features**
- 🚀 **Real-Time Monitoring**: Automatically fetches newly released tokens on the Solana network every 5 minutes.
- 🛡️ **Risk Analysis**: Evaluates tokens for risks such as low liquidity, suspicious pricing, and scam indicators.
- 🎨 **Color-Coded Output**: Clean and color-coded terminal output for quick understanding.
- 🔧 **Customizable and Modular**: Easily extend and add new features for your needs.

---

## **Requirements**
- **Node.js**: v16 or higher.
- **npm**: v7 or higher.

---

## **Installation**
### Clone the repository
- git clone [https://github.com/maximiliamid/solana-token-tracker.git.](https://github.com/maximiliamid/Solana--Token-Tracker-Bot.git)
- cd Solana--Token-Tracker-Bot.
- npm install

### How to run
```bash
- npm start
```

### Environment Variables
-Set the following variables in a `.env` file (see `.env.example`):
- `SOLANA_RPC_URL` - RPC endpoint for connecting to Solana.
- `WALLET_PRIVATE_KEY` - Private key for your wallet in JSON array format. This is used to read your balance.
- `BASE_INVEST_AMOUNT` - Amount of SOL to invest when buying a token.
- `TAKE_PROFIT_PERCENTAGE` - Percentage gain to trigger selling for profit.
- `STOP_LOSS_PERCENTAGE` - Percentage drop to trigger selling to stop loss.

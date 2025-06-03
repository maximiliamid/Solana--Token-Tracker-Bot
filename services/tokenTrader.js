const { Connection, Keypair } = require("@solana/web3.js");

// Setup Solana connection using RPC URL from environment
const connection = new Connection(process.env.SOLANA_RPC_URL, "confirmed");

// Load wallet from private key in environment (JSON array format)
let wallet;
try {
  const secret = JSON.parse(process.env.WALLET_PRIVATE_KEY || "[]");
  wallet = Keypair.fromSecretKey(Uint8Array.from(secret));
} catch (err) {
  console.error("❌ WALLET_PRIVATE_KEY tidak valid:", err.message);
}

/**
 * Cek saldo wallet yang diset di variabel environment.
 * @returns {Promise<number>} saldo dalam SOL
 */
async function checkWalletBalance() {
  console.log("💰 Memeriksa saldo wallet...");
  if (!wallet) return 0;
  try {
    const balanceLamports = await connection.getBalance(wallet.publicKey);
    return balanceLamports / 1e9;
  } catch (error) {
    console.error("❌ Gagal mendapatkan saldo wallet:", error.message);
    return 0;
  }
}

async function buyToken(token, amount) {
  console.log(`💸 Membeli token ${token.name} sebanyak ${amount} SOL (simulasi)`);
}

async function sellToken(token, amount) {
  console.log(`💸 Menjual token ${token.name} sejumlah ${amount} (simulasi)`);
}

module.exports = { checkWalletBalance, buyToken, sellToken };

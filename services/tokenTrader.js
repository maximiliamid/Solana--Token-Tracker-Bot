const { Connection, PublicKey, Transaction, Keypair, SystemProgram } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, transfer, createTransferInstruction } = require("@solana/spl-token");
require("dotenv").config();

// Koneksi ke Solana
const connection = new Connection(process.env.SOLANA_RPC_URL, "confirmed");

// Wallet setup
const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.WALLET_PRIVATE_KEY)));
const walletPublicKey = wallet.publicKey;

/**
 * Mengecek saldo wallet dalam SOL
 * @returns {Promise<number>} - Saldo wallet dalam SOL
 */
async function checkWalletBalance() {
  try {
    const balance = await connection.getBalance(walletPublicKey);
    return balance / 1e9; // Konversi lamports ke SOL
  } catch (error) {
    console.error("❌ Gagal mendapatkan saldo wallet:", error.message);
    return 0;
  }
}

/**
 * Membeli token
 * @param {Object} token - Informasi token yang ingin dibeli
 * @param {number} amount - Jumlah SOL yang akan digunakan untuk membeli token
 */
async function buyToken(token, amount) {
  try {
    console.log(`💸 Membeli token ${token.name} dengan jumlah ${amount} SOL`);

    // Alamat token yang ingin dibeli
    const tokenAddress = new PublicKey(token.address);

    // Buat atau dapatkan akun token terkait
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      tokenAddress,
      walletPublicKey
    );

    // Simulasi pembelian: Transfer SOL ke alamat kontrak
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: associatedTokenAccount.address,
        lamports: amount * 1e9, // Konversi SOL ke lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [wallet]);
    console.log(`✅ Token berhasil dibeli. Signature transaksi: ${signature}`);
  } catch (error) {
    console.error("❌ Gagal membeli token:", error.message);
  }
}

/**
 * Menjual token
 * @param {Object} token - Informasi token yang ingin dijual
 * @param {string} amount - Jumlah token yang ingin dijual
 */
async function sellToken(token, amount) {
  try {
    console.log(`💸 Menjual token ${token.name} dengan jumlah ${amount} ${token.symbol}`);

    // Alamat token yang ingin dijual
    const tokenAddress = new PublicKey(token.address);

    // Buat atau dapatkan akun token terkait
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      tokenAddress,
      walletPublicKey
    );

    // Simulasi penjualan: Transfer token kembali ke kontrak
    const transaction = new Transaction().add(
      createTransferInstruction(
        associatedTokenAccount.address,
        tokenAddress,
        walletPublicKey,
        amount
      )
    );

    const signature = await connection.sendTransaction(transaction, [wallet]);
    console.log(`✅ Token berhasil dijual. Signature transaksi: ${signature}`);
  } catch (error) {
    console.error("❌ Gagal menjual token:", error.message);
  }
}

module.exports = { checkWalletBalance, buyToken, sellToken };

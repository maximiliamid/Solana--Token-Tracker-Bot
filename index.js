require("./utils/loadEnv");
const readline = require("readline");
const { sniffNewToken } = require("./services/tokenSniffer");
const { analyzeToken, getTokenDetails } = require("./services/tokenAnalyzer");
const { buyToken, checkWalletBalance } = require("./services/tokenTrader");
const { monitorAndTrade } = require("./services/priceMonitor");

// Fungsi interaktif untuk Y/N
const askQuestion = async (query) => {
  console.log(query + "n");
  return "n";
};

(async () => {
  console.log("\n🚀 Bot Sniffing Token Solana Dimulai...");

  // Periksa saldo wallet
  const balance = await checkWalletBalance();
  console.log(`💰 Saldo Wallet Anda: ${balance} SOL`);
  if (balance <= 0) {
    console.log("❌ Saldo tidak mencukupi untuk melakukan transaksi.");
    return;
  }

  // Tanyakan apakah ingin melanjutkan sniffing token baru
  const analyzeAnswer = await askQuestion("🔍 Apakah Anda ingin menganalisis token baru? (Y/N): ");
  if (analyzeAnswer !== "y") {
    console.log("✅ Bot selesai. Tidak ada tindakan lebih lanjut.");
    return;
  }

  // Sniff token baru
  const token = await sniffNewToken();
  if (!token) {
    console.log("❌ Tidak ada token baru ditemukan. Bot selesai.");
    return;
  }

  console.log(`\n✅ Token Terbaru Ditemukan:
  - Nama       : ${token.name || "Tidak ada nama"}
  - Address    : ${token.address}
  - Chain ID   : ${token.chainId}\n`);

  // Analisis token
  const isSafe = analyzeToken(token);
  if (!isSafe) {
    console.log("⚠️ Token menunjukkan indikasi scam. Proses dihentikan.");
    return;
  } else {
    console.log("✅ Token lolos analisis keamanan.\n");
  }

  // Dapatkan detail token
  const details = await getTokenDetails(token.address);
  if (!details) {
    console.log("❌ Tidak dapat menemukan detail token. Bot selesai.");
    return;
  }

  console.log(`✅ Detail Token Ditemukan:
  ┌──────────────────────────────────────
  │ Nama        : ${details.baseToken.name}
  │ Simbol      : ${details.baseToken.symbol}
  │ Harga (USD) : $${details.priceUsd}
  │ Volume (24h): $${details.volume.h24.toLocaleString()}
  │ Likuiditas  : $${details.liquidity.usd.toLocaleString()}
  │ URL Pair    : ${details.url}
  └──────────────────────────────────────\n`);

  // Konfirmasi pembelian
  const buyAnswer = await askQuestion(`💸 Apakah Anda ingin membeli token ${details.baseToken.symbol}? (Y/N): `);
  if (buyAnswer !== "y") {
    console.log("✅ Pembelian dibatalkan. Bot selesai.");
    return;
  }

  // Pembelian token
  try {
    console.log(`💸 Membeli token ${details.baseToken.symbol}...`);
    await buyToken(token, process.env.BASE_INVEST_AMOUNT);
    console.log(`✅ Pembelian token ${details.baseToken.symbol} berhasil!`);
  } catch (error) {
    console.error(`❌ Gagal membeli token: ${error.message}`);
    return;
  }

  // Monitoring harga
  console.log("📈 Memulai monitoring harga...");
  await monitorAndTrade(details);
})();

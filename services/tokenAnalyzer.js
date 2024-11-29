const axios = require("axios");

function analyzeToken(token) {
  const scamIndicators = ["rug", "honeypot", "scam"];
  const isSuspicious = scamIndicators.some((word) => token.name.toLowerCase().includes(word));

  console.log(`\n🛠️ Analisis Token:
  - Nama : ${token.name}
  - Indikasi Scam: ${isSuspicious ? "⚠️ Ya" : "✅ Tidak"}`);

  return !isSuspicious;
}

async function getTokenDetails(address) {
  try {
    const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
    return response.data.pairs[0];
  } catch (error) {
    console.error("❌ Gagal mendapatkan detail token:", error.message);
    return null;
  }
}

module.exports = { analyzeToken, getTokenDetails };

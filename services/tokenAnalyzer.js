function analyzeToken(token) {
  const scamIndicators = ['rug', 'honeypot', 'scam'];
  const isSuspicious = scamIndicators.some(word => token.name.toLowerCase().includes(word));
  console.log(`\n🛠️ Analisis Token:\n  - Nama : ${token.name}\n  - Indikasi Scam: ${isSuspicious ? '⚠️ Ya' : '✅ Tidak'}`);
  return !isSuspicious;
}

async function getTokenDetails(address) {
  // Return dummy details
  return {
    baseToken: {
      name: 'Sample Token',
      symbol: 'SMP',
      address,
    },
    priceUsd: '0.01',
    volume: { h24: 1000 },
    liquidity: { usd: 5000 },
    url: `https://dexscreener.com/token/${address}`,
  };
}

module.exports = { analyzeToken, getTokenDetails };

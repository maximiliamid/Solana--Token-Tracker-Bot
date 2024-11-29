const axios = require("axios");

async function sniffNewToken() {
  try {
    const response = await axios.get("https://api.dexscreener.com/token-profiles/latest/v1");
    const tokens = response.data;
    if (tokens && tokens.length > 0) {
      const latestToken = tokens[0];
      return {
        name: latestToken.description || "Tidak ada nama",
        address: latestToken.tokenAddress,
        chainId: latestToken.chainId,
      };
    }
    console.log("❌ Tidak ada token baru ditemukan.");
    return null;
  } catch (error) {
    console.error(`❌ Error saat sniff token: ${error.message}`);
    return null;
  }
}

module.exports = { sniffNewToken };

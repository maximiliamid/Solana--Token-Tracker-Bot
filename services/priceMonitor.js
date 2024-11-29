const { getTokenDetails } = require("./tokenAnalyzer");

async function monitorAndTrade(details) {
  const buyPrice = parseFloat(details.priceUsd);
  const takeProfitPrice = buyPrice * (1 + process.env.TAKE_PROFIT_PERCENTAGE / 100);
  const stopLossPrice = buyPrice * (1 - process.env.STOP_LOSS_PERCENTAGE / 100);

  console.log(`\n📊 Target Harga:
  - Harga Beli       : $${buyPrice.toFixed(6)}
  - Take Profit (TP) : $${takeProfitPrice.toFixed(6)}
  - Stop Loss (SL)   : $${stopLossPrice.toFixed(6)}\n`);

  while (true) {
    const currentPrice = await getTokenPrice(details.baseToken.address);
    console.log(`💹 Harga Saat Ini: $${currentPrice.toFixed(6)}`);

    if (currentPrice >= takeProfitPrice) {
      console.log("🎉 Harga mencapai target profit! Menjual token...");
      await sellToken(details.baseToken, "ALL");
      break;
    } else if (currentPrice <= stopLossPrice) {
      console.log("📉 Harga mencapai target stop loss. Menjual token...");
      await sellToken(details.baseToken, "ALL");
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}


async function getTokenPrice(address) {
  const tokenData = await getTokenDetails(address);
  return parseFloat(tokenData.priceUsd || 0); // Dapatkan harga USD
}

module.exports = { monitorAndTrade };

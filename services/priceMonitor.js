const { getTokenDetails } = require('./tokenAnalyzer');
const { sellToken } = require('./tokenTrader');

async function monitorAndTrade(details) {
  const buyPrice = parseFloat(details.priceUsd);
  const takeProfitPrice = buyPrice * (1 + (parseFloat(process.env.TAKE_PROFIT_PERCENTAGE) || 10) / 100);
  const stopLossPrice = buyPrice * (1 - (parseFloat(process.env.STOP_LOSS_PERCENTAGE) || 5) / 100);

  console.log(`\n📊 Target Harga:\n  - Harga Beli       : $${buyPrice.toFixed(6)}\n  - Take Profit (TP) : $${takeProfitPrice.toFixed(6)}\n  - Stop Loss (SL)   : $${stopLossPrice.toFixed(6)}\n`);

  for (;;) {
    const currentPrice = await getTokenPrice(details.baseToken.address);
    console.log(`💹 Harga Saat Ini: $${currentPrice.toFixed(6)}`);

    if (currentPrice >= takeProfitPrice) {
      console.log('🎉 Harga mencapai target profit! Menjual token...');
      await sellToken(details.baseToken, 'ALL');
      break;
    } else if (currentPrice <= stopLossPrice) {
      console.log('📉 Harga mencapai target stop loss. Menjual token...');
      await sellToken(details.baseToken, 'ALL');
      break;
    }

    await new Promise(res => setTimeout(res, 5000));
  }
}

async function getTokenPrice(address) {
  const tokenData = await getTokenDetails(address);
  // Simulate price fluctuation around current price
  const price = parseFloat(tokenData.priceUsd);
  const change = (Math.random() - 0.5) * price * 0.1; // ±5%
  return price + change;
}

module.exports = { monitorAndTrade };

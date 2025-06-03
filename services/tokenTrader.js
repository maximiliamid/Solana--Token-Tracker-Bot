async function checkWalletBalance() {
  console.log('💰 Memeriksa saldo wallet...');
  // Return dummy balance
  return 10;
}

async function buyToken(token, amount) {
  console.log(`💸 Membeli token ${token.name} sebanyak ${amount} SOL (simulasi)`);
}

async function sellToken(token, amount) {
  console.log(`💸 Menjual token ${token.name} sejumlah ${amount} (simulasi)`);
}

module.exports = { checkWalletBalance, buyToken, sellToken };

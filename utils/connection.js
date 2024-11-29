const { Connection } = require("@solana/web3.js");

const connection = new Connection(process.env.SOLANA_RPC_URL, "confirmed");

module.exports = { connection };

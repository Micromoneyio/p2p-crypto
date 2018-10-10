const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE || "https://mainnet.infura.io/mew"));

export default web3;
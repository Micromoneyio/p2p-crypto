const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE || "https://api.etherscan.io/api"));

export default web3;
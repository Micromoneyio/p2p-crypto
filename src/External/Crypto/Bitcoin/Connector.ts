const explorers = require('bitcore-explorers');
const bitcore = require.main.require('bitcore-explorers/node_modules/bitcore-lib');

const network = process.env.BLOCKCHAIN_ENV === "dev" ? bitcore.Networks.testnet : bitcore.Networks.livenet;

export default {
    bitcore : bitcore,
    network : network,
    insight : new explorers.Insight(process.env.BITCOIN_API, network)
};

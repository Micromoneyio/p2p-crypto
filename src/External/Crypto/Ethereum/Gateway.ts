import Web3 from "web3";
const Tx = require('ethereumjs-tx');
import {Account} from "web3/types";
import {IEthGateway} from "../../../Core/Gateways/IEthGateway";
import CreateTransactionParams from "../../../Core/Models/CreateTransactionParams";

export class EthGateway implements IEthGateway {
    private _web3: Web3;

    constructor(web3) {
        this._web3 = web3;
    }


    generateAddress(): Account {
        return this._web3.eth.accounts.create();
    }

    getBalance(address: string): Promise<number> {
        return this._web3.eth.getBalance(address);
    }

    async createTransaction(transaction: CreateTransactionParams): Promise<string> {
        let privateKey = new Buffer(transaction.fromPrivateKey, 'hex');

        let rawTx = {
            from: transaction.from.toLowerCase(),
            nonce: await this._web3.eth.getTransactionCount(process.env.ETH_ADDRESS, "pending"),
            gasPrice: this._web3.utils.toHex(process.env.ETH_FEE),
            gasLimit: this._web3.utils.toHex("100000"),
            to: transaction.to.toLowerCase(),
            value: this._web3.utils.toHex(transaction.value),
            data: '0x0'
        };

        let tx = new Tx(rawTx);
        tx.sign(privateKey);

        let serializedTx = tx.serialize();
        let txHash = '0x' + serializedTx.toString('hex');
        this._web3.eth.sendSignedTransaction(txHash);
        return txHash;
    }
}
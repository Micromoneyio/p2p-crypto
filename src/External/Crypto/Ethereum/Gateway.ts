import Web3 from "web3";
var Tx = require('ethereumjs-tx');
var promiseRetry = require('promise-retry');

import {Account, JsonRPCRequest, JsonRPCResponse, Transaction, TransactionReceipt} from "web3/types";
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
        let nonce = await this._web3.eth.getTransactionCount(transaction.from, "pending");
        return promiseRetry((retry, number) => {
            console.log('attempt number', number);

            return this._createTransaction(nonce, transaction)
                .catch(err => {
                    nonce ++;
                    retry(err);
                });
        });
    }

    private async _createTransaction(nonce:number, transaction: CreateTransactionParams): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let rawTx = {
                from: transaction.from,
                nonce: nonce,
                gasPrice: this._web3.utils.toHex(transaction.fee),
                gasLimit: this._web3.utils.toHex("100000"),
                to: transaction.to,
                value: this._web3.utils.toHex(transaction.value),
                data: '0x0'
            };

            let tx = new Tx(rawTx);
            let privateKey = Buffer.from(transaction.fromPrivateKey, 'hex');
            tx.sign(privateKey);

            let serializedTx = tx.serialize();

            let sendTransactionMethod = this.createTransaction;
            this._web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
                if (err)
                    return reject(err);

                return resolve(hash);
            });
        });
    }

    getTransactionReceipt(transactionHash): Promise<TransactionReceipt> {
        return this._web3.eth.getTransactionReceipt(transactionHash)
    }

    getTransaction(transactionHash): Promise<Transaction> {
        return this._web3.eth.getTransaction(transactionHash);
    }
}
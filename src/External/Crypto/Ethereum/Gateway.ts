import Web3 from "web3";
const Tx = require('ethereumjs-tx');
const promiseRetry = require('promise-retry');

import {Account, Transaction, TransactionReceipt} from "web3/types";
import {IEthGateway} from "../../../Core/Gateways/IEthGateway";
import CreateTransactionParams from "../../../Core/Models/CreateTransactionParams";
import CreateTransactionEthParams from "../../../Core/Models/CreateTransactionEthParams";

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

    async createTransaction(transaction: CreateTransactionEthParams): Promise<string> {
        let nonce = await this._web3.eth.getTransactionCount(transaction.from, "pending");
        return promiseRetry((retry, number) => {
            console.log('attempt number', number);

            return this._createTransaction(nonce, transaction)
                .catch(err => {
                    if(err.message.toLowerCase().includes('known ')){
                        nonce ++;
                        retry(err);
                    }else{
                        throw err;
                    }
                });
        });
    }

    private async _createTransaction(nonce:number, transaction: CreateTransactionEthParams): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let rawTx = {
                from: transaction.from,
                nonce: nonce,
                gasPrice: this._web3.utils.toHex(transaction.fee),
                gasLimit: this._web3.utils.toHex("21004"),
                to: transaction.to,
                value: this._web3.utils.toHex(transaction.value),
                data: '0x0'
            };

            let tx = new Tx(rawTx);
            let privateKey = Buffer.from(transaction.fromPrivateKey, 'hex');
            tx.sign(privateKey);

            let serializedTx = tx.serialize();

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

    isEthAddress(address: string): boolean {
        return this._web3.utils.isAddress(address);
    }
}
import Web3 from "web3";

const Tx = require('ethereumjs-tx');
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
        let rawTx = {
            from: transaction.from,
            nonce: await this._web3.eth.getTransactionCount(transaction.from, "pending"),
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

        return new Promise<string>((resolve, reject) => {
            this._web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
                if(err)
                    return reject(err);

                return resolve(hash);
            });
        });
    }

    //как только решится проблема с нодой, будет имплемент этой штуки
    // private async _getNonce(address: string) {
    //
    //     this._web3.eth.
    //     let count = await this._web3.eth.getTransactionCount(address, "pending");
    //     return new Promise((resolve, reject) => {
    //         this._web3.currentProvider.send(<JsonRPCRequest> {
    //             method: "txpool_content",
    //             params: [],
    //             jsonrpc: "2.0",
    //             id: new Date().getTime()
    //         }, (e: Error, val: JsonRPCResponse) => {
    //             if (e)
    //                 return reject(e);
    //
    //             if (val.result.pending) {
    //                 if (val.result.pending[address]) {
    //                     count = count +
    //                         Object.keys(val.result.pending[address]).length;
    //                     resolve(count);
    //                 } else {
    //                     resolve(count);
    //                 }
    //             } else {
    //                 resolve(count);
    //             }
    //         });
    //     });
    // }

    getTransactionReceipt(transactionHash): Promise<TransactionReceipt> {
        return this._web3.eth.getTransactionReceipt(transactionHash)
    }

    getTransaction(transactionHash): Promise<Transaction> {
        return this._web3.eth.getTransaction(transactionHash);
    }
}
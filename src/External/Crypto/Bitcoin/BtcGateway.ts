import CreateTransactionEthParams from "../../../Core/Models/CreateTransactionEthParams";
import {IBtcGateway} from "../../../Core/Gateways/IBtcGateway";
import {GeneratedAccount} from "../../../Core/Models/GeneratedAccount";
import {AxiosInstance} from "axios";

export class BtcGateway implements IBtcGateway {
    private _connector:any;
    private _httpClient:AxiosInstance;

    public constructor(connector, httpClient:AxiosInstance){
        this._connector = connector;
        this._httpClient = httpClient;
    }


    createTransaction(transaction: CreateTransactionEthParams): Promise<string> {
        return new Promise((resolve, reject) => {
            const minerFee = this._connector.bitcore.Unit.fromSatoshis(transaction.fee).toSatoshis();
            const txAmount = this._connector.bitcore.Unit.fromSatoshis(transaction.value).toSatoshis();

            let privateKey = new this._connector.bitcore.PrivateKey(transaction.fromPrivateKey);
            let fromAddress = privateKey.toAddress(this._connector.network);

            this._connector.insight.getUnspentUtxos(fromAddress, (error, utxos) => {
                if(error)
                    return reject(error);

                if(!this.checkBalance(txAmount, minerFee, utxos))
                    return reject(new Error("You don't have enough Satoshis to cover the transcation."));

                //create a new transaction
                try {
                    let bitcoreTransaction = new this._connector.bitcore.Transaction()
                        .from(utxos)
                        .to(transaction.to, txAmount)
                        .fee(minerFee)
                        .change(fromAddress)
                        .sign(privateKey);

                    let error = this.checkSerializationError(bitcoreTransaction);
                    if(error)
                        return reject(error);

                    // broadcast the transaction to the blockchain
                    this._connector.insight.broadcast(bitcoreTransaction, function(error, body) {
                        if (error) {
                            return reject('Error in broadcast: ' + error);
                        }

                        resolve(body);
                    });

                } catch (error) {
                    return reject(error.message);
                }
            });
        });
    }

    private checkBalance(transactionAmount, minerFee,  utxos){
        if (utxos.length === 0) {
            //if no transactions have happened, there is no balance on the address.
            return false;
        }

        //get balance
        let balance = this._connector.bitcore.Unit.fromSatoshis(0).toSatoshis();
        for (let i = 0; i < utxos.length; i++) {
            balance += this._connector.bitcore.Unit.fromSatoshis(parseInt(utxos[i]['satoshis'])).toSatoshis();
        }

        //check whether the balance of the address covers the miner fee
        if (balance - transactionAmount - minerFee < 0){
            return false;
        }

        return true;
    }

    private checkSerializationError(tx){
        //handle serialization errors
        if (tx.getSerializationError()) {
            let error = tx.getSerializationError().message;
            switch (error) {
                case 'Some inputs have not been fully signed':
                    return 'Please check your private key';
                default:
                    return error;
            }
        }
    }


    generateAddress(): GeneratedAccount {
        let privateKey = new this._connector.bitcore.PrivateKey();
        let address = privateKey.toAddress(this._connector.network);

        return {
            address : address.toString(),
            privateKey : privateKey.toString()
        };
    }

    getBalance(address: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this._connector.insight.address(address, (err, info) => {
                if(err)
                    return reject(err);

                resolve(info.balance);
            });
        });
    }

    isBtcAddress(address: string): boolean {
        return this._connector.bitcore.Address.isValid(address, this._connector.network);
    }

    async getTransaction(transactionHash): Promise<any> {
        return (await this._httpClient.get(`${process.env.BITCOIN_API}/api/tx/${transactionHash}`)).data;
    }

}
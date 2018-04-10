import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {IEthService} from "../../Core/Services/IEthService";
import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";
import NotFoundError from "../../Core/Models/Exceptions/NotFoundError";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";

export class EthService implements IEthService{
    private _gateway:IEthGateway;

    constructor(gateway:IEthGateway){
        this._gateway = gateway;
    }

    generateAddress(): GeneratedAccount {
        return this._gateway.generateAddress();
    }

    getBalance(address: string): Promise<number> {
        if(!this._gateway.isEthAddress(address))
            throw new ValidationError("Address isn't ether's one");

        return this._gateway.getBalance(address);
    }

    createTransaction(transaction: CreateTransactionParams): Promise<string> {
        transaction.from = transaction.from.toLowerCase();
        transaction.to = transaction.to.toLowerCase();
        if(transaction.fromPrivateKey.includes("0x", 0)){
            transaction.fromPrivateKey = transaction.fromPrivateKey.slice(2);
        }

        return this._gateway.createTransaction(transaction);
    }

    async getStatus(hash: String): Promise<TransactionStatus> {
        let receipt = await this._gateway.getTransactionReceipt(hash);
        if(receipt !== null)
            return receipt.status === '0x1' ? TransactionStatus.Approved : TransactionStatus.Failed;

        let transaction = await this._gateway.getTransaction(hash);
        if(transaction === null)
            throw new NotFoundError("Transaction doesn't exist in blockchain");

        if(!transaction.blockNumber)
            return TransactionStatus.Pending;


        throw new Error("Something strange happens. Transaction receipt doesn't exist, " +
            "but block's number was defined");
    }

}

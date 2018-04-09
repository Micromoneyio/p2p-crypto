import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {IEthService} from "../../Core/Services/IEthService";
import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";
import NotFoundError from "../../Core/Models/Exceptions/NotFoundError";

export class EthService implements IEthService{
    private _gateway:IEthGateway;

    constructor(gateway:IEthGateway){
        this._gateway = gateway;
    }

    generateAddress(): GeneratedAccount {
        return this._gateway.generateAddress();
    }

    getBalance(address: string): Promise<number> {
        return this._gateway.getBalance(address);
    }

    createTransaction(transaction: CreateTransactionParams): Promise<string> {
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

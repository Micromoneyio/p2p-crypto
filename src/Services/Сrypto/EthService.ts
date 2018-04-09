import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {IEthService} from "../../Core/Services/IEthService";
import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";

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

}

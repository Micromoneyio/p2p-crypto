import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {IEthService} from "../../Core/Services/IEthService";

export class EthService implements IEthService{
    private _gateway:IEthGateway;

    constructor(gateway:IEthGateway){
        this._gateway = gateway;
    }

    generateAddress(): GeneratedAccount {
        return this._gateway.generateAddress();
    }

}

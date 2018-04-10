import {IServiceFactory} from "../Core/Services/IServiceFactory";
import {ICryptoService} from "../Core/Services/ICryptoService";
import {IEthService} from "../Core/Services/IEthService";
import {CurrencyEnum} from "../Core/Models/Enums/CurrencyEnum";
import ValidationError from "../Core/Models/Exceptions/ValidationError";

export class ServiceFactory implements IServiceFactory{
    private _ethService:IEthService;

    constructor(ethService:IEthService){
        this._ethService = ethService;
    }


    get(currencyType:CurrencyEnum): ICryptoService {
        switch (currencyType){
            case CurrencyEnum.ETH:
                return this._ethService;
            default:
                throw new ValidationError("Currency doesn't support");
        }
    }

}
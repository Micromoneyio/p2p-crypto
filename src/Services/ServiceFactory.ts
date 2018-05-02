import {IServiceFactory} from "../Core/Services/IServiceFactory";
import {ICryptoService} from "../Core/Services/ICryptoService";
import {IEthService} from "../Core/Services/IEthService";
import {CurrencyEnum} from "../Core/Models/Enums/CurrencyEnum";
import ValidationError from "../Core/Models/Exceptions/ValidationError";
import {IBtcService} from "../Core/Services/IBtcService";

export class ServiceFactory implements IServiceFactory{
    private _ethService:IEthService;
    private _btcService:IBtcService;

    constructor(ethService:IEthService, btcService:IBtcService){
        this._ethService = ethService;
        this._btcService = btcService;
    }


    get(currencyType:CurrencyEnum): ICryptoService {
        switch (currencyType){
            case CurrencyEnum.ETH:
                return this._ethService;
            case CurrencyEnum.BTC:
                return this._btcService;
            default:
                throw new ValidationError("Currency doesn't support");
        }
    }

}
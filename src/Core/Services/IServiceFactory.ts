import {ICryptoService} from "./ICryptoService";
import {CurrencyEnum} from "../Models/Enums/CurrencyEnum";

export interface IServiceFactory {
    get(currencyType:CurrencyEnum) : ICryptoService
}
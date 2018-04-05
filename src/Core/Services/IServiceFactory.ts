import {ICryptoService} from "./ICryptoService";
import {CurrencyEnum} from "../Models/CurrencyEnum";

export interface IServiceFactory {
    get(currencyType:CurrencyEnum) : ICryptoService
}
import {GeneratedAccount} from "../Models/GeneratedAccount";
import {CurrencyEnum} from "../Models/Enums/CurrencyEnum";

export interface IAccountService {
    generateAddress(currencyType:CurrencyEnum): GeneratedAccount;
    getBalance(currencyType:CurrencyEnum, address:string): Promise<number>
}
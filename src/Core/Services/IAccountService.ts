import {GeneratedAccount} from "../Models/GeneratedAccount";
import BigNumber from 'bignumber.js';
import {CurrencyEnum} from "../Models/CurrencyEnum";

export interface IAccountService {
    generateAddress(currencyType:CurrencyEnum): GeneratedAccount;
    getBalance(currencyType:CurrencyEnum, address:string): BigNumber
}
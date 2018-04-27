import CreateTransactionParams from "../Models/CreateTransactionParams";
import {CurrencyEnum} from "../Models/Enums/CurrencyEnum";
import {TransactionStatus} from "../Models/Enums/TransactionStatus";
import TransactionCost from "../Models/TransactionCost";

export interface ITransactionService {
    create(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string>
    createWithFeeIncluded(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string>
    getStatus(currencyType: CurrencyEnum, hash:String) : Promise<TransactionStatus>
    getTransactionCost(currencyType: CurrencyEnum) : Promise<TransactionCost>
}
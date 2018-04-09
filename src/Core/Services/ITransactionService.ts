import CreateTransactionParams from "../Models/CreateTransactionParams";
import {CurrencyEnum} from "../Models/Enums/CurrencyEnum";
import {TransactionStatus} from "../Models/Enums/TransactionStatus";

export interface ITransactionService {
    create(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string>
    getStatus(currencyType: CurrencyEnum, hash:String) : Promise<TransactionStatus>
}
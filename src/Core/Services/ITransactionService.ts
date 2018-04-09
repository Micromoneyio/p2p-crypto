import CreateTransactionParams from "../Models/CreateTransactionParams";
import {CurrencyEnum} from "../Models/CurrencyEnum";

export interface ITransactionService {
    create(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string>
}
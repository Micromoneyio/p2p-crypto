import {GeneratedAccount} from "../Models/GeneratedAccount";
import CreateTransactionParams from "../Models/CreateTransactionParams";
import {TransactionStatus} from "../Models/Enums/TransactionStatus";

export interface ICryptoService {
    generateAddress() : GeneratedAccount
    getBalance(address: string): Promise<number>
    createTransaction(transaction: CreateTransactionParams) : Promise<string>
    getStatus(hash: String): Promise<TransactionStatus>
}
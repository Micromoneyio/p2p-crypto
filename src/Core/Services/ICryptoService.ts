import {GeneratedAccount} from "../Models/GeneratedAccount";
import CreateTransactionParams from "../Models/CreateTransactionParams";

export interface ICryptoService {
    generateAddress() : GeneratedAccount
    getBalance(address: string): Promise<number>
    createTransaction(transaction: CreateTransactionParams) : Promise<string>
}
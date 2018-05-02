import {GeneratedAccount} from "../Models/GeneratedAccount";
import CreateTransactionEthParams from "../Models/CreateTransactionEthParams";

export interface IBtcGateway {
    isBtcAddress(address: string): boolean
    generateAddress(): GeneratedAccount
    getBalance(address: string): Promise<number>
    createTransaction(transaction: CreateTransactionEthParams): Promise<string>
    getTransaction(transactionHash) : Promise<any>
}
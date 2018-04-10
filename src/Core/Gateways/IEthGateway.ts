import {Account, Transaction, TransactionReceipt} from "web3/types";
import CreateTransactionParams from "../Models/CreateTransactionParams";

export interface IEthGateway {
    isEthAddress(address: string): boolean
    generateAddress(): Account
    getBalance(address: string): Promise<number>
    createTransaction(transaction: CreateTransactionParams): Promise<string>
    getTransactionReceipt(transactionHash) : Promise<TransactionReceipt>
    getTransaction(transactionHash) : Promise<Transaction>
}
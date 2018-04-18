import {Account, Transaction, TransactionReceipt} from "web3/types";
import CreateTransactionParams from "../Models/CreateTransactionParams";
import CreateTransactionEthParams from "../Models/CreateTransactionEthParams";

export interface IEthGateway {
    isEthAddress(address: string): boolean
    generateAddress(): Account
    getBalance(address: string): Promise<number>
    createTransaction(transaction: CreateTransactionEthParams): Promise<string>
    getTransactionReceipt(transactionHash) : Promise<TransactionReceipt>
    getTransaction(transactionHash) : Promise<Transaction>
}
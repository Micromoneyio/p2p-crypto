import {Account} from "web3/types";
import CreateTransactionParams from "../Models/CreateTransactionParams";

export interface IEthGateway {
    generateAddress(): Account

    getBalance(address: string): Promise<number>

    createTransaction(transaction: CreateTransactionParams): Promise<string>
}
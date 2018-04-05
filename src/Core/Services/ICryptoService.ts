import {GeneratedAccount} from "../Models/GeneratedAccount";

export interface ICryptoService {
    generateAddress() : GeneratedAccount
    getBalance(address: string): Promise<number>
}
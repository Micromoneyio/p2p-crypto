import {GeneratedAccount} from "../Models/GeneratedAccount";

export interface ICryptoService {
    generateAddress() : GeneratedAccount
}
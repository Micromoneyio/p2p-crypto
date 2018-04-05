import {Account} from "web3/types";

export interface IEthGateway {
    generateAddress(): Account

    getBalance(address: string): Promise<number>
}
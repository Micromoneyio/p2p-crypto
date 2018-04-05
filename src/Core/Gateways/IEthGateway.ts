import {Account} from "web3/types";

export interface IEthGateway {
    generateAddress(): Account
}
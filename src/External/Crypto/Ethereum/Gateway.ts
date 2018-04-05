import Web3 from "web3";
import {Account} from "web3/types";
import {IEthGateway} from "../../../Core/Gateways/IEthGateway";

export class EthGateway implements IEthGateway {
    private _web3:Web3;

    constructor(web3) {
        this._web3 = web3;
    }


    generateAddress() : Account {
        return this._web3.eth.accounts.create();
    }

    getBalance(address: string): Promise<number> {
        return this._web3.eth.getBalance(address);
    }
}
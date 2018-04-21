import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {IEthService} from "../../Core/Services/IEthService";
import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";
import NotFoundError from "../../Core/Models/Exceptions/NotFoundError";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";
import IEthGasStationGateway from "../../Core/Gateways/IEthGasStationGateway";
import {TransactionFeeEnum} from "../../Core/Models/Enums/TransactionFeeEnum";
import TransactionCost from "../../Core/Models/TransactionCost";
import {BigNumber} from "bignumber.js";
import {EthereumUnitConverter} from "../Utils/EthereumUnitConverter";

export class EthService implements IEthService {
    private _gateway: IEthGateway;
    private _ethGasPriceGateway: IEthGasStationGateway;

    constructor(gateway: IEthGateway, ethGasPriceGateway: IEthGasStationGateway) {
        this._gateway = gateway;
        this._ethGasPriceGateway = ethGasPriceGateway;
    }

    generateAddress(): GeneratedAccount {
        return this._gateway.generateAddress();
    }

    getBalance(address: string): Promise<number> {
        if (!this._gateway.isEthAddress(address))
            throw new ValidationError("Address isn't ether's one");

        return this._gateway.getBalance(address);
    }

   async createTransaction(transaction: CreateTransactionParams): Promise<string> {
        transaction.from = transaction.from.toLowerCase();
        transaction.to = transaction.to.toLowerCase();
        if (transaction.fromPrivateKey.includes("0x", 0)) {
            transaction.fromPrivateKey = transaction.fromPrivateKey.slice(2);
        }
        let fee = await this.transformFee(transaction);

        return this._gateway.createTransaction({
            fee : fee,
            from: transaction.from,
            fromPrivateKey : transaction.fromPrivateKey,
            to : transaction.to,
            value : transaction.value
        });
    }

    private async transformFee(transaction: CreateTransactionParams) : Promise<string> {
        let gasPrice = await this._ethGasPriceGateway.getPrices();
        switch (transaction.fee) {
            case TransactionFeeEnum.Slow:
                return gasPrice.safeLow;
            case TransactionFeeEnum.Average:
                return gasPrice.average;
            case TransactionFeeEnum.Fast:
                return gasPrice.fast;
            default:
                throw new Error("Fee type doesn't supported");
        }
    }

    async getStatus(hash: String): Promise<TransactionStatus> {
        let receipt = await this._gateway.getTransactionReceipt(hash);
        if (receipt !== null)
            return receipt.status == '0x1' ? TransactionStatus.Approved : TransactionStatus.Failed;

        let transaction = await this._gateway.getTransaction(hash);
        if (transaction === null)
            throw new NotFoundError("Transaction doesn't exist in blockchain");

        if (!transaction.blockNumber)
            return TransactionStatus.Pending;


        throw new Error("Something strange happens. Transaction receipt doesn't exist, " +
            "but block's number was defined");
    }

    async getTransactionCost(): Promise<TransactionCost> {
        let gasPrice = await this._ethGasPriceGateway.getPrices();
        let slowCost = new BigNumber(gasPrice.safeLow).times(31000);
        let averageCost = new BigNumber(gasPrice.average).times(31000);
        let fastCost = new BigNumber(gasPrice.fast).times(31000);

        return {
            slowCost : EthereumUnitConverter.weiToEther(slowCost).toNumber(),
            averageCost : EthereumUnitConverter.weiToEther(averageCost).toNumber(),
            fastCost: EthereumUnitConverter.weiToEther(fastCost).toNumber()
        }
    }

}

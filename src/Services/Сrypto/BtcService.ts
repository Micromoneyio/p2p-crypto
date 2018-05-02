import {IBtcService} from "../../Core/Services/IBtcService";
import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import {GeneratedAccount} from "../../Core/Models/GeneratedAccount";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";
import TransactionCost from "../../Core/Models/TransactionCost";
import {IBtcGateway} from "../../Core/Gateways/IBtcGateway";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";
import IBtcPriceGateway from "../../Core/Gateways/IBtcPriceGateway";
import {BigNumber} from "bignumber.js";
import {TransactionFeeEnum} from "../../Core/Models/Enums/TransactionFeeEnum";
import {BitcoinUnitConverter} from "../Utils/BitcoinUnitConverter";

export class BtcService implements IBtcService{
    private _gateway:IBtcGateway;
    private _btcPriceGateway:IBtcPriceGateway;

    constructor(gateway:IBtcGateway, btcPriceGateway:IBtcPriceGateway){
        this._gateway = gateway;
        this._btcPriceGateway = btcPriceGateway;
    }

    async createTransaction(transaction: CreateTransactionParams): Promise<string> {
        transaction.from = transaction.from.toLowerCase();
        transaction.to = transaction.to.toLowerCase();
        let fee = await this.transformFee(transaction);

        return this._gateway.createTransaction({
            fee : BitcoinUnitConverter.btcToSatoshi(fee).toString(),
            from: transaction.from,
            fromPrivateKey : transaction.fromPrivateKey,
            to : transaction.to,
            value : transaction.value
        });
    }

    async createTransactionWithFeeIncluded(transaction: CreateTransactionParams): Promise<string> {
        transaction.from = transaction.from.toLowerCase();
        transaction.to = transaction.to.toLowerCase();
        let fee = await this.transformFee(transaction);

        let feeAmount = BitcoinUnitConverter.btcToSatoshi(fee);
        let valueAmount = new BigNumber(transaction.value).minus(BitcoinUnitConverter.btcToSatoshi(fee));
        if(feeAmount.isGreaterThan(valueAmount))
            throw new ValidationError("Fee can't be greater than amount");

        return this._gateway.createTransaction({
            fee : feeAmount.toString(),
            from: transaction.from,
            fromPrivateKey : transaction.fromPrivateKey,
            to : transaction.to,
            value : valueAmount.toString()
        });
    }

    private async transformFee(transaction: CreateTransactionParams) : Promise<string>{
        let gasPrice = await this._btcPriceGateway.getPrices();
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

    generateAddress(): GeneratedAccount {
        return this._gateway.generateAddress();
    }

    getBalance(address: string): Promise<number> {
        if (!this._gateway.isBtcAddress(address))
            throw new ValidationError("Address isn't bitcoin's one");

        return this._gateway.getBalance(address);
    }

    async getStatus(hash: String): Promise<TransactionStatus> {
        let txInfo = await this._gateway.getTransaction(hash);

        if(txInfo === null)
            throw new Error("Something strange happens. Transaction doesn't exist");

        if(txInfo.blockheight === null)
            return TransactionStatus.Pending;

        return TransactionStatus.Approved;
    }

    async getTransactionCost(): Promise<TransactionCost> {
        let gasPrice = await this._btcPriceGateway.getPrices();

        return {
            slowCost : Number.parseFloat(gasPrice.safeLow),
            averageCost : Number.parseFloat(gasPrice.average),
            fastCost: Number.parseFloat(gasPrice.fast)
        }
    }
}

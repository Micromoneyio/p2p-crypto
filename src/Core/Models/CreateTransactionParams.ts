import {TransactionFeeEnum} from "./Enums/TransactionFeeEnum";

export default interface CreateTransactionParams {
    from: string;
    fromPrivateKey: string;

    to: string;

    value: string;
    fee: TransactionFeeEnum;
}
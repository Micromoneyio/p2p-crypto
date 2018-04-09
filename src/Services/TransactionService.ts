import {ITransactionService} from "../Core/Services/ITransactionService";
import CreateTransactionParams from "../Core/Models/CreateTransactionParams";
import {validateTransactionHash, validateCreateTransactionParams} from "./Validation/TransactionParamsValidator";
import {IServiceFactory} from "../Core/Services/IServiceFactory";
import {CurrencyEnum} from "../Core/Models/Enums/CurrencyEnum";
import {TransactionStatus} from "../Core/Models/Enums/TransactionStatus";

export default class TransactionService implements ITransactionService {
    private _serviceFactory: IServiceFactory;

    constructor(serviceFactory: IServiceFactory) {
        this._serviceFactory = serviceFactory;
    }

    create(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string> {
        validateCreateTransactionParams(transaction);

        return this._serviceFactory.get(currencyType).createTransaction(transaction);
    }

    getStatus(currencyType: CurrencyEnum, hash: String): Promise<TransactionStatus> {
        validateTransactionHash(hash);

        return this._serviceFactory.get(currencyType).getStatus(hash);
    }

}
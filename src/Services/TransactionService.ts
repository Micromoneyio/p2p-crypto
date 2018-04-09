import {ITransactionService} from "../Core/Services/ITransactionService";
import CreateTransactionParams from "../Core/Models/CreateTransactionParams";
import validateCreateTransactionParams from "./Validation/TransactionParamsValidator";
import {IServiceFactory} from "../Core/Services/IServiceFactory";
import {CurrencyEnum} from "../Core/Models/CurrencyEnum";

export default class TransactionService implements ITransactionService {
    private _serviceFactory: IServiceFactory;

    constructor(serviceFactory: IServiceFactory) {
        this._serviceFactory = serviceFactory;
    }

    create(currencyType: CurrencyEnum, transaction: CreateTransactionParams): Promise<string> {
        validateCreateTransactionParams(transaction);

        return this._serviceFactory.get(currencyType).createTransaction(transaction);
    }

}
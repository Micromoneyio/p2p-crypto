import {IServiceFactory} from "../../Core/Services/IServiceFactory";
import {ServiceFactory} from "../../Services/ServiceFactory";
import {ethService} from "./EthDI";
import {IAccountService} from "../../Core/Services/IAccountService";
import {AccountService} from "../../Services/AccountService";
import {ITransactionService} from "../../Core/Services/ITransactionService";
import TransactionService from "../../Services/TransactionService";

let serviceFactory:IServiceFactory = new ServiceFactory(ethService);
let accountService:IAccountService = new AccountService(serviceFactory);
let transactionService:ITransactionService = new TransactionService(serviceFactory);

export {transactionService, serviceFactory, accountService};
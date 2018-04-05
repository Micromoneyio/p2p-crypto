import {IServiceFactory} from "../../Core/Services/IServiceFactory";
import {ServiceFactory} from "../../Services/ServiceFactory";
import {ethService} from "./EthDI";
import {IAccountService} from "../../Core/Services/IAccountService";
import {AccountService} from "../../Services/AccountService";

let serviceFactory:IServiceFactory = new ServiceFactory(ethService);
let accountService:IAccountService = new AccountService(serviceFactory);

export {serviceFactory, accountService};
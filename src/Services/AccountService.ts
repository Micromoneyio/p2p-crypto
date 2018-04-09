import {IAccountService} from "../Core/Services/IAccountService";
import {GeneratedAccount} from "../Core/Models/GeneratedAccount";
import {IServiceFactory} from "../Core/Services/IServiceFactory";
import {CurrencyEnum} from "../Core/Models/Enums/CurrencyEnum";

export class AccountService implements IAccountService{
    private _serviceFactory:IServiceFactory;

    constructor(serviceFactory : IServiceFactory){
        this._serviceFactory = serviceFactory;
    }

    generateAddress(currencyType: CurrencyEnum): GeneratedAccount {
        return this._serviceFactory.get(currencyType).generateAddress();
    }

    getBalance(currencyType: CurrencyEnum, address: string): Promise<number> {
        if(!address)
            throw new Error("Address couldn't be empty");

        return this._serviceFactory.get(currencyType).getBalance(address);
    }


}
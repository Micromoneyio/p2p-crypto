import {ServiceFactory} from "../../src/Services/ServiceFactory";
import {IEthService} from "../../src/Core/Services/IEthService";
import * as TypeMoq from "typemoq";
import {CurrencyEnum} from "../../src/Core/Models/Enums/CurrencyEnum";
import {expect} from "chai";
import {ICryptoService} from "../../src/Core/Services/ICryptoService";

describe('ServiceFactory', () => {
    let serviceFactory =
        new ServiceFactory(TypeMoq.Mock.ofType<IEthService>().object);



    it('check that switch is initialised', () => {
        const keys = Object.keys(CurrencyEnum).filter(k => typeof CurrencyEnum[k as any] === "number");
        for(let key of keys){
            expect(serviceFactory.get(CurrencyEnum[key])).not.to.throw("Currency doesn't support");
        }
    })
});
import {expect} from 'chai';
import {AccountService} from "../../src/Services/AccountService";
import {ICryptoService} from "../../src/Core/Services/ICryptoService";
import * as TypeMoq from "typemoq";
import {IServiceFactory} from "../../src/Core/Services/IServiceFactory";
import TransactionService from "../../src/Services/TransactionService";
import {CurrencyEnum} from "../../src/Core/Models/Enums/CurrencyEnum";
import {description} from "joi";

describe('AccountService', () => {
    let accountService:AccountService;
    let cryptoServiceMock: TypeMoq.IMock<ICryptoService>;

    beforeEach(function () {
        const serviceFactoryMock: TypeMoq.IMock<IServiceFactory> = TypeMoq.Mock.ofType<IServiceFactory>();
        cryptoServiceMock = TypeMoq.Mock.ofType<ICryptoService>();
        serviceFactoryMock.setup(x => x.get(CurrencyEnum.ETH)).returns(() => cryptoServiceMock.object);
        accountService = new AccountService(serviceFactoryMock.object);
    });

    it("generate account happy path", async () =>{
        let generatedAccount = {
            address: "address",
            privateKey:  "key",
        };
        cryptoServiceMock.setup(x => x.generateAddress()).returns(() => generatedAccount);

        let result = await accountService.generateAddress(CurrencyEnum.ETH);

        expect(result.address).equal("address");
        expect(result.privateKey).equal("key");
    });

    describe("getBalance",() => {
        it('fails if address is empty', async () => {
            expect(() => accountService.getBalance(CurrencyEnum.ETH, ""))
                .to
                .throw("Address couldn't be empty");
        });

        it('happy path', async () => {
            cryptoServiceMock.setup(x => x.getBalance("1")).returns(() => Promise.resolve(543));
            let result = await accountService.getBalance(CurrencyEnum.ETH, "1");
            expect(result).equal(543);
        });
    });

});
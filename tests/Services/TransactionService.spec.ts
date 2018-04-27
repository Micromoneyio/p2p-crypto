import {expect} from 'chai';
import 'mocha';
import TransactionService from "../../src/Services/TransactionService";
import * as TypeMoq from "typemoq";
import {IServiceFactory} from "../../src/Core/Services/IServiceFactory";
import {ICryptoService} from "../../src/Core/Services/ICryptoService";
import {CurrencyEnum} from "../../src/Core/Models/Enums/CurrencyEnum";
import {TransactionStatus} from "../../src/Core/Models/Enums/TransactionStatus";
import {TransactionFeeEnum} from "../../src/Core/Models/Enums/TransactionFeeEnum";


describe('TransactionService', () => {

    let transactionService: TransactionService;
    let cryptoServiceMock: TypeMoq.IMock<ICryptoService>;

    beforeEach(function () {
        const serviceFactoryMock: TypeMoq.IMock<IServiceFactory> = TypeMoq.Mock.ofType<IServiceFactory>();
        cryptoServiceMock = TypeMoq.Mock.ofType<ICryptoService>();
        serviceFactoryMock.setup(x => x.get(CurrencyEnum.ETH)).returns(() => cryptoServiceMock.object);
        transactionService = new TransactionService(serviceFactoryMock.object);
    });

    describe('TransactionService', () => {
        it('getTransactionCost works properly', async () => {
            cryptoServiceMock.setup(x => x.getTransactionCost()).returns(() => Promise.resolve({
                slowCost: 1,
                averageCost: 2,
                fastCost: 3
            }));

            let cost = await transactionService.getTransactionCost(CurrencyEnum.ETH);

            expect(cost.slowCost).to.equal(1);
            expect(cost.averageCost).to.equal(2);
            expect(cost.fastCost).to.equal(3);

        });

        describe('getStatus', () => {
            it('fails if transaction cost less then 15 symbols length', () => {

                expect(() => transactionService.getStatus(CurrencyEnum.ETH, "111"))
                    .to
                    .throw('Transaction hash should be more then 15 symbols');
            });

            it('happy path', async () => {
                cryptoServiceMock
                    .setup(x => x.getStatus(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve(TransactionStatus.Approved));


                let result = await transactionService.getStatus(CurrencyEnum.ETH, Array(15).join("a"));

                expect(result).to.equal(TransactionStatus.Approved);
            });
        });

        describe('create', () => {
            it("create fails with wrong tx", () => {
                let tx = {
                    from: "",
                    fromPrivateKey: "",
                    to: "",
                    value: "",
                    fee: TransactionFeeEnum.Fast
                };

                expect(() => transactionService.create(CurrencyEnum.ETH, tx))
                    .to
                    .throw("Transaction isn't valid. Please check : from, fromPrivateKey, to, value");
            });

            it("create fails with empty fee", () => {
                let tx = {
                    from: "",
                    fromPrivateKey: "",
                    to: "",
                    value: "",
                    fee: undefined
                };

                expect(() => transactionService.create(CurrencyEnum.ETH, tx))
                    .to
                    .throw("Fee should be defined");
            });

            it("create fails with empty model", () => {
                expect(() => transactionService.create(CurrencyEnum.ETH, null))
                    .to
                    .throw("Transaction info should be provided");
            });

            it("create fails with empty model", () => {
                expect(() => transactionService.create(CurrencyEnum.ETH, null))
                    .to
                    .throw("Transaction info should be provided");
            });

            it("happy path", async () => {
                cryptoServiceMock
                    .setup(x => x.createTransaction(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve("test"));
                let tx = {
                    from: Array(15).join("a"),
                    fromPrivateKey: Array(15).join("a"),
                    to: Array(15).join("a"),
                    value: "123",
                    fee: TransactionFeeEnum.Slow
                };

                let result = await transactionService.create(CurrencyEnum.ETH, tx);

                expect(result).equal("test");
            });
        });
    });

});
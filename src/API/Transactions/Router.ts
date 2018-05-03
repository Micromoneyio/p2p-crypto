import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/Enums/CurrencyEnum";
import {transactionService} from "../DI/CommonDI";
import {asyncMiddleware, biggestPartToSmallest} from "../Utils";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";
import {EthereumUnitConverter} from "../../Services/Utils/EthereumUnitConverter";
import {TransactionFeeEnum} from "../../Core/Models/Enums/TransactionFeeEnum";

const transactionRouter = express.Router();

transactionRouter.post('/:currency/fee-included', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];

    req.body.value = biggestPartToSmallest(currencyType, req.body.value || 0).toString();
    req.body.fee = TransactionFeeEnum[<string>req.body.fee];

    let hash = await transactionService.createWithFeeIncluded(currencyType, req.body);
    res.json({ hash : hash})
}));

transactionRouter.post('/:currency/fee-not-included', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];

    req.body.value = biggestPartToSmallest(currencyType, req.body.value || 0).toString();
    req.body.fee = TransactionFeeEnum[<string>req.body.fee];

    let hash = await transactionService.create(currencyType, req.body);
    res.json({ hash : hash})
}));

transactionRouter.get('/:currency/:transactionHash/status', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let status = await transactionService.getStatus(currencyType, req.params.transactionHash);
    res.json({status: TransactionStatus[status]})
}));

transactionRouter.get('/:currency/transaction-cost', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let cost = await transactionService.getTransactionCost(currencyType);
    res.json({costs: cost})
}));

export default transactionRouter;

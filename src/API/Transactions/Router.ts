import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/Enums/CurrencyEnum";
import {transactionService} from "../DI/CommonDI";
import {asyncMiddleware} from "../Utils";
import {TransactionStatus} from "../../Core/Models/Enums/TransactionStatus";

const transactionRouter = express.Router();

transactionRouter.post('/:currency', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let hash = await transactionService.create(currencyType, req.body);
    res.json({ hash : hash})
}));

transactionRouter.get('/:currency/:transactionHash', asyncMiddleware(async (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let status = await transactionService.getStatus(currencyType, req.params.transactionHash);
    res.json({status: TransactionStatus[status]})
}));

export default transactionRouter;

import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/Enums/CurrencyEnum";
import {transactionService} from "../DI/CommonDI";

const transactionRouter = express.Router();

transactionRouter.post('/:currency', (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let account = transactionService.create(currencyType, req.body);
    res.json(account)
});

transactionRouter.get('/:currency/:transactionHash', (req, res) => {
    const currencyType: CurrencyEnum = CurrencyEnum[<string>req.params.currency];
    let status = transactionService.getStatus(currencyType, req.params.currency.transactionHash);
    res.json({status: status})
});

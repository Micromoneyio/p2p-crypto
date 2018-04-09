import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/CurrencyEnum";
import {transactionService} from "../DI/CommonDI";

const transactionRouter = express.Router();

transactionRouter.post('/:currency', (req, res) => {
    const currencyType:CurrencyEnum  = CurrencyEnum[<string>req.params.currency];
    let account = transactionService.create(currencyType, req.body);
    res.json(account)
});

import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/Enums/CurrencyEnum";
import {accountService} from "../DI/CommonDI";
import {asyncMiddleware} from "../Utils";

const accountRouter = express.Router();

accountRouter.post('/:currency/', (req, res) => {
    const currencyType:CurrencyEnum  = CurrencyEnum[<string>req.params.currency];
    let account = accountService.generateAddress(currencyType);
    res.json(account)
});

accountRouter.get('/:currency/:address/balance', asyncMiddleware(async (req, res) => {
    const currencyType:CurrencyEnum  = CurrencyEnum[<string>req.params.currency];
    let balance = await accountService.getBalance(currencyType, req.params.address);
    res.json({balance : balance});
}));


export default accountRouter;
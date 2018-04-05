import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/CurrencyEnum";
import {accountService} from "../DI/CommonDI";

const accountRouter = express.Router();

accountRouter.post('/:currency', (req, res) => {
    const currencyType:CurrencyEnum  = CurrencyEnum[<string>req.params.currency];
    let account = accountService.generateAddress(currencyType);
    res.json(account)
});

export default accountRouter;
import * as express from 'express'
import {CurrencyEnum} from "../../Core/Models/CurrencyEnum";

const currenciesRouter = express.Router();

currenciesRouter.get('/', (req, res) => {
    res.json(CurrencyEnum)
});

export default currenciesRouter;
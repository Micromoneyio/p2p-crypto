import * as express from 'express'
import currencies from "./CurrenciesListModel";

const currenciesRouter = express.Router();

currenciesRouter.get('/', (req, res) => {
    res.json(currencies)
});

export default currenciesRouter;
import * as express from 'express'
import * as bodyParser from 'body-parser'
import homeRoute from "./API/Home/Router";
import accountRouter from "./API/Accounts/Router";
import currenciesRouter from "./API/Currencies/Router";
import transactionRouter from "./API/Transactions/Router";

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountMiddleware();
        this.mountRoutes();

        this.express.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send({ error : JSON.stringify(err.message)});
            //res.status(500).send({ error: 'Something failed!' });
        });
    }

    private mountMiddleware() : void {
        // parse application/x-www-form-urlencoded
        this.express.use(bodyParser.urlencoded({extended: false}));

        // parse application/json
        this.express.use(bodyParser.json());

        // parse various different custom JSON types as JSON
        this.express.use(bodyParser.json({type: 'application/*+json'}));

        // parse an HTML body into a string
        this.express.use(bodyParser.text({type: 'text/html'}))
    }

    private mountRoutes(): void {
        this.express.use('/', homeRoute);
        this.express.use('/accounts', accountRouter);
        this.express.use('/currencies', currenciesRouter);
        this.express.use('/transactions', transactionRouter);
    }
}

export default new App().express
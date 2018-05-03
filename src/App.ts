import * as express from 'express'
import * as bodyParser from 'body-parser'
import homeRoute from "./API/Home/Router";
import accountRouter from "./API/Accounts/Router";
import currenciesRouter from "./API/Currencies/Router";
import transactionRouter from "./API/Transactions/Router";
import ValidationError from "./Core/Models/Exceptions/ValidationError";
import logger from "./Services/Logger/Logger";
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountMiddleware();
        this.mountRoutes();
        this.configureSwagger();

        this.express.use((err, req, res, next) => {
            logger.error(err.stack || err);

            if(err instanceof ValidationError){
                return res.status(406).send({error: JSON.stringify(err.message || err)});
            }

            res.status(500).send({error: JSON.stringify(err.message || err)});
        });
    }

    private mountMiddleware(): void {
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

    private configureSwagger(): void {
        // if(process.env.BLOCKCHAIN_ENV !== "dev")
        //      return;

        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

export default new App().express
import * as express from 'express'
import * as bodyParser from 'body-parser'
import homeRoute from "./API/Home/Router";
import accountRouter from "./API/Account/Router";
import currenciesRouter from "./API/Currencies/Router";

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountMiddleware();
        this.mountRoutes();

        this.express.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send(JSON.stringify(Error));
        });
    }

    private mountMiddleware() {
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
    }
}

export default new App().express
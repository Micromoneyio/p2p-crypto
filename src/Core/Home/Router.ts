import * as express from 'express'

const homeRoute = express.Router();

homeRoute.get('/', (req, res) => {
    res.json({
        message: 'api works!'
    })
});

export default homeRoute;
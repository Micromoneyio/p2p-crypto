import * as express from 'express'

const accountRouter = express.Router();

accountRouter.post('/:currency', (req, res) => {
    res.json({
        message: 'api works!'
    })
});

export default accountRouter;
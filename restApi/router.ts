import * as express from 'express'
import { OurScalaApiPayload } from './DataModel/Payload'

const bodyParser = require('body-parser');

module.exports = (app:express.Application, router:express.Router) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    router.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
        // @TODO add logging
        console.log('Something is happening.');
        next();
    });

    router.get('/', (req:express.Request, res:express.Response) => {
        res.json({message: 'hooray! welcome to our api!'});
    });

    app.use('/api', router);
};
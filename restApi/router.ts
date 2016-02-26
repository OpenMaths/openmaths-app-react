import * as express from 'express'
import { OurScalaApiPayload } from './DataModel/Payload'
import { Response } from './DataModel/Http'

const bodyParser = require('body-parser');

module.exports = (app:express.Application, router:express.Router) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    router.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
        // @TODO add logging
        next();
    });

    router.get('/uoi/:id', (req:express.Request, res:express.Response) => {
        const id = req.params['id'];

        console.log('Getting UoI id: ' + id);

        res.json({
            data: {
                id: id,
                title: 'How to write formal content'
            }
        });
    });

    app.use('/api', router);
};
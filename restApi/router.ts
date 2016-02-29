import * as express from 'express'
import * as axios from 'axios'
import * as Rx from 'rx'

import { OurScalaApiPayload } from './DataModel/Payload'
import { Response, Error } from './DataModel/Http'

const bodyParser = require('body-parser');

let apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
});

module.exports = (app:express.Application, router:express.Router) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    router.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
        // @TODO add logging
        next();
    });

    router.get('/uoi/:id', (req:express.Request, res:express.Response) => {
        const
            id = req.params['id'],
            promise = apiInstance.get('id/' + id);

        Rx.Observable
            .fromPromise(promise)
            .subscribe(response => {
                const data:any = response.data;

                if (data.success) {
                    res.json(data.success);
                } else {
                    const Err = new Error('An error occurred while fetching UoI: ' + id, Response.ServerError, data);

                    res.status(Err.code);
                    res.json(Err.message);
                }
            }, err => {
                res.status(Response.ServerError);
                res.json({error: err});
            });
    });

    app.use('/api', router);
};
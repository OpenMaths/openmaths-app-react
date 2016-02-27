import * as express from 'express'
import * as axios from 'axios'
import * as Rx from 'rx'
import { OurScalaApiPayload } from './DataModel/Payload'
import { Response } from './DataModel/Http'

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

                if (data.error) {
                    res.status(Response.ServerError);
                    res.json(data.error);
                }

                res.json(data.success);
            }, (err) => {
                res.status(Response.ServerError);
                res.json({error: err});
            });
    });

    app.use('/api', router);
};
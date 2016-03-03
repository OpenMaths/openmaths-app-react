import * as axios from 'axios'
import * as crypto from 'crypto'
import * as express from 'express'
import * as Rx from 'rx'

import { GoogleUser } from './DataModel/GoogleApi'
import { OurScalaApiPayload } from './DataModel/Payload'
import { Response, Error } from './DataModel/Http'

const bodyParser = require('body-parser');

let getOMApiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
});

let getGoogleApiInstance = axios.create({
    baseURL: 'https://www.googleapis.com'
});

let csrf:string;

module.exports = (app:express.Application, router:express.Router) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    router.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
        // @TODO add logging
        next();
    });

    router.post('/user/sign-in', (req:express.Request, res:express.Response) => {
        const
            authToken = req.params['authToken'],
            promise = getGoogleApiInstance.get('oauth2/v3/tokeninfo?id_token=' + authToken);

        Rx.Observable
            .fromPromise(promise)
            .subscribe(success => {
                let response = new GoogleUser(success.data);

                csrf = crypto.randomBytes(64).toString('hex');

                response.csrf = csrf;

                res.json(response);
            }, err => {
                const Err = new Error('Invalid Token', Response.Unauthorised, err);

                res.status(Err.code);
                res.json(Err.message);
            });
    });

    router.get('/uoi/:id', (req:express.Request, res:express.Response) => {
        const
            id = req.params['id'],
            promise = getOMApiInstance.get('id/' + id);

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
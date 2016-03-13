import * as axios from 'axios'
import * as cheerio from 'cheerio'
import * as crypto from 'crypto'
import * as express from 'express'
import * as _ from 'lodash'
import * as Rx from 'rx'

import * as API from '../app/Utils/Api'
import * as UoIComponent from '../app/UoI/Components/UoI'

import { GoogleUser } from './DataModel/GoogleApi'
import { OurScalaApiPayload } from './DataModel/Payload'
import { Response, Error } from './DataModel/Http'

const bodyParser = require('body-parser');

interface IWikipediaMappedResponse {
    parseData: API.IWikipediaParseInstanceResponse;
    queryCategoriesData:API.IWikipediaQueryTagsInstanceResponse
}

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
            promise = API.GoogleApiInstance.get('oauth2/v3/tokeninfo?id_token=' + authToken);

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

    router.get('/uoi/wikipedia/:title', (req:express.Request, res:express.Response) => {
        const
            title = req.params['title'],
            promiseParse = API.WikipediaParseInstance(title).get('');

        Rx.Observable
            .fromPromise(promiseParse)
            .map(responseParse => {
                const
                    dataParse = <API.IWikipediaParseInstanceResponse> responseParse.data,
                    promiseQueryCategories = API.WikipediaQueryCategoriesInstance(dataParse.parse.pageid).get('');

                return Rx.Observable
                    .fromPromise(promiseQueryCategories)
                    .map(responseQueryCategories => {
                        const dataQueryCategories = <API.IWikipediaQueryTagsInstanceResponse> responseQueryCategories.data;

                        return {
                            parseData: dataParse,
                            queryCategoriesData: dataQueryCategories
                        }
                    });
            })
            .switch()
            .subscribe((response:IWikipediaMappedResponse) => {
                const
                    parseData = response.parseData,
                    queryCategoriesData = response.queryCategoriesData,
                    categories = queryCategoriesData.query.pages[parseData.parse.pageid].categories;

                let $ = cheerio.load(parseData.parse.text['*']);

                $('.reference').remove();

                $('a').each((i, aElem) => {
                    const link = $(aElem).attr('href');

                    $(aElem)
                        .addClass('expand-uoi')
                        .attr('expand-id', decodeURI(link.replace('/wiki/', 'w:')))
                        .removeAttr('href');
                });

                const content = $('p').slice(0, 2);

                res.json({
                    id: title,
                    title: parseData.parse.title,
                    htmlContent: content.html(),
                    categories: _.map(categories, category => category.title)
                });
            });
    });

    app.use('/api', router);
};
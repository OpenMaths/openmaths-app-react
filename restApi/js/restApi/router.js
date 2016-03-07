"use strict";
var cheerio = require('cheerio');
var crypto = require('crypto');
var _ = require('lodash');
var Rx = require('rx');
var API = require('../app/Utils/Api');
var GoogleApi_1 = require('./DataModel/GoogleApi');
var Http_1 = require('./DataModel/Http');
var bodyParser = require('body-parser');
var csrf;
module.exports = function (app, router) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function (req, res, next) {
        next();
    });
    router.post('/user/sign-in', function (req, res) {
        var authToken = req.params['authToken'], promise = API.GoogleApiInstance.get('oauth2/v3/tokeninfo?id_token=' + authToken);
        Rx.Observable
            .fromPromise(promise)
            .subscribe(function (success) {
            var response = new GoogleApi_1.GoogleUser(success.data);
            csrf = crypto.randomBytes(64).toString('hex');
            response.csrf = csrf;
            res.json(response);
        }, function (err) {
            var Err = new Http_1.Error('Invalid Token', Http_1.Response.Unauthorised, err);
            res.status(Err.code);
            res.json(Err.message);
        });
    });
    router.get('/uoi/wikipedia/:title', function (req, res) {
        var title = req.params['title'], promiseParse = API.WikipediaParseInstance(title).get('');
        Rx.Observable
            .fromPromise(promiseParse)
            .map(function (responseParse) {
            var dataParse = responseParse.data, promiseQueryCategories = API.WikipediaQueryCategoriesInstance(dataParse.parse.pageid).get('');
            return Rx.Observable
                .fromPromise(promiseQueryCategories)
                .map(function (responseQueryCategories) {
                var dataQueryCategories = responseQueryCategories.data;
                return {
                    parseData: dataParse,
                    queryCategoriesData: dataQueryCategories
                };
            });
        })
            .switch()
            .subscribe(function (response) {
            var parseData = response.parseData, queryCategoriesData = response.queryCategoriesData, categories = queryCategoriesData.query.pages[parseData.parse.pageid].categories;
            var $ = cheerio.load(parseData.parse.text['*']);
            $('.reference').remove();
            $('a').each(function (i, aElem) {
                var link = $(aElem).attr('href');
                $(aElem)
                    .addClass('expand-uoi')
                    .attr('expand-id', link.replace('/wiki/', 'w:'))
                    .removeAttr('href');
            });
            var content = $('p').slice(0, 2);
            res.json({
                id: title,
                title: parseData.parse.title,
                htmlContent: content.html(),
                categories: _.map(categories, function (category) { return category.title; })
            });
        });
    });
    app.use('/api', router);
};
//# sourceMappingURL=router.js.map
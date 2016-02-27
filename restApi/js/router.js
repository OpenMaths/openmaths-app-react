"use strict";
var axios = require('axios');
var Rx = require('rx');
var Http_1 = require('./DataModel/Http');
var bodyParser = require('body-parser');
var apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
});
module.exports = function (app, router) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function (req, res, next) {
        next();
    });
    router.get('/uoi/:id', function (req, res) {
        var id = req.params['id'], promise = apiInstance.get('id/' + id);
        Rx.Observable
            .fromPromise(promise)
            .subscribe(function (response) {
            var data = response.data;
            if (data.error) {
                res.status(Http_1.Response.ServerError);
                res.json(data.error);
            }
            res.json(data.success);
        }, function (err) {
            res.status(Http_1.Response.ServerError);
            res.json({ error: err });
        });
    });
    app.use('/api', router);
};
//# sourceMappingURL=router.js.map
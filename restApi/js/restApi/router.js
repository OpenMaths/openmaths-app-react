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
            if (data.success) {
                res.json(data.success);
            }
            else {
                var Err = new Http_1.Error('An error occurred while fetching UoI: ' + id, Http_1.Response.ServerError, data);
                res.status(Err.code);
                res.json(Err.message);
            }
        }, function (err) {
            res.status(Http_1.Response.ServerError);
            res.json({ error: err });
        });
    });
    app.use('/api', router);
};
//# sourceMappingURL=router.js.map
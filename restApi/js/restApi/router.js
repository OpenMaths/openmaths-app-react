"use strict";
var axios = require('axios');
var crypto = require('crypto');
var Rx = require('rx');
var GoogleApi_1 = require('./DataModel/GoogleApi');
var Http_1 = require('./DataModel/Http');
var bodyParser = require('body-parser');
var getOMApiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
});
var getGoogleApiInstance = axios.create({
    baseURL: 'https://www.googleapis.com'
});
var csrf;
module.exports = function (app, router) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function (req, res, next) {
        next();
    });
    router.post('/user/sign-in', function (req, res) {
        var authToken = req.params['authToken'], promise = getGoogleApiInstance.get('oauth2/v3/tokeninfo?id_token=' + authToken);
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
    router.get('/uoi/:id', function (req, res) {
        var id = req.params['id'], promise = getOMApiInstance.get('id/' + id);
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
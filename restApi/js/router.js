"use strict";
var bodyParser = require('body-parser');
module.exports = function (app, router) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function (req, res, next) {
        console.log('Something is happening.');
        next();
    });
    router.get('/', function (req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });
    app.use('/api', router);
};
//# sourceMappingURL=router.js.map
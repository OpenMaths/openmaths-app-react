"use strict";
var bodyParser = require('body-parser');
module.exports = function (app, router) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function (req, res, next) {
        next();
    });
    router.get('/uoi/:id', function (req, res) {
        var id = req.params['id'];
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
//# sourceMappingURL=router.js.map
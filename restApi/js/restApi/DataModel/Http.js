"use strict";
var _ = require('lodash');
(function (Response) {
    Response[Response["OK"] = 200] = "OK";
    Response[Response["Created"] = 201] = "Created";
    Response[Response["Accepted"] = 202] = "Accepted";
    Response[Response["NoContent"] = 204] = "NoContent";
    Response[Response["BadRequest"] = 400] = "BadRequest";
    Response[Response["Unauthorised"] = 401] = "Unauthorised";
    Response[Response["Forbidden"] = 403] = "Forbidden";
    Response[Response["NotFound"] = 404] = "NotFound";
    Response[Response["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Response[Response["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    Response[Response["ServerError"] = 500] = "ServerError";
    Response[Response["NotImplemented"] = 501] = "NotImplemented";
    Response[Response["BadGateway"] = 502] = "BadGateway";
})(exports.Response || (exports.Response = {}));
var Response = exports.Response;
var Error = (function () {
    function Error(message, code, errorData) {
        this.message = message;
        this.code = _.isUndefined(code) ? Response.ServerError : code;
        if (errorData) {
            console.log(errorData);
            if (errorData.error)
                this.message = errorData.error;
        }
    }
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=Http.js.map
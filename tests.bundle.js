Function.prototype.bind = require("function-bind");

var context = require.context('./src', true, /.+\.spec\.tsx?$/);
context.keys().forEach(context);
module.exports = context;
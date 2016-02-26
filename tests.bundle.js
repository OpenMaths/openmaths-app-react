Function.prototype.bind = require('function-bind');

var context = require.context('./app', true, /.+\.spec\.tsx?$/);
context.keys().forEach(context);
module.exports = context;
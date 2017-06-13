const mixinDeep = require('mixin-deep');
const globalApp = global.Application;
const libApp = require("sf-core/application");
var combinedApp = mixinDeep({}, globalApp, libApp);

module.exports = exports = combinedApp;
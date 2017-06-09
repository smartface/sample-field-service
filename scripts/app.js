/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");

Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

require("sf-extension-alert");
require("timers-smf");
require("./lib/mcs");

Router.add("pgEntry", require("./pages/pgEntry"));
Router.add("pgNotification", require("./pages/pgNotification"));
Router.add("pgLogin", require("./pages/pgLogin"));
Router.add("pgDashboard", require("./pages/pgDashboard"));
Router.add("pgCustomerFilter", require("./pages/pgCustomerFilter"));


Router.go("pgLogin");
var sliderDrawer = require("./sliderDrawer");
Router.sliderDrawer = sliderDrawer;

// Router.add("test", require("./ui/ui_newPage001"));
// Router.go("test");



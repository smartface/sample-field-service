/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e) {
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

Router.go("pgLogin");
//Router.go("pgEntry", true);
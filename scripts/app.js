/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");

Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

const Router = require("sf-core/ui/router");
const System = require("sf-core/device/system");

const stylerBuilder = require("library/styler-builder");
const settings = require("./settings.json");
stylerBuilder.registerThemes(settings.config.theme.themes || "Defaults");
stylerBuilder.setActiveTheme(settings.config.theme.currentTheme);
require("sf-extension-utils");
require("./lib/mcs");

var sliderDrawer;

if (System.OS === "iOS") {
    sliderDrawer = require("./sliderDrawer");
    Router.sliderDrawer = sliderDrawer;
}

Router.add("pgEntry", require("./pages/pgEntry"));
Router.add("pgNotification", require("./pages/pgNotification"));
Router.add("pgLogin", require("./pages/pgLogin"));
Router.add("pgDashboard", require("./pages/pgDashboard"));
Router.add("pgCustomerFilter", require("./pages/pgCustomerFilter"));
Router.add("pgCustomers", require("./pages/pgCustomers"));
Router.add("pgCustomerDetails", require("./pages/pgCustomerDetails"));
Router.add("pgNewCustomer", require("./pages/pgNewCustomer"));
Router.add("pgSettings", require("./pages/pgSettings"));
Router.add("pgNotes", require("./pages/pgNotes"));
Router.add("pgNoteContent", require("./pages/pgNoteContent"));

// Router.add("jet1", require("sf-extension-oracle-jet/samples/samplePage"));
// Router.add("jet2", require("sf-extension-oracle-jet/samples/samplePageWithOfficalCharts"));
// Router.go("jet1");

Router.go("pgLogin", {
    checkUpdate: true
});


if (System.OS === "Android") {
    sliderDrawer = require("./sliderDrawer");
    Router.sliderDrawer = sliderDrawer;
}

// Router.add("test", require("./ui/ui_newPage001"));
// Router.go("test");

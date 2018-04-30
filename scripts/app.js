require("./theme");

/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");

const Fabric = require("sf-plugin-fabric");   
const Crashlytics = require("sf-plugin-fabric/crashlytics");
const Answers = require("sf-plugin-fabric/answers");

Fabric.with([new Crashlytics(),new Answers()]);

const InstaBug = require("sf-plugin-instabug");
InstaBug.build("cf6c0304e43235fd5b5b1d6d97a7b7e5",InstaBug.InvocationEvent.SHAKE);
InstaBug.showIntroMessage();

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
stylerBuilder.registerThemes(settings.config.theme.themes || "defaultTheme");
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
Router.add("pgNewCustomer", require("./pages/pgNewCustomer"), true);
Router.add("pgSettings", require("./pages/pgSettings"));
Router.add("pgNotes", require("./pages/pgNotes"));
Router.add("pgNoteContent", require("./pages/pgNoteContent"));
Router.add("pgSelectMap", require("./pages/pgSelectMap"));

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


require("./theme");
/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");

const Fabric = require("sf-plugin-fabric");

const Crashlytics = require("sf-plugin-fabric/crashlytics");

const Answers = require("sf-plugin-fabric/answers");

Fabric.with([new Crashlytics(), new Answers()]);

const InstaBug = require("sf-plugin-instabug");
InstaBug.build("cf6c0304e43235fd5b5b1d6d97a7b7e5", InstaBug.InvocationEvent.SHAKE);
InstaBug.showIntroMessage();

Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

const stylerBuilder = require("library/styler-builder");

const settings = require("./settings.json");

stylerBuilder.registerThemes(settings.config.theme.themes || "defaultTheme");
stylerBuilder.setActiveTheme(settings.config.theme.currentTheme);

require("sf-extension-utils");

require("./lib/mcs");

require("./router/index");




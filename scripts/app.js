/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const SliderDrawer = require('sf-core/ui/sliderdrawer');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const UISliderDrawer = require("./components/SliderDrawer"); //require("./lib/ui").SliderDrawer;
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

Router.go("pgLogin");

// Router.add("test", require("./ui/ui_newPage001"));
// Router.go("test");
var sliderDrawerWidth = 333;
var sliderDrawer = new SliderDrawer({
    width: sliderDrawerWidth,
    enabled: false,
    onLoad: function() {
        sliderDrawer.layout.backgroundColor = Color.createGradient({
            direction: Color.GradientDirection.HORIZONTAL,
            startColor: Color.create("#06BEBD"),
            endColor: Color.create("#7CC981")
        });
        var uiSliderDrawer = new UISliderDrawer({
            width: sliderDrawerWidth,
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: Color.TRANSPARENT,
            visible: true,
            positionType: FlexLayout.PositionType.ABSOLUTE
        });
        sliderDrawer.layout.addChild(uiSliderDrawer);
        sliderDrawer.onHide = function sliderDrawer_onHide() {
            uiSliderDrawer.whenHide();
        };
    },

});
sliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
Router.sliderDrawer = sliderDrawer;

Object.defineProperty(global, "sliderDrawerEnabled", {
    enumerable: true,
    configurable: true,
    get: function() {
        return sliderDrawer.enabled;
    },
    set: function(value) {
        return sliderDrawer.enabled = value;
    }
});

const sliderDrawer = require("../../sliderDrawer");
const System = require('sf-core/device/system');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Router = require("sf-core/ui/router");
const Image = require('sf-core/ui/image');
const Color = require('sf-core/ui/color');

module.exports = applyDefaultBackAction;

function applyDefaultBackAction(page, backAction) {
    sliderDrawer.enabled = false;
    page.headerBar.leftItemEnabled = true;
    var backPageName = "";
    if (typeof backAction === "string") {
        backPageName = backAction;
        backAction = defaultGoBack.bind(page, backPageName);
    }
    else {
        backAction = backAction || defaultGoBack.bind(page);
    }
    if (System.OS === "iOS") { //default android will do the trick;
        var leftItem = new HeaderBarItem({
            title: "",
            onPress: function() {
                backAction();
            },
            image: Image.createFromFile("images://back.png"),
            color: Color.WHITE
        });
        page.headerBar.setLeftItem(leftItem);
    }
    if (!page.android.onBackButtonPressed) {
        page.android.onBackButtonPressed = function() {
            backAction();
        };
    }
}

function defaultGoBack(pageName) {
    if (!pageName) {
        Router.goBack();
    } else {
        Router.goBack(pageName);
    }
}

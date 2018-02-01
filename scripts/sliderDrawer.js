const SliderDrawer = require('sf-core/ui/sliderdrawer');
const UISliderDrawer = require("./components/SliderDrawer");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');
const mapProperties = require("./lib/map-properties");
const userData = require("./model/user");
const theme = require("./lib/theme");

var sliderDrawerWidth = 333;
var sliderDrawer = new SliderDrawer({
    width: sliderDrawerWidth,
    enabled: false,
    onLoad: function() {
        var uiSliderDrawer = new UISliderDrawer();
        uiSliderDrawer.dispatch({
            type: "updateUserStyle",
            userStyle: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0)",
                visible: true,
                positionType: "ABSOLUTE"
            }
        });
        this.moveHighlight = uiSliderDrawer.moveHighlight;
        sliderDrawer.layout.addChild(uiSliderDrawer);
        sliderDrawer.onHide = function sliderDrawer_onHide() {
            uiSliderDrawer.whenHide();
            sliderDrawer.shown = false;
            // sliderDrawer.backgroundColor = Color.createGradient({
            //     direction: Color.GradientDirection.HORIZONTAL,
            //     startColor: Color.create("#06BEBD"),
            //     endColor: Color.create("#7CC981")
            // });
        };
        sliderDrawer.onShow = function sliderDrawer_onShow() {
            sliderDrawer.shown = true;
            // sliderDrawer.backgroundColor = Color.createGradient({
            //     direction: Color.GradientDirection.HORIZONTAL,
            //     startColor: Color.create("#382B53"),
            //     endColor: Color.create("#4E4168")
            // });
        };
        sliderDrawer.shown = false;
        sliderDrawer.children = sliderDrawer.children || {};
        sliderDrawer.children.content = uiSliderDrawer;
        mapProperties(sliderDrawer, uiSliderDrawer, ["lblUserName", "lblTitle", "imgUserPicture"]);

        sliderDrawer.setUserData = function sliderDrawerSetUserData() {
            console.log(userData.currentUser + "  is our data ");
            if (userData.currentUser) {
                console.log("in set user data" + userData.currentUser.firstName);
                var userFullName = userData.currentUser.firstName + " " + userData.currentUser.lastName;
                console.log("User full name  " + userFullName);
                sliderDrawer.lblUserName.text = userFullName;
                //TODO: use title instead of email
                sliderDrawer.lblTitle.text = userData.currentUser.email;
            }
        };
        sliderDrawer.setUserData();
        sliderDrawer.applyTheme();

    },
    onShow: function() {
        console.log("sliderDrawer is shown");
    }
});
sliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
module.exports = exports = sliderDrawer;
sliderDrawer.moveHighlight = function() {};
sliderDrawer.setUserData = function() {};


sliderDrawer.applyTheme = function sliderDrawer_applyTheme() {
    var selectedTheme = theme[theme.selected];
    //console.log("theme is " + selectedTheme.sliderDrawer.nativeObject);
    sliderDrawer.layout.backgroundColor = selectedTheme.sliderDrawer;
    sliderDrawer.children.content.flHighlight.backgroundColor = selectedTheme.highlight;
};


sliderDrawer.setLeftItem = function setLeftItem(headerBar, force) {
    if (headerBar.leftItemSetBy === sliderDrawer && !force)
        return; //already set
    headerBar.leftItemSetBy = sliderDrawer;
    headerBar.leftItemEnabled = true;
    var sliderDrawerItem = new HeaderBarItem({
        image: Image.createFromFile("images://sliderdrawer.png"),
        color: Color.WHITE,
        onPress: function() {
            if (sliderDrawer.shown)
                sliderDrawer.hide();
            else
                sliderDrawer.show();
        }
    });
    headerBar.setLeftItem(sliderDrawerItem);
    headerBar.leftItem = sliderDrawerItem;
    sliderDrawer.enabled = true;
};

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
        var uiSliderDrawer = new UISliderDrawer({
            width: sliderDrawerWidth,
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: Color.TRANSPARENT,
            visible: true,
            positionType: FlexLayout.PositionType.ABSOLUTE
        });
        this.moveHighlight = uiSliderDrawer.moveHighlight;
        sliderDrawer.layout.addChild(uiSliderDrawer);
        sliderDrawer.onHide = function sliderDrawer_onHide() {
            uiSliderDrawer.whenHide();
            sliderDrawer.shown = false;
        };
        sliderDrawer.onShow = function sliderDrawer_onShow() {
            sliderDrawer.shown = true;
        };
        sliderDrawer.shown = false;
        sliderDrawer.children = sliderDrawer.children || {};
        sliderDrawer.children.content = uiSliderDrawer;
        mapProperties(sliderDrawer, uiSliderDrawer, ["lblUserName", "lblTitle", "imgUserPicture"]);

        sliderDrawer.setUserData = function sliderDrawerSetUserData() {
            if (userData.currentUser) {
                var userFullName = userData.currentUser.firstName + " " + userData.currentUser.lastName;
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

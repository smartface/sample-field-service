const SliderDrawer = require('sf-core/ui/sliderdrawer');
const UISliderDrawer = require("./components/SliderDrawer");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');

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
            sliderDrawer.shown = false;
        };
        sliderDrawer.onShow = function sliderDrawer_onShow() {
            sliderDrawer.shown = true;
        };
        sliderDrawer.shown = false;
        sliderDrawer.children = sliderDrawer.children || {};
        sliderDrawer.children.content = uiSliderDrawer;
    },

});
sliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
module.exports = exports = sliderDrawer;

sliderDrawer.setLeftItem = function setLeftItem(headerBar, force) {
    if (headerBar.leftItemSetBy === sliderDrawer && !force)
        return; //already set
    headerBar.leftItemSetBy = sliderDrawer;
    headerBar.leftItemEnabled = true;
    var sliderDrawerItem = new HeaderBarItem({
        image: Image.createFromFile("images://sliderdrawer.png"),
        title: "",
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
};

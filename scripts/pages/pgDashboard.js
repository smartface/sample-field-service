/*globals lang*/
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgDashboardDesign = require("../ui/ui_pgDashboard");
const sliderDrawer = require("../sliderDrawer");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');

const pgDashboard = extend(pgDashboardDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            page.headerBar.title = lang.dashboard;
            sliderDrawer.setLeftItem(page.headerBar);
            page.onBackButtonPressed = function(e) {
                Router.goBack("pgLogin");
            };
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            sliderDrawer.enabled = true;
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
        };





    });



module && (module.exports = pgDashboard);

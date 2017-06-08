/*globals lang*/
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgDashboardDesign = require("../ui/ui_pgDashboard");
const sliderDrawer = require("../sliderDrawer");

const pgDashboard = extend(pgDashboardDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            sliderDrawer.setLeftItem(page.headerBar);
            page.headerBar.title = lang.dashboard;
            page.onBackButtonPressed = function(e) {
                Router.goBack("pgLogin");
            };

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
        };





    });



module && (module.exports = pgDashboard);

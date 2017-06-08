const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const mcs = require("../lib/mcs");
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
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
        };




    });



module && (module.exports = pgDashboard);

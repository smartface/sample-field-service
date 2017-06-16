/*globals lang*/
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgDashboardDesign = require("../ui/ui_pgDashboard");
const sliderDrawer = require("../sliderDrawer");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const theme = require("../lib/theme");
const user = require("../lib/user");

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
            page.android.onBackButtonPressed = function(e) {
                user.logOut();
            };
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            sliderDrawer.enabled = true;
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();
            sliderDrawer.moveHighlight(0);
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.imgReports.image = selectedTheme.reportImage;
            page.layout.backgroundColor = selectedTheme.dashboardColor;
        }





    });



module && (module.exports = pgDashboard);

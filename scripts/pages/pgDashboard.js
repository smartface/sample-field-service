/*globals lang*/
const extend = require("js-base/core/extend");
const pgDashboardDesign = require("../ui/ui_pgDashboard");
const sliderDrawer = require("../sliderDrawer");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const theme = require("../lib/theme");
const user = require("../lib/user");
const JET = require('sf-extension-oracle-jet');
const FlexLayout = require('sf-core/ui/flexlayout');
const Font = require('sf-core/ui/font');
const TextView = require('sf-core/ui/textview');
const WebView = require('sf-core/ui/webview');
const UI = require('sf-core/ui');
const Image = require('sf-core/ui/image');
const Color = require('sf-core/ui/color');

var labelFont = Font.create(Font.DEFAULT, 16, Font.BOLD);
var webViewHeight = 375;
var webViewMargin = 5;
var labelHeigth = 50;
var labelWidth = 150;
var viewMargin = 10;
var oneChartHeight = webViewHeight + (2 * webViewMargin) + labelHeigth + (2 * viewMargin);


const pgDashboard = extend(pgDashboardDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;

            var myItem = new UI.HeaderBarItem({
                image: Image.createFromFile("images://notify.png"),
                color: Color.WHITE,
                onPress: function() {
                    alert("Announcements!");
                    myItem.badge.setVisible(false);
                }
            });
            myItem.badge.setText(1);
            myItem.badge.move(0, 5);
            myItem.badge.font = Font.create("Arial", 10);
            myItem.badge.setVisible(true);

            this.headerBar.setItems([myItem]);

            sliderDrawer.setLeftItem(page.headerBar);
            page.android.onBackButtonPressed = function(e) {
                user.logOut();
            };
            var selectedTheme = theme[theme.selected];
            var charts = [{
                title: lang.agingReport,
                jetData: {
                    series: [{
                        name: lang.closed,
                        items: [1],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: lang.assigned,
                        items: [1],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: lang.progress,
                        items: [6],
                        color: selectedTheme.chartColors[2]
                    }],
                    styleDefaults: {
                        pieInnerRadius: 0.5,
                    },
                    type: JET.Type.PIE,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.OFF,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO,
                },
            }, {
                title: lang.historyByStatus,
                jetData: {
                    series: [{
                        name: lang.closed,
                        items: [1, 3, 4, 2, 3, 4],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: lang.assigned,
                        items: [2, 3, 6, 4, 3, 4],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: lang.progress,
                        items: [0, 0, 1, 0, 0, 3],
                        color: selectedTheme.chartColors[2]
                    }],
                    groups: [lang.oct, lang.dec, lang.feb, lang.apr, lang.jun, lang.aug],
                    type: JET.Type.BAR,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.ON,
                    hoverBehavior: JET.HoverBehavior.DIM,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO
                }
            }, {
                title: lang.historyByProduct,
                jetData: {
                    series: [{
                        name: "Abc",
                        items: [0, 0, 2, 4, 0, 4],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: "FridgeCare",
                        items: [2, 2, 0, 1, 0, 0],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: "Nordica",
                        items: [0, 8, 4, 4, 2, 0],
                        color: selectedTheme.chartColors[2]
                    }, {
                        name: "Microwave",
                        items: [0, 6, 2, 3, 0, 1],
                        color: selectedTheme.chartColors[3]
                    }, {
                        name: "DishWaze",
                        items: [2, 2, 0, 1, 2, 1],
                        color: selectedTheme.chartColors[4]
                    }],
                    groups: [lang.oct, lang.dec, lang.feb, lang.apr, lang.jun, lang.aug],
                    type: JET.Type.LINE,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.ON,
                    hoverBehavior: JET.HoverBehavior.DIM,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO
                }
            }];

            var svChart = page.svChart;
            charts.forEach(function(element) {
                svChart.layout.addChild(generateChartTemplate(element.jetData, element.title, element.url));
            });

            svChart.layout.height = (svChart.layout.getChildCount()) * oneChartHeight;
            // myScrollView.layout.justifyContent = FlexLayout.JustifyContent.SPACE_AROUND;
            svChart.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            sliderDrawer.enabled = true;
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();
            sliderDrawer.moveHighlight(0);
            page.headerBar.title = lang.dashboard;


            sliderDrawer.onShow = function() {
                page.svChart.touchEnabled = false;
            }

            sliderDrawer.onHide = function() {
                page.svChart.touchEnabled = true;
            }


        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;
            //page.imgReports.image = selectedTheme.reportImage;
            page.layout.backgroundColor = selectedTheme.dashboardColor;
        }

    });

function generateChartTemplate(jetData, labelText, chartUrl) {
    var layout = new FlexLayout({
        margin: viewMargin,
        height: webViewHeight + (2 * webViewMargin) + labelHeigth
    });

    var labelArea = new TextView({
        height: labelHeigth,
        width: labelWidth,
        font: labelFont,
        text: labelText
    });
    var webView = new WebView({
        height: webViewHeight,
        margin: webViewMargin,
        alignSelf: FlexLayout.AlignSelf.STRETCH,
        touchEnabled: false
    });

    var jet = new JET({
        jetPath: "assets://jet/",
        webView: webView
    });
    // jet.plotArea.backgroundColor = "#FF0000";
    // jet.legend.backgroundColor = "#FFFFFF";
    jet.jetData.backgroundColor = "#FFFFFF";


    Object.assign(jet, jetData);
    layout.addChild(labelArea);
    layout.addChild(webView);
    return layout;
}

module && (module.exports = pgDashboard);

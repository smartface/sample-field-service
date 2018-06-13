/*globals lang*/
const extend = require("js-base/core/extend");
const ScrollView = require("sf-core/ui/scrollview");
const pgNotificationDesign = require("../ui/ui_pgNotification");
const FlexLayout = require("sf-core/ui/flexlayout");
const Color = require("sf-core/ui/color");
const NotificationRow = require("../lib/ui").NotificationRow;
const sliderDrawer = require("../sliderDrawer");
const Router = require("sf-core/ui/router");
const backAction = require("../lib/ui").backAction;
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const theme = require("../lib/theme");
const notifications = require("../model/notifications");
const initTime = require("../lib/init-time");

const pgNotification = extend(pgNotificationDesign)(
    function(_super) {
        const page = this;
        _super(this);
        const baseOnLoad = page.onLoad;
        const baseOnShow = page.onShow;

        var flNotifications;

        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;

            // page.ios.onSafeAreaPaddingChange = function(paddingObject) {

            //     paddingObject.bottom = 50;
            //     console.log("padding is  " + paddingObject.left);

            //     return paddingObject;
            // };

            sliderDrawer.setLeftItem(page.headerBar);
            page.svNotifications = new ScrollView({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                align: ScrollView.Align.VERTICAL,
                backgroundColor: Color.TRANSPARENT,
                positionType: FlexLayout.PositionType.ABSOLUTE
            });
            page.layout.addChild(page.svNotifications);

            if (page.svNotifications.layout)
                flNotifications = page.svNotifications.layout;
            else {
                flNotifications = new FlexLayout({
                    left: 0,
                    right: 0,
                    height: 0,
                    align: ScrollView.Align.VERTICAL,
                    backgroundColor: Color.TRANSPARENT,
                });
                page.svNotifications.addChild(flNotifications);
            }
            page.android.onBackButtonPressed = function(e) {
                Router.goBack("pgDashboard");
            };
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow();

            if (data.from === "sliderDrawer") {
                sliderDrawer.setLeftItem(page.headerBar);
                sliderDrawer.enabled = true;
                page.aiWait.visible = true;
                setTimeout(function() {
                    notifications.getNotifications(function(err, notificationsData) {
                        console.log("after getting notifications. Is there error? " + !!err);
                        if (err) {
                            return alert(JSON.stringify(err), "Notifications Service Error");
                        }
                        notificationsData && loadData(notificationsData);
                        page.aiWait.visible = false;
                    });
                }, initTime);
            }
            else {
                backAction(page);
            }
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();
            page.headerBar.title = lang.notificationHistory;

            sliderDrawer.onShow = function() {
                page.svNotifications.touchEnabled = false;
            }

            sliderDrawer.onHide = function() {
                page.svNotifications.touchEnabled = true;
            }
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;
            page.aiWait.color = selectedTheme.topBarColor;
        }

        function loadData(notificationsData) {
            if (!flNotifications)
                return;

            // var colors = [
            //     Color.create("#FF5733"),
            //     Color.create("#A8CD1B"),
            //     Color.create("#74AFAD"),
            //     Color.create("#F5F3EE"),
            //     Color.create("#DF3D82"),
            // ];

            // var date = [
            //     randomDate(new Date(2017, 5, 1), new Date()),
            //     randomDate(new Date(2017, 5, 1), new Date()),
            //     randomDate(new Date(2017, 5, 1), new Date()),
            //     randomDate(new Date(2017, 5, 1), new Date()),
            //     randomDate(new Date(2017, 5, 1), new Date()),
            // ];

            // function randomDate(start, end) {
            //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            // }


            var items = notificationsData.items;
            var height = 0;
            for (var i = 0; i < items.length; i++) {
                var notificationRow = new NotificationRow();
                Object.assign(notificationRow, {
                    left: 0,
                    right: 0,
                    flexLayout: FlexLayout.PositionType.RELATIVE,
                    date: items[i].createdTime,
                    title: items[i].primaryContact.name,
                    text: items[i].category.lookupName
                });

                flNotifications.addChild(notificationRow);
                //EBTEMPORARY
                //NotificationRow Height comes as 0
                height += 200;
                //height += 250;

            }
            flNotifications.height = height;
            flNotifications.applyLayout();
        }
    });



module && (module.exports = pgNotification);

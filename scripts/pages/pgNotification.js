const extend = require("js-base/core/extend");
const ScrollView = require("sf-core/ui/scrollview");
const pgNotificationDesign = require("../ui/ui_pgNotification");
const FlexLayout = require("sf-core/ui/flexlayout");
const Color = require("sf-core/ui/color");
const NotificationRow = require("../lib/ui").NotificationRow;
const sliderDrawer = require("../sliderDrawer");

const pgNotification = extend(pgNotificationDesign)(
    function(_super) {
        const page = this;
        _super(this);
        const baseOnLoad = page.onLoad;
        const baseOnShow = page.onShow;
        var flNotifications;

        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            sliderDrawer.setLeftItem(page.headerBar);

            var svNotifications = new ScrollView({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                align: ScrollView.Align.VERTICAL,
                backgroundColor: Color.TRANSPARENT,
                positionType: FlexLayout.PositionType.ABSOLUTE
            });
            page.layout.addChild(svNotifications);

            flNotifications = new FlexLayout({
                left: 0,
                right: 0,
                height: 0,
                align: ScrollView.Align.VERTICAL,
                backgroundColor: Color.TRANSPARENT,
            });
            svNotifications.addChild(flNotifications);


        };

        page.onShow = function onShow(notificationsData) {
            baseOnShow && baseOnShow(notificationsData);
            notificationsData && loadData(notificationsData);
        };



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
                    // height: 200,
                    // backgroundColor: colors[i],
                    date: items[i].createdTime,
                    title: items[i].primaryContact.name,
                    text: items[i].category.lookupName
                });
                flNotifications.addChild(notificationRow);
                height += notificationRow.height;
            }
            flNotifications.height = height;
        }


    });



module && (module.exports = pgNotification);

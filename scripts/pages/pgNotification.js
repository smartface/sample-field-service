const extend = require("js-base/core/extend");
const ScrollView = require("sf-core/ui/scrollview");
const pgNotificationDesign = require("../ui/ui_pgNotification");
const FlexLayout = require("sf-core/ui/flexlayout");
const Color = require("sf-core/ui/color");
const NotificationRow = require("../lib/ui/").NotificationRow;

const pgNotification = extend(pgNotificationDesign)(
    function(_super) {
        const page = this;
        _super(this);
        const baseOnLoad = page.onLoad;
        const baseOnShow = page.onShow;

        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            page.headerBar.leftItemEnabled = false;

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

            var flNotifications = new FlexLayout({
                left: 0,
                right: 0,
                // width: 750,
                // top: 0,
                height: 1000,
                align: ScrollView.Align.VERTICAL,
                backgroundColor: Color.TRANSPARENT,
            });
            svNotifications.addChild(flNotifications);
            
            for(var i = 0; i < 5; i++) {
                var notificationRow = new NotificationRow();
                flNotifications.addChild(notificationRow);
            }
            
            
            
            
        };

        page.onShow = function onShow(notificationsData) {
            baseOnShow && baseOnShow(notificationsData);
            notificationsData && loadData(notificationsData);
        };



        function loadData(notificationsData) {

        }


    });



module && (module.exports = pgNotification);

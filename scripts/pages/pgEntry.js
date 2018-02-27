const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const notifications = require("../model/notifications");
const mcs = require("../lib/mcs");
const pgEntryDesign = require("../ui/ui_pgEntry");

const pgEntry = extend(pgEntryDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            console.log("before login");
            mcs.login({
                username: "fieldservice",
                password: "123qweASD"
            }, function(err, result) {
                console.log("after login. Is there error? " + !!err);
                if (err) {
                    return alert("LOGIN FAILED.  " + err, "MCS Login Error");
                }
                proceedNotifications();

            });

            function proceedNotifications() {
                console.log("before getting notifications");
                notifications.getNotifications(function(err, notificationsData) {
                    console.log("after getting notifications. Is there error? " + !!err);
                    if (err) {
                        return alert(JSON.stringify(err), "Notifications Service Error");
                    }

                    Router.go("pgNotification", notificationsData);
                });
            }
        };




    });



module && (module.exports = pgEntry);

/* globals lang */
module.exports.logOut = logOut;
const AlertView = require('sf-core/ui/alertview');
const mcs = require("../lib/mcs");
const Router = require("../router/index");
const userData = require("../model/user");

function logOut(callback) {
    alert({
        message: lang.signOutMessage,
        title: lang.signOutTitle,
        buttons: [{
            type: AlertView.Android.ButtonType.NEGATIVE,
            text: lang.yes,
            onClick: function() {
                userData.currentUser = null;
                callback && callback(null, true);
                mcs.logout();
                Router.goBack("pgLogin");
            }
        }, {
            type: AlertView.Android.ButtonType.POSITIVE,
            text: lang.no,
            onClick: function() {
                callback && callback(null, false);
            }
        }]
    });
}

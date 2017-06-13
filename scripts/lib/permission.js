/*globals lang */
const System = require('sf-core/device/system');
const Application = global.Application;
var lastRequestPermissionCode = 2000;
var permissionRequestMap = {};
const AlertView = require('sf-core/ui/alertview');
exports.checkPermission = function checkPermission(permissions, rationaleDisplay, callback) {
    if (System.OS === "iOS") { //hardcoded logic for iOS to pass
        callback(null);
    }

    if (!(permissions instanceof Array)) permissions = [permissions];
    if (!callback) {
        callback = rationaleDisplay;
        rationaleDisplay = null;
    }

    var i, p, rationalsToShow = [];
    for (i = permissions.length - 1; i > -1; i--) {
        p = permissions[i];
        if (typeof p !== "string") {
            throw Error(String(p) + " is not a valid permission");
        }
        p = permissions[i] = p.toUpperCase();
        if (Application.checkPermission(p)) {
            permissions.splice(i, 1);
        }
        if (Application.shouldShowRequestPermissionRationale(p)) {
            rationalsToShow.push(p);
        }
    }
    if (permissions.length === 0) {
        callback(null); //all granted
        return;
    }

    if (rationalsToShow.length > 0) {
        if (rationaleDisplay) {
            rationaleDisplay(rationalsToShow, rationalDisplayCallback);
        }
        else {
            displayRationale(rationalsToShow, rationalDisplayCallback);
        }
    }
    else
        rationalDisplayCallback(null);

    function rationalDisplayCallback(err) {
        if (err) {
            callback(err);
        }
        else {
            continueRequestPermissions();
        }
    }

    function continueRequestPermissions() {
        var requestPermissionCode = lastRequestPermissionCode++;
        permissionRequestMap[requestPermissionCode] = {
            requestPermissionCode: requestPermissionCode,
            result: function(e) {
                var allPassed = true,
                    i, result = {},
                    keys = Object.keys(e.results);
                //Using keys for bypassing AND-2351
                for (i = 0; i < keys.length; i++) {
                    allPassed = allPassed && e.results[i];
                    result[e.requestedPermissions[i]] = e.results[i];
                }
                callback(
                    allPassed ? null : "there are failed permissions",
                    result
                );
            }
        };
        var checkPermissionArguments = [requestPermissionCode].concat(permissions);
        Application.requestPermissions.apply(Application, checkPermissionArguments);
    }

};

function displayRationale(permissions, callback) {
    alert({
        title: lang.permissionRequiredTitle || "Permissions required",
        message: lang.permissionRequiredMessage || "In order to application to work properly following permissions are to be granted:\n" +
            permissions.join(",\n"),
        buttons: [{
            text: "OK",
            onClick: function() {
                callback(null);
            },
            index: AlertView.ButtonType.POSITIVE,
        }, {
            text: "Cancel",
            onClick: function() {
                callback("user cancelled permission rationale displayed");
            },
            index: AlertView.ButtonType.NEGATIVE,
        }]
    });
}

Application.onRequestPermissionsResult = function onRequestPermissionsResult(e) {
    permissionRequestMap[e.requestCode].result(e);
};

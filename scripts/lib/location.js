const Location = require('sf-core/device/location');
const Application = require('sf-core/application');
const permission = require("./permission");
const System = require('sf-core/device/system');

var capturedLocation = false,
    pendingLocationRequests = [];

Location.onLocationChanged = function(location) {
    console.log("onLocationChanged");
    if (capturedLocation)
        return;
    console.log("capturedLocation");
    capturedLocation = true;
    Location.stop();
    pendingLocationRequests.forEach(request => request(location));
    pendingLocationRequests.length = 0;
    capturedLocation = false;
};

exports.getLocation = getLocation;

function getLocation(callback) {
    if (!callback)
        return;
    if (System.OS === 'iOS') {
        getLocationAction();
    }
    else {
        permission.checkPermission(Application.android.Permissions.ACCESS_FINE_LOCATION,
            function(err) {
                if (err) return callback(err);
                getLocationAction();
            });
    }

    function getLocationAction() {
        pendingLocationRequests.push(function(location) {
            console.log("pending location request called");
            callback(null, location);
        });
        Location.start(Location.android.Provider.AUTO);
        console.log("started location");
    }
}

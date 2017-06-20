/* globals lang */
const Application = require("sf-core/application");
const AlertView = require('sf-core/ui/alertview');
const Network = require('sf-core/device/network');
const permission = require("./permission");
const skipErrList = ["channel not found", "No update"];
const System = require('sf-core/device/system');
const app = {
    checkUpdate: Application.checkUpdate ? Application.checkUpdate : global.Application.checkUpdate
};

function checkUpdate(options) {
    options = options || {};

    if (Network.connectionType === Network.ConnectionType.None) {
        if (!options.silent)
            alert(lang.noInternetMessage || "No Internet Connection",
                lang.noInternetTitle || "Cannot Connect");
        return;
    }

    //Checks if there is a valid update. If yes returns result object.    
    app.checkUpdate(function(err, result) {
        if (err) {
            if (typeof err === "object") {
                try {
                    err = JSON.stringify(err, null, "\t");
                }
                finally {

                }
            }
            if (skipErrList.indexOf(err) === -1)
                alert((lang.updateFail || "Update failed") + ": " + err);
        }
        else {
            //Update check is successful. We can show the meta info to inform our app user.
            result.meta = result.meta || {};
            var isMandatory = (result.meta.isMandatory && result.meta.isMandatory === true) ? true : false;
            var updateTitle = (result.meta.title) ? result.meta.title : (lang.newVersionAvailable || 'A new update is ready!');
            var updateMessage = (lang.version + "Version") + " " + result.newVersion + " " + (lang.isReadyToInstall || "isReadyToInstall") + ".\n\n";
            updateMessage += (isMandatory) ? (lang.updateMandatory || "This update is mandatory!") :
                (lang.updateOptional || "Do you want to update?");

            if (options.silent) {
                startUpdate();
            }
            else {
                if (isMandatory) {
                    alert({
                        title: updateTitle,
                        message: updateMessage,
                        buttons: [{
                            text: lang.updateNow || "Update now",
                            onClick: startUpdate,
                            index: AlertView.Android.ButtonType.POSITIVE
                        }]

                    });
                }
                else {
                    alert({
                        title: updateTitle,
                        message: updateMessage,
                        buttons: [{
                            text: lang.updateNow || "Update now",
                            onClick: startUpdate,
                            index: AlertView.Android.ButtonType.POSITIVE
                        }, {
                            text: lang.later || "Later",
                            onClick: doNothing,
                            index: AlertView.Android.ButtonType.NEUTRAL
                        }]
                    });
                }
            }
        }


        function startUpdate() {
            if (System.OS === "iOS") {
                performUpdate();
            }
            else {
                permission.checkPermission(Application.android.Permissions.WRITE_EXTERNAL_STORAGE, function() {
                    performUpdate();
                });
            }

        }

        function performUpdate() {
            var updateProgressAlert = alert({
                message: lang.updateIsInProgress || "Update is in progress",
                buttons: []
            });
            if (result.meta.redirectURL && result.meta.redirectURL.length != 0) {
                //RAU wants us to open a URL, most probably core/player updated and binary changed.
                Application.call(result.meta.redirectURL);
            }
            else {
                //There is an update waiting to be downloaded. Let's download it.
                result.download(function(err, result) {
                    if (err) {
                        //Download failed
                        handleError(err);
                    }
                    else {
                        //All files are received, we'll trigger an update.
                        result.updateAll(function(err) {
                            if (err) {
                                //Updating the app with downloaded files failed
                                handleError(err);
                            }
                            else {
                                //After that the app will be restarted automatically to apply the new updates
                                Application.restart();
                            }
                        });
                    }
                });
            }

            function handleError(err) {
                if (typeof err === "object") {
                    try {
                        err = JSON.stringify(err, null, "\t");
                    }
                    finally {

                    }
                }
                updateProgressAlert.dismiss();
                alert((lang.updateFail || "Update failed") + ": " + err);
            }
        }

        //We will do nothing on cancel for the timebeing.
        function doNothing() {
            //do nothing
        }
        //if Update is mandatory we will show only Update now button.


    });
}

exports.checkUpdate = checkUpdate;

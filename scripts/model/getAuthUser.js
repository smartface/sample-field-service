/*global lang */
const Http = require("sf-core/net/http");
const userData = require("../model/user");
const Network = require('sf-core/device/network');

var userAuth = {};

userAuth.getAuthUser = (function() {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    var confirmUser = function(options, callback) {
        var username = options.username;
        var password = options.password;

        var url = "https://commonsmartface.blob.core.windows.net/fieldservice/fieldservice.json";
        var sessionManager = new Http();

        sessionManager.requestJSON({
            url: url,
            onLoad: function(e) {

                var responseBody = e.body.toString();

                var parseJSON = JSON.parse(responseBody);

                if (username === parseJSON[0].username && password === parseJSON[0].password) {
                    var userAuth = require("../mock/userAuth.json");
                    userData.currentUser = userAuth;
                    callback && callback(null, userAuth);
                }
                else {
                    callback(responseBody);
                }

            },
            onError: function(err) {
                callback(err);
            }
        })
    };

    return {
        confirmUser: confirmUser
    };
}());

exports.userAuth = userAuth.getAuthUser;

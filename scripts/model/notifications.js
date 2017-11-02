/*globals lang*/
const Http = require("sf-core/net/http");
const http = new Http();
const mcs = require("../lib/mcs");
const Network = require('sf-core/device/network');
exports.getNotifications = getNotifications;


function getNotifications(callback) {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    var options = {
        "apiName": "Endpoints",
        "endpointPath": "notifications",
    };
    var requestOptions = Object.assign({
        method: "GET",
        onLoad: function(response) {
            var res = JSON.parse(response.body.toString());
            callback && callback(null, res);
        },
        onError: function(error) {
            callback && callback(error);
        }
    }, mcs.createRequestOptions(options));

    http.request(requestOptions);
}

/*globals lang*/
const http = require("sf-core/net/http");
const mcs = require("../lib/mcs");
const Network = require('sf-core/device/network');
exports.getNotifications = getNotifications;


function getNotifications(callback) {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    var options = {
        "apiName": "Endpoints",
        "endpointName": "notifications",
    };
    var requestOptions = Object.assign({
        method: "GET"
    }, mcs.createRequestOptions(options));

    http.request(requestOptions, function(response) {
        var res = JSON.parse(response.body.toString());
        callback && callback(null, res);
    }, function(error) {
        callback && callback(error);
    });
}

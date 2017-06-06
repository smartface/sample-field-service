const http = require("sf-core/net/http");
const mcs = require("../lib/mcs");

exports.getNotifications = getNotifications;


function getNotifications(callback) {
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

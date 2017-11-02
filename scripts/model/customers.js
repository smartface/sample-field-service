/*globals lang*/
const Http = require("sf-core/net/http");
const http = new Http();
const mcs = require("../lib/mcs");
const Network = require('sf-core/device/network');

exports.getCustomers = getCustomers;
exports.addCustomer = addCustomer;
exports.getSingleCustomer = getSingleCustomer;

function getCustomers(filter, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    var options = {
        "apiName": "Endpoints",
        "endpointPath": "contacts",
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

    var query = [];
    for (var key in filter) {
        query.push(key + "=" + filter[key]);
    }
    requestOptions.url += "?" + query.join("&");

    http.request(requestOptions);
}

function addCustomer(customerData, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    var options = {
        "apiName": "Endpoints",
        "endpointPath": "contacts",
    };
    var requestOptions = Object.assign({
        method: "POST",
        onLoad: function(response) {
            var res = JSON.parse(response.body.toString());
            callback && callback(null, res);
        },
        onError: function(error) {
            callback && callback(error);
        }
    }, mcs.createRequestOptions(options));
    if (typeof customerData !== "string")
        customerData = JSON.stringify(customerData);
    requestOptions.body = customerData;

    http.request(requestOptions);
}

function getSingleCustomer(id, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    var options = {
        "apiName": "Endpoints",
        "endpointPath": "contactById",
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

    requestOptions.url += "?id=" + id;

    http.request(requestOptions);
}

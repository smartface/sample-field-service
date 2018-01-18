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

    var customerJson = require("../mock/customer.json");
    var resingnify = JSON.stringify(customerJson);
    var reparseCustomer = JSON.parse(resingnify);

    if (customerJson) {
        callback && callback(null, reparseCustomer);
    }
    else {
        callback(reparseCustomer);
    }
    // var options = {
    //     "apiName": "Endpoints",
    //     "endpointPath": "contacts",
    // };
    // var requestOptions = Object.assign({
    //     method: "GET",
    //     onLoad: function(response) {
    //         var res = JSON.parse(response.body.toString());
    //         callback && callback(null, res);
    //     },
    //     onError: function(error) {
    //         callback && callback(error);
    //     }
    // }, mcs.createRequestOptions(options));

    // var query = [];
    // for (var key in filter) {
    //     query.push(key + "=" + filter[key]);
    // }
    // requestOptions.url += "?" + query.join("&");

    // http.request(requestOptions);
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

    getCustomers(null, function(err, customerData) {
        if (err) {
            return alert("Customers Service Error");
        }
        console.log("befor for loop");
        for (let i in customerData.items) {
            console.log("i is " + i );
            if (customerData.items[i].id == id) {
                console.log("found id  is " + i );
                var detectedCustomer = customerData.items[i];
                callback && callback(null, detectedCustomer);
            }
        }
    })

    // var options = {
    //     "apiName": "Endpoints",
    //     "endpointPath": "contactById",
    // };
    // var requestOptions = Object.assign({
    //     method: "GET",
    //     onLoad: function(response) {
    //         var res = JSON.parse(response.body.toString());
    //         callback && callback(null, res);
    //     },
    //     onError: function(error) {
    //         callback && callback(error);
    //     }
    // }, mcs.createRequestOptions(options));

    // requestOptions.url += "?id=" + id;

    // http.request(requestOptions);
}

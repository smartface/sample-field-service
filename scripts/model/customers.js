/*globals lang*/
const Http = require("sf-core/net/http");
const http = new Http();
const mcs = require("../lib/mcs");
const Network = require('sf-core/device/network');
const File = require('sf-core/io/file');
const Path = require('sf-core/io/path');
const FileStream = require('sf-core/io/filestream');
const System = require('sf-core/device/system');
//const AndroidConfig = require("sf-core/util/Android/androidconfig.js");

exports.getCustomers = getCustomers;
exports.addCustomer = addCustomer;
exports.getSingleCustomer = getSingleCustomer;

function getCustomers(filter, callback) {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    var customerJson = require("../mock/customer.json");

    if (customerJson) {
        callback && callback(null, customerJson);
    }
    else {
        callback(customerJson);
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

    var path = "../mock/customer.json";
    var customerJson = require(path);

    var lastItemLength = Object.keys(customerJson.items).length;

    customerJson.items[lastItemLength] = customerData;

    Object.assign(customerData, {
        id: lastItemLength
    });

    var file;
    if (System.OS === "Android") {
        file = new File({
            path: "/storage/emulated/0/Android/data/io.smartface.SmartfaceApp/system/rau/assets/mock/customer.json"
        });
        if (!file.exists) {
            file = new File({
                path: "assets://mock/customer.json"
            });
            if (!file.exists) {
                file = new File({
                    path: "/storage/emulated/0/Android/data/io.smartface.fieldservice/assets/mock/customer.json"
                });
            }
        }
    }
    else {
        file = new File({
            path: Path.DataDirectory + '/scripts/mock/customer.json'
        });
    }
    
    try {
        if (System.OS === "Android") {
            var fileStream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);
            var isIt = fileStream.write(JSON.stringify(customerJson));
            console.log("write is succeed ?  " + isIt)
            fileStream.close();
        }
    }
    catch (err) {
        console.log("customer error message is " + err.message);
        // return callback(customerJson);
    }
    return callback && callback(null, customerJson);

    // jsonfile.writeFile(path, modifiedCustomerJson, function(err) {
    //     if (err) {
    //         console.log("while writing json file error occured");
    //     }
    //     console.log("writing to file is successfull");
    // })
    // var options = {
    //     "apiName": "Endpoints",
    //     "endpointPath": "contacts",
    // };
    // var requestOptions = Object.assign({
    //     method: "POST",
    //     onLoad: function(response) {
    //         var res = JSON.parse(response.body.toString());
    //         callback && callback(null, res);
    //     },
    //     onError: function(error) {
    //         callback && callback(error);
    //     }
    // }, mcs.createRequestOptions(options));
    // if (typeof customerData !== "string")
    //     customerData = JSON.stringify(customerData);
    // requestOptions.body = customerData;

    // http.request(requestOptions);
}

function getSingleCustomer(id, callback) {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    getCustomers(null, function(err, customerData) {
        if (err) {
            return alert("Customers Service Error");
        }

        for (let i in customerData.items) {

            if (customerData.items[i].id == id) {

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

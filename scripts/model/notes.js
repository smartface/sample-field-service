/*globals lang*/
const Http = require("sf-core/net/http");
const http = new Http();
const mcs = require("../lib/mcs");
const Network = require('sf-core/device/network');

exports.getNotes = getNotes;
exports.getNoteContent = getNoteContent;
exports.deleteNote = deleteNote;
exports.addNote = addNote;

function getNotes(callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    mcs.getItemListInCollection("notes", function(err, result) {
        callback && callback(err, result);
    });
}

function getNoteContent(noteFileObject, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    mcs.getItem({
        collectionId: "notes",
        itemId: noteFileObject.id
    }, function(err, result) {
        var text = "";
        if (result && result.body)
            text = result.body.toString();
        callback && callback(err, text);
    });
}

function deleteNote(noteFileObject, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    mcs.deleteItem({
        collectionId: "notes",
        itemId: noteFileObject.id
    }, function(err, result) {
        callback && callback(err, result);
    });
}

function addNote(noteContent, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    if (typeof noteContent !== "string")
        return;
    noteContent = noteContent.trim();
    if (noteContent.length === 0)
        return;

    var lines = noteContent.split("\n");
    if (lines.length === 0)
        lines = [noteContent];
    var firstLine = lines[0];
    var fileName = firstLine.substring(0, 50) + ".txt";

    mcs.storeItem({
        collectionId: "notes",
        itemName: fileName,
        contentType: "text/plain",
        base64EncodeData: noteContent
    }, function(err, response) {
        callback && callback(err, response);
    });

}

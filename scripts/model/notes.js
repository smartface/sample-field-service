/*globals lang*/
const Network = require('sf-core/device/network');
const File = require('sf-core/io/file');
const FileStream = require('sf-core/io/filestream');
const System = require('sf-core/device/system');
const Path = require('sf-core/io/path');


exports.getNotes = getNotes;
exports.getNoteContent = getNoteContent;
exports.deleteNote = deleteNote;
exports.addNote = addNote;

function getNotes(callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    var path = "../mock/notes.json";
    var notesJson = require(path);

    if (notesJson) {

        callback && callback(null, notesJson);
    }
    else callback(notesJson);
    // mcs.getItemListInCollection("notes", function(err, result) {
    //     callback && callback(err, result);
    // });
}

function getNoteContent(noteFileObject, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    getNotes(function(err, notes) {
        // console.log("before return of err")
        if (err) return;

        for (let i in notes) {
            if (notes[i].id === noteFileObject.id) {
                return callback && callback(err, notes[i].content.text);
            }
        }
        return callback(err);
    })
    // mcs.getItem({
    //     collectionId: "notes",
    //     itemId: noteFileObject.id
    // }, function(err, result) {
    //     var text = "";
    //     if (result && result.body)
    //         text = result.body.toString();
    //     callback && callback(err, text);
    // });
}

function deleteNote(noteFileObject, callback) {
    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }

    getNotes(function(err, notes) {
        if (err) return callback(notes);

        for (let i in notes) {
            if (notes[i].id === noteFileObject.id) {
                Array.prototype.splice.call(notes, i, 1);
                // console.log("new notes are  " + JSON.stringify(notes));
                callback && callback(err, notes);
            }
        }
    });

    // mcs.deleteItem({
    //     collectionId: "notes",
    //     itemId: noteFileObject.id
    // }, function(err, result) {
    //     callback && callback(err, result);
    // });
}

function addNote(noteContent, currentNoteData, selectedIndex, callback) {

    if (Network.connectionType === Network.ConnectionType.None) {
        return alert(lang.noInternetMessage, lang.noInternetTitle);
    }
    getNotes(function(err, notes) {
        if (err) return;

        var lastItemLength = Object.keys(notes).length;
        var date = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var currentDay = "" + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

        var newNote;
        if (currentNoteData) {
            currentNoteData.content.text = noteContent;
            currentNoteData.modifiedOn = currentDay;
            newNote = currentNoteData;
        }
        else {
            newNote = {
                id: lastItemLength,
                name: checkName(currentNoteData, lastItemLength),
                modifiedOn: currentDay,
                content: {
                    text: noteContent
                }
            };
        }
        if (selectedIndex || selectedIndex === 0) {
            Array.prototype.splice.call(notes, selectedIndex, 0, newNote)
            notes[selectedIndex] = newNote;
        }
        else {
            Array.prototype.splice.call(notes, lastItemLength, 0, newNote)
            notes[lastItemLength] = newNote
        };

        var file;
        if (System.OS === "Android") {
            file = new File({
                path: "/storage/emulated/0/Android/data/io.smartface.SmartfaceApp/system/rau/assets/mock/notes.json"
            });
            if (!file.exists) {
                file = new File({
                    path: "/storage/emulated/0/Android/data/io.smartface.SmartfaceApp/cache/assets/mock/notes.json"
                });
                if (!file.exists) {
                    file = new File({
                        path: "/storage/emulated/0/Android/data/io.smartface.SmartfaceApp/assets/mock/notes.json"
                    });
                }
            }
        }
        else {
            file = new File({
                path: Path.DataDirectory + '/scripts/mock/notes.json'
            });
        }

        // var path = "/storage/emulated/0/Android/data/io.smartface.SmartfaceApp/cache/assets/mock/notes.json";

        try {
            if (System.OS === "Android") {
                var fileStream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);
                fileStream.write(JSON.stringify(notes));
                fileStream.close();
            }
            // return callback && callback(null, notes);
        }
        catch (err) {
            console.log("error message is " + err.message);
        }
        return callback && callback(null, notes);
    });
    // var path = "../mock/notes.json";
    // var customerJson = require(path);

    // var lastItemLength = Object.keys(customerJson.items).length;

    // customerJson.items[lastItemLength] = customerData;

    // Object.assign(customerData, {
    //     id: lastItemLength
    // })

    // var file = new File({
    //     path: path
    // });
    // try {
    //     var fileStream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.BINARY);
    //     fileStream.write(JSON.stringify(customerJson));
    //     fileStream.close();
    //     return callback && callback(null, customerJson);
    // }
    // catch (err) {
    //   return callback(customerJson);
    // }

    // if (typeof noteContent !== "string")
    //     return;
    // noteContent = noteContent.trim();
    // if (noteContent.length === 0)
    //     return;

    // var lines = noteContent.split("\n");
    // if (lines.length === 0)
    //     lines = [noteContent];
    // var firstLine = lines[0];
    // var fileName = firstLine.substring(0, 50) + ".txt";

    // mcs.storeItem({
    //     collectionId: "notes",
    //     itemName: fileName,
    //     contentType: "text/plain",
    //     base64EncodeData: noteContent
    // }, function(err, response) {
    //     callback && callback(err, response);
    // });

}

function checkName(noteName, lastItemLength) {
    if (noteName) {
        return noteName.name;
    }
    else return "Field note " + (lastItemLength + 1);
}

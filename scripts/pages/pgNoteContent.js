const TextArea = require('sf-core/ui/textarea');
const extend = require('js-base/core/extend');
const pgNoteContentDesign = require('ui/ui_pgNoteContent');
const FlexLayout = require('sf-core/ui/flexlayout');
const notes = require("../model/notes");
const theme = require("../lib/theme");
const Font = require('sf-core/ui/font');
const Router = require("sf-core/ui/router");
const moveToScrollView = require("../lib/mote-to-scrollview");
const Color = require('sf-core/ui/color');
const SpeechRecognizer = require("sf-core/speechrecognizer");
const permission = require("../lib/permission");
const Application = require('sf-core/application');
const System = require('sf-core/device/system');
const backAction = require("../lib/ui").backAction;

const pgNoteContent = extend(pgNoteContentDesign)(
	// Constructor
	function(_super) {
		const page = this;
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.onHide = onHide.bind(this);
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow, noteData) {
	const page = this;
	// moveToScrollView(page);

	superOnShow();
	var taNote = page.taNote;
	if (noteData) { //load
		notes.getNoteContent(noteData, function(err, text) {
			if (err) {
				if (typeof err === "object") {
					if (err.body)
						err.body = err.body.toString();
					err = JSON.stringify(err, null, "\t");
				}
				return alert(err, "note delete error");
			}
			page.originalText = taNote.text = text;
			page.originalNoteData = noteData;
			page.flWait.visible = false;
			page.taNote.visible = true;
		});
	}
	else { //new
		newNote(page);
	}
	
	backAction(page);
	applyTheme.call(page);
}

function applyTheme() {
	const page = this;
	var selectedTheme = theme[theme.selected];
	page.btnNew.textColor = page.btnDelete.textColor = page.btnSpeech.textColor = selectedTheme.topBarColor;
	page.headerBar.backgroundColor = selectedTheme.topBarColor;
	page.aiWait.color = selectedTheme.topBarColor;
}

function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
	var taNote = new TextArea({
		flexGrow: 1,
		positionType: FlexLayout.PositionType.RELATIVE,
		font: Font.create("Lato", 14, Font.NORMAL),
		visible: false,
		backgroundColor: Color.TRANSPARENT
	});
	page.textAreaHolder.addChild(taNote);
	page.taNote = taNote;

	page.btnNew.onPress = newNote.bind(page);
	page.btnDelete.onPress = deleteNote.bind(page);
	page.btnSpeech.onPress = speech.bind(page);
}

function onHide() {
	const page = this;

	var taNote = page.taNote;

	if (page.originalText !== taNote.text) { //changed then save
		if (page.originalNoteData) {
			notes.deleteNote(page.originalNoteData, function(err) {
				if (err) {
					if (typeof err === "object") {
						if (err.body)
							err.body = err.body.toString();
						err = JSON.stringify(err, null, "\t");
					}
					return alert(err, "note delete error");
				}
				addNote(taNote.text);
			});
		}
		else {
			addNote(taNote.text);
		}

	}
}

function addNote(text) {
	notes.addNote(text);
}

function newNote(page) {
	page = page || this;
	var taNote = page.taNote;
	page.originalText = taNote.text = "";
	page.flWait.visible = false;
	page.taNote.visible = true;
	page.originalNoteData = null;
}

function deleteNote(page) {
	page = page || this;

	if (page.originalNoteData) {
		notes.deleteNote(page.originalNoteData, function(err) {
			if (err) {
				if (typeof err === "object") {
					if (err.body)
						err.body = err.body.toString();
					err = JSON.stringify(err, null, "\t");
				}
				return alert(err, "note delete error");
			}
			Router.goBack("pgNotes");
		});
	}
	else {
		Router.goBack("pgNotes");
	}
}


function speech() {
	const page = this;
	const btnSpeech = page.btnSpeech;
	var selectedTheme = theme[theme.selected];
	if (!SpeechRecognizer.isRunning()) {
		btnSpeech.textColor = selectedTheme.secondaryColor;
		if (System.OS === "iOS") {
			startSpeechRecognizer.call(page);
		}
		else if (System.OS === "Android") {
			permission.checkPermission(Application.android.Permissions.RECORD_AUDIO, function() {
				startSpeechRecognizer.call(page);
			});
		}
	}
	else {
		btnSpeech.textColor = selectedTheme.topBarColor;
		SpeechRecognizer.stop();
	}
}


function startSpeechRecognizer() {
	var selectedTheme = theme[theme.selected];
	const page = this;
	const btnSpeech = page.btnSpeech;
	const taNote = page.taNote;
	SpeechRecognizer.start({
		onResult: function(result) {
			taNote.text = result;
		},
		onFinish: function(result) {
			btnSpeech.textColor = selectedTheme.topBarColor;
		},
		onError: function(error) {
			btnSpeech.textColor = selectedTheme.topBarColor;
		}
	});
}


module && (module.exports = pgNoteContent);

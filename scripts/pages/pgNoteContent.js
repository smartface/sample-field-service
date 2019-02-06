const Application = require("sf-core/application");
/*globals lang*/
const TextArea = require('sf-core/ui/textarea');
const extend = require('js-base/core/extend');
const pgNoteContentDesign = require('ui/ui_pgNoteContent');
const FlexLayout = require('sf-core/ui/flexlayout');
const notes = require("../model/notes");
const theme = require("../lib/theme");
const Font = require('sf-core/ui/font');
const Router = require("../router/index");
const Color = require('sf-core/ui/color');
const backAction = require("../lib/ui").backAction;
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const speechToText = require("sf-extension-utils/lib/speechtotext");


const pgNoteContent = extend(pgNoteContentDesign)(
	// Constructor
	function(_super,routeData) {
		
		const page = this;
		_super(this);
		this.routeData = routeData;
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.onHide = onHide.bind(this);
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow, data) {
	const page = this;
	superOnShow();
	data = this.routeData;
	page.selectedIndex = data.index;
	var taNote = page.taNote;
	var noteData;
	if (data) {
		noteData = data.noteData;
		page.pgNotes = data.pgNotes;
	}
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
			page.taNote.requestFocus();
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
	page.headerBar.backgroundColor = selectedTheme.topBarColor;
	page.aiWait.color = selectedTheme.topBarColor;
	const hbiSpeech = page.headerBar.items[0];
	hbiSpeech.color = selectedTheme.secondaryColor;
}

function onLoad(superOnLoad) {
	superOnLoad();

	const page = this;

	page.ios.safeAreaLayoutMode = true;

	Application.android.onBackButtonPressed = () => {
        Router.goBack();
    }
	var taNote = new TextArea({
		flexGrow: 1,
		positionType: FlexLayout.PositionType.RELATIVE,
		font: Font.create("Lato", 14, Font.NORMAL),
		visible: false,
		backgroundColor: Color.TRANSPARENT,
	});
	var placeHolder = new FlexLayout({
		flexGrow: 1,
		onTouch: function() {
			taNote.requestFocus();
		}
	});
	page.textAreaHolder.addChild(taNote);
	page.textAreaHolder.addChild(placeHolder);

	page.taNote = taNote;
	page.addNote = addNote.bind(page);
	page.taNote.font = Font.create("Lato", 14, Font.NORMAL);

	var hbiSpeech = new HeaderBarItem({
		title: lang.speech,
		onPress: function() {
			speech.call(page);
		}
	});
	this.headerBar.items = [hbiSpeech];
	this.headerBar.setItems(this.headerBar.items);

}

function onHide() {
	const page = this;

	var taNote = page.taNote;

	if (page.originalText !== taNote.text) { //changed then save
		if (page.originalNoteData) {
			page.pgNotes.putToWaitMode();
			notes.deleteNote(page.originalNoteData, function(err) {
				if (err) {
					if (typeof err === "object") {
						if (err.body)
							err.body = err.body.toString();
						err = JSON.stringify(err, null, "\t");
					}
					return alert(err, "note delete error");
				}
				page.addNote(taNote.text);
			});
		}
		else {
			page.addNote(taNote.text);
		}

	}

	taNote.removeFocus();

}

function addNote(text) {
	const page = this;
	notes.addNote(text, page.originalNoteData, page.selectedIndex, function(err) {
		if (err)
			return;
		page.pgNotes.refreshData();
	});
}

function newNote(page) {
	page = page || this;
	var taNote = page.taNote;
	page.originalText = taNote.text = "";
	page.flWait.visible = false;
	page.taNote.visible = true;
	page.originalNoteData = null;
	page.taNote.requestFocus();
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
				return alert(err, "note delete error 22");
			}
			Router.goBack("/slider/customersPage/customers/pgNotes");
		});
	}
	else {
		Router.goBack("/slider/customersPage/customers/pgNotes");
	}
}


function speech() {
	const page = this;
	const hbiSpeech = page.headerBar.items[0];
	if (!speechToText.isRunning) {
		hbiSpeech.title = lang.stop;
		speechToText.startType(page.taNote, 4000, function() {
			hbiSpeech.title = lang.speech;
		});
	}
	else {
		hbiSpeech.title = lang.speech;
		speechToText.stop();
	}
}

module && (module.exports = pgNoteContent);

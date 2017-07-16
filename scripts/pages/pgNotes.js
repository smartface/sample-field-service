/*globals lang*/
const extend = require('js-base/core/extend');
const pgNotesDesign = require('ui/ui_pgNotes');
const ListViewItem = require('sf-core/ui/listviewitem');
const FlexLayout = require('sf-core/ui/flexlayout');
const Label = require('sf-core/ui/label');
const initTime = require("../lib/init-time");
const notes = require("../model/notes");
const Color = require('sf-core/ui/color');
const View = require('sf-core/ui/view');
const theme = require("../lib/theme");
const Font = require('sf-core/ui/font');
const Router = require("sf-core/ui/router");
const backAction = require("../lib/ui").backAction;

const pgNotes = extend(pgNotesDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow, data) {
	const page = this;
	superOnShow();
	const lvNotes = page.lvNotes;
	const aiNotes = page.aiNotes;

	if (data && data.customerId) {
		setTimeout(function() {
			notes.getNotes(function(err, notes) {
				if (err) {
					if (typeof err === "object") {
						if (typeof err.body === "object")
							err.body = err.body.toString();
						err = JSON.stringify(err, null, "\t");
					}
					alert(err, "Notes Error");
					return;
				}
				page.data = notes;
				notes.forEach(function(note) {
					var splittedName = note.name.split(".");
					note.displayName = splittedName ? splittedName[0] : note.name;
					var date = new Date(note.modifiedOn);
					note.modifiedOnDisplayValue = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				});

				lvNotes.itemCount = notes.length;
				aiNotes.visible = false;
				lvNotes.refreshData();
				lvNotes.visible = true;
			});
		}, initTime);
	}

	backAction(page);
	applyTheme.call(page);
}

function applyTheme() {
	const page = this;
	var selectedTheme = theme[theme.selected];
	page.btnNew.textColor = selectedTheme.topBarColor;
	page.headerBar.backgroundColor = selectedTheme.topBarColor;
	page.aiNotes.color = selectedTheme.topBarColor;
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
	var selectedTheme = theme[theme.selected];
	const lvNotes = page.lvNotes;
	// const aiNotes = page.aiNotes;
	const flNoteRowId = 4845;
	const lblNoteNameId = 4846;
	const lblDateId = 4847;


	lvNotes.onRowCreate = function() {
		var lvNotesItem = new ListViewItem();

		var flListRow = new FlexLayout({
			id: flNoteRowId,
			marginLeft: 20,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			alignItems: FlexLayout.AlignItems.STRETCH
		});
		lvNotesItem.addChild(flListRow);

		var lblNoteName = new Label({
			id: lblNoteNameId,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			text: "",
			textColor: Color.BLACK,
			marginTop: 5,
			font: Font.create("Lato", 14, Font.NORMAL)
		});
		flListRow.addChild(lblNoteName);

		var lblDate = new Label({
			id: lblDateId,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			text: "",
			textColor: Color.GRAY,
			marginBottom: 5,
			font: Font.create("Lato", 14, Font.NORMAL)
		});
		flListRow.addChild(lblDate);

		var line = new View({
			backgroundColor: selectedTheme.lineSeparator,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			height: 1,
			bottom: 0,
			left: 0,
			right: 0
		});
		flListRow.addChild(line);



		return lvNotesItem;
	};

	lvNotes.onRowBind = function(lvNotesItem, index) {
		if (!page.data)
			return;

		var flListRow = lvNotesItem.findChildById(flNoteRowId);
		var lblNoteName = flListRow.findChildById(lblNoteNameId);
		var lblDate = flListRow.findChildById(lblDateId);
		var itemData = page.data[index];
		lblNoteName.text = itemData.displayName;
		lblDate.text = itemData.modifiedOnDisplayValue;
	};

	lvNotes.ios.swipeItem(lang.delete, Color.RED, 0, function() {
		alert(JSON.stringify(arguments, null, "\t"), "Swipe callback");
	});

	lvNotes.ios.rightToLeftSwipeEnabled = true;

	lvNotes.ios.onRowSwiped = function() {
		// alert(JSON.stringify(arguments, null, "\t"), "Swipe event");
	};

	lvNotes.onRowSelected = function(listViewItem, index) {
		var data = page.data[index];
		Router.go("pgNoteContent", data);
	};

	lvNotes.refreshEnabled = false;

	page.btnNew.onPress = function() {
		Router.go("pgNoteContent");
	};



}

module && (module.exports = pgNotes);

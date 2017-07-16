/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const FlexLayout = require('sf-core/ui/flexlayout');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const Font = require('sf-core/ui/font');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgNotes_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const lvNotesStyle = getCombinedStyle(".listView", {
			width: null,
			height: null,
			left: 0,
			top: 0,
			bottom: 48,
			right: 0,
			visible: false,
			itemCount: null,
			rowHeight: 64,
			flexGrow: null,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});  
		var lvNotes = new ListView(lvNotesStyle);  
		lvNotes.onRowCreate = function(){ return new ListViewItem(); };
		this.layout.addChild(lvNotes);
		this.lvNotes = lvNotes;

		const aiNotesStyle = getCombinedStyle(".activityIndicator", {
			minHeight: 21,
			minWidth: 21
		});  
		var aiNotes = new ActivityIndicator(aiNotesStyle);  
		this.layout.addChild(aiNotes);
		this.aiNotes = aiNotes;

		const flButtonsStyle = getCombinedStyle(".flexLayout", {
			bottom: 0,
			left: 0,
			right: 0,
			width: null,
			height: 48,
			backgroundColor: Color.create(0, 189, 16, 224),
			top: null,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			alignItems: FlexLayout.AlignItems.FLEX_END
		});  
		var flButtons = new FlexLayout(flButtonsStyle);  
		this.layout.addChild(flButtons);
		this.flButtons = flButtons;

		const btnNewStyle = getCombinedStyle(".button", {
			text: "",
			backgroundColor: Color.create(0, 0, 161, 241),
			width: 48,
			height: 48,
			textColor: Color.create(255, 44, 50, 57),
			marginRight: null,
			font: Font.create("FontAwesome", 24, Font.NORMAL)
		});  
		var btnNew = new Button(btnNewStyle);  
		flButtons.addChild(btnNew);
		this.btnNew = btnNew;

		//assign the children to page 
		this.children = Object.assign({}, {
			lvNotes: lvNotes,
			aiNotes: aiNotes,
			flButtons: flButtons
		});
		
		//assign the children of flButtons
		flButtons.children = Object.assign({}, {
			btnNew: btnNew
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		style: StatusBarStyle.LIGHTCONTENT
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		title: "Notes"
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		alignItems: FlexLayout.AlignItems.CENTER,
		justifyContent: FlexLayout.JustifyContent.CENTER
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgNotes_);
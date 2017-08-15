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
			bottom: 0,
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
	
		//assign the children to page 
		this.children = Object.assign({}, {
			lvNotes: lvNotes,
			aiNotes: aiNotes
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
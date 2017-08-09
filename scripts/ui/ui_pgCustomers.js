/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgCustomers_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const aiWaitStyle = getCombinedStyle(".activityIndicator", {
			minHeight: 21,
			minWidth: 21
		});  
		var aiWait = new ActivityIndicator(aiWaitStyle);  
		this.layout.addChild(aiWait);
		this.aiWait = aiWait;

		const lvCustomersStyle = getCombinedStyle(".listView", {
			width: null,
			height: null,
			left: 0,
			top: 7.43,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			itemCount: 4,
			rowHeight: 106.43,
			visible: false,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});  
		var lvCustomers = new ListView(lvCustomersStyle);  
		lvCustomers.onRowCreate = function(){ return new ListViewItem(); };
		this.layout.addChild(lvCustomers);
		this.lvCustomers = lvCustomers;

		//assign the children to page 
		this.children = Object.assign({}, {
			aiWait: aiWait,
			lvCustomers: lvCustomers
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		color: Color.create(255, 44, 50, 57),
		style: StatusBarStyle.LIGHTCONTENT
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		title: "Customers",
		backgroundColor: Color.create(255, 44, 50, 57),
		titleColor: Color.create(255, 255, 255, 255)
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create(255, 255, 255, 255),
		alignItems: FlexLayout.AlignItems.CENTER,
		justifyContent: FlexLayout.JustifyContent.CENTER
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgCustomers_);
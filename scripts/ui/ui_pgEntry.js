/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgEntry_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		}, props || {}));


	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		visible: true,
		color: Color.create("#00A1F1")
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		backgroundColor: Color.create("#FFFFFF"),
		visible: true,
		title: "Field Service",
		titleColor: Color.create("#000000")
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create("#FFFFFF"),
		alignContent: FlexLayout.AlignContent.STRETCH,
		alignItems: FlexLayout.AlignItems.CENTER,
		direction: FlexLayout.Direction.INHERIT,
		flexDirection: FlexLayout.FlexDirection.COLUMN,
		flexWrap: FlexLayout.FlexWrap.NOWRAP,
		justifyContent: FlexLayout.JustifyContent.CENTER
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgEntry_);
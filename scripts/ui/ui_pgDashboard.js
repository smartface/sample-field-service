/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ScrollView = require('sf-core/ui/scrollview');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;
const getCombinedLayoutStyle = require("library/styler-builder").getCombinedLayoutStyle;

const PgDashboard_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		}, props || {}));

		const svChartStyle = getCombinedStyle(".scrollView", {
			backgroundColor: Color.create(255, 255, 255, 255),
			width: null,
			height: null,
			flexGrow: 1
		}); 
		const svChartLayoutStyle = getCombinedLayoutStyle(".scrollView", {
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 10,
			paddingBottom: 10,
			flexDirection: FlexLayout.FlexDirection.COLUMN_REVERSE
		});  
		var svChart = new ScrollView(svChartStyle); 
		Object.assign(svChart.layout, svChartLayoutStyle);
 
		this.layout.addChild(svChart);
		this.svChart = svChart;
	
		const flexLayout1Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});  
		var flexLayout1 = new FlexLayout(flexLayout1Style);  
		this.layout.addChild(flexLayout1);
			
		//assign the children to page 
		this.children = Object.assign({}, {
			svChart: svChart,
			flexLayout1: flexLayout1
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		visible: true,
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
		backgroundColor: Color.create(255, 44, 50, 57),
		visible: true,
		title: "Dashboard",
		titleColor: Color.create(255, 255, 255, 255)
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create(255, 36, 42, 52),
		alignContent: FlexLayout.AlignContent.STRETCH,
		alignItems: FlexLayout.AlignItems.STRETCH,
		direction: FlexLayout.Direction.INHERIT,
		flexDirection: FlexLayout.FlexDirection.COLUMN,
		flexWrap: FlexLayout.FlexWrap.NOWRAP,
		justifyContent: FlexLayout.JustifyContent.FLEX_START
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgDashboard_);
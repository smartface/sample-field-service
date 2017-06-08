/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgDashboard_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var imgReports = new ImageView({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 20,
			marginRight: 20,
			marginTop: 20,
			marginBottom: 20,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://reports.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		this.layout.addChild(imgReports);
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			imgReports: imgReports
		});

});

function onLoad() { 

  this.headerBar.title = "Dashboard";
  this.headerBar.titleColor = Color.create(255, 255, 255, 255);
  this.headerBar.backgroundColor = Color.create(255, 44, 50, 57);
  this.headerBar.visible = true;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create(255, 44, 50, 57));this.statusBar.ios && (this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT);
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.backgroundColor = Color.create(255, 36, 42, 52);

}

module && (module.exports = PgDashboard_);
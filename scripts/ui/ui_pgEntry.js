/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');



const PgEntry_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var activityindicator1 = new ActivityIndicator({
			width: 42,
			height: 42,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			color: Color.create("#ADADAD")
		}); 
		this.layout.addChild(activityindicator1);
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			activityindicator1: activityindicator1
		});

});

function onLoad() { 

  this.headerBar.title = "Field Service";
  this.headerBar.titleColor = Color.create("#000000");
  this.headerBar.backgroundColor = Color.create("#FFFFFF");
  this.headerBar.visible = true;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.CENTER;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
  this.layout.backgroundColor = Color.create("#FFFFFF");

}

module && (module.exports = PgEntry_);
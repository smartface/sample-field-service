const Page = require('sf-core/ui/page');
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Font = require('sf-core/ui/font');
const ScrollView = require('sf-core/ui/scrollview');
const JetView = require('sf-extension-oracle-jet');
const Label = require('sf-core/ui/label');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Router = require("sf-core/router");
const Button = require("sf-core/ui/button");

var labelFont = Font.create(Font.DEFAULT, 16, Font.BOLD);
var buttonFont = Font.create(Font.DEFAULT, 14, Font.BOLD);
var jetViewHeight = 375;
var jetViewMargin = 5;
var labelHeigth = 50;
var labelWidth = 150;
var viewMargin = 10;
var buttonHeight = 50;
var oneChartHeight = jetViewHeight + (2*jetViewMargin) + labelHeigth + (2 * viewMargin) + buttonHeight;

var charts = [];

var page1 = extend(Page)(
	function(_super) {

		_super(this);
		
		generateCharts();
		
		var myScrollView = new ScrollView({
		    flexGrow: 2,
		});
		
		charts.forEach(function(element){
		    myScrollView.layout.addChild(generateChartTemplate(element.jetData, element.title, element.url));
		});
		
		myScrollView.layout.height = (myScrollView.layout.getChildCount()) * oneChartHeight;
        // myScrollView.layout.justifyContent = FlexLayout.JustifyContent.SPACE_AROUND;
        myScrollView.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
		this.layout.addChild(myScrollView);
	}
);

function generateChartTemplate(jetData, labelText, chartUrl){
    var layout = new FlexLayout({
        margin: viewMargin,
        height: jetViewHeight + (2*jetViewMargin) + labelHeigth + buttonHeight
    });
    
    var labelArea = new Label({
        height: labelHeigth,
        width: labelWidth,
        font: labelFont,
        text: labelText
    });
    var jetView = new JetView({
        height: jetViewHeight,
        margin: jetViewMargin,
        alignSelf: FlexLayout.AlignSelf.STRETCH,
    });
    
    var optionLayout = new FlexLayout({
        flexDirection: FlexLayout.FlexDirection.ROW,
        height: 50
    });
    var myButtonLeft = new Button({
		height: buttonHeight,
		text: "Load JET",
		url: chartUrl,
		jetView: jetView,
		flexGrow: 1,
		marginLeft: 20,
		marginRight: 10,
		font: buttonFont,
		textColor: Color.WHITE,
		onPress: function(){
		    this.jetView.reloadJET();
		}
	});
	var myButtonRight = new Button({
		height: buttonHeight,
		text: "Load URL",
		chartUrl: chartUrl,
		jetView: jetView,
		flexGrow: 1,
		marginLeft: 20,
		marginRight: 10,
		font: buttonFont,
		textColor: Color.WHITE,
		onPress: function(){
		    this.jetView.loadURL(this.chartUrl);
		}
	});
	

    Object.assign(jetView, jetData);
    layout.addChild(labelArea);
    layout.addChild(jetView);
    optionLayout.addChild(myButtonLeft);
    optionLayout.addChild(myButtonRight);
    layout.addChild(optionLayout);
    
    return layout;
} 

function generateCharts(){
    charts.push({
        title: "Area Chart",
        url: "http://www.oracle.com/webfolder/technetwork/jet/demo/demo-areaChart-default.html",
        jetData: {
            series: [{name : "Series 1", items : [74, 42, 70, 46]},
                          {name : "Series 2", items : [50, 58, 46, 54]},
                          {name : "Series 3", items : [34, 22, 30, 32]},
                          {name : "Series 4", items : [18,  6, 14, 22]}],
            groups: ["Group A", "Group B", "Group C", "Group D"],
            type: JetView.Type.AREA,
            orientation: JetView.Orientation.VERTICAL,
            stack: JetView.Stack.OFF
	    }
    })
}

module.exports = page1;
/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const Font = require('sf-core/ui/font');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgNoteContent_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const textAreaHolderStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1
		});  
		var textAreaHolder = new FlexLayout(textAreaHolderStyle);  
		this.layout.addChild(textAreaHolder);
		this.textAreaHolder = textAreaHolder;

		const flButtonsStyle = getCombinedStyle(".flexLayout", {
			bottom: null,
			left: null,
			right: null,
			width: null,
			height: 48,
			backgroundColor: Color.create(0, 189, 16, 224),
			top: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			alignItems: FlexLayout.AlignItems.FLEX_END,
			flexDirection: FlexLayout.FlexDirection.ROW_REVERSE
		});  
		var flButtons = new FlexLayout(flButtonsStyle);  
		this.layout.addChild(flButtons);
		this.flButtons = flButtons;

		const flWaitStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			left: 0,
			right: 0,
			bottom: 0,
			top: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			positionType: FlexLayout.PositionType.ABSOLUTE,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER
		});  
		var flWait = new FlexLayout(flWaitStyle);  
		this.layout.addChild(flWait);
		this.flWait = flWait;

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

		const aiWaitStyle = getCombinedStyle(".activityIndicator", {
			minHeight: 21,
			minWidth: 21
		});  
		var aiWait = new ActivityIndicator(aiWaitStyle);  
		flWait.addChild(aiWait);
		this.aiWait = aiWait;

		const btnSpeechStyle = getCombinedStyle(".button", {
			text: "",
			backgroundColor: Color.create(0, 0, 161, 241),
			width: 48,
			height: 48,
			textColor: Color.create(255, 44, 50, 57),
			marginRight: null,
			font: Font.create("FontAwesome", 24, Font.NORMAL)
		});  
		var btnSpeech = new Button(btnSpeechStyle);  
		flButtons.addChild(btnSpeech);
		this.btnSpeech = btnSpeech;

		const btnDeleteStyle = getCombinedStyle(".button", {
			text: "",
			backgroundColor: Color.create(0, 0, 161, 241),
			width: 48,
			height: 48,
			textColor: Color.create(255, 44, 50, 57),
			marginRight: null,
			font: Font.create("FontAwesome", 24, Font.NORMAL)
		});  
		var btnDelete = new Button(btnDeleteStyle);  
		flButtons.addChild(btnDelete);
		this.btnDelete = btnDelete;

		//assign the children to page 
		this.children = Object.assign({}, {
			textAreaHolder: textAreaHolder,
			flButtons: flButtons,
			flWait: flWait
		});
		
		//assign the children of flButtons
		flButtons.children = Object.assign({}, {
			btnNew: btnNew,
			btnSpeech: btnSpeech,
			btnDelete: btnDelete
		});
		
		//assign the children of flWait
		flWait.children = Object.assign({}, {
			aiWait: aiWait
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
		title: null
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgNoteContent_);
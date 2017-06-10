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
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgCustomerFilter_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		}, props || {}));

		const flTabStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 44, 50, 57),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 42.5,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flTab = new FlexLayout(flTabStyle);
		this.layout.addChild(flTab);
		
		const flInputsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			paddingTop: null,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var flInputs = new FlexLayout(flInputsStyle);
		this.layout.addChild(flInputs);
		
		const flButtonsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			right: 0,
			bottom: 0,
			height: null,
			left: 0,
			top: 0,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flButtons = new FlexLayout(flButtonsStyle);
		flTab.addChild(flButtons);
		this.flButtons = flButtons;

		const flFirstLineStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 126, 211, 33),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 61,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flFirstLine = new FlexLayout(flFirstLineStyle);
		flInputs.addChild(flFirstLine);
		this.flFirstLine = flFirstLine;

		const flTabIndicatorStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			right: 0,
			bottom: 0,
			height: null,
			left: 0,
			top: 0,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.FLEX_END,
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flTabIndicator = new FlexLayout(flTabIndicatorStyle);
		flTab.addChild(flTabIndicator);
		this.flTabIndicator = flTabIndicator;

		const btnNameStyle = getCombinedStyle(".button", {
			backgroundColor: Color.create(0, 0, 161, 241),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 80, 210, 194),
			height: null,
			text: "Name Surname",
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			font: Font.create("Lato", 16, Font.NORMAL)
		});
		var btnName = new Button(btnNameStyle);
		flButtons.addChild(btnName);
		this.btnName = btnName;

		const flNameInputStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 208, 2, 27),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			paddingTop: 22.5,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var flNameInput = new FlexLayout(flNameInputStyle);
		flFirstLine.addChild(flNameInput);
		this.flNameInput = flNameInput;

		const placeHolderLeftStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 0
		});
		var placeHolderLeft = new FlexLayout(placeHolderLeftStyle);
		flTabIndicator.addChild(placeHolderLeft);
		this.placeHolderLeft = placeHolderLeft;

		const flTabHighlightStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 80, 210, 194),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 5,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var flTabHighlight = new FlexLayout(flTabHighlightStyle);
		flTabIndicator.addChild(flTabHighlight);
		this.flTabHighlight = flTabHighlight;

		const btnCardStyle = getCombinedStyle(".button", {
			backgroundColor: Color.create(0, 0, 161, 241),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 198, 198, 198),
			height: null,
			text: "Card Number",
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			font: Font.create("Lato", 16, Font.NORMAL)
		});
		var btnCard = new Button(btnCardStyle);
		flButtons.addChild(btnCard);
		this.btnCard = btnCard;

		const flCardInputStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			paddingTop: 22.5,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 0
		});
		var flCardInput = new FlexLayout(flCardInputStyle);
		flFirstLine.addChild(flCardInput);
		this.flCardInput = flCardInput;

		const placeHolderRightStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var placeHolderRight = new FlexLayout(placeHolderRightStyle);
		flTabIndicator.addChild(placeHolderRight);
		this.placeHolderRight = placeHolderRight;

		const flNameIconStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: 65,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flNameIcon = new FlexLayout(flNameIconStyle);
		flNameInput.addChild(flNameIcon);
		
		const flCardIconStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: 65,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flCardIcon = new FlexLayout(flCardIconStyle);
		flCardInput.addChild(flCardIcon);
		
		const flNameInputAreaStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 207, 175, 179),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.FLEX_END,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var flNameInputArea = new FlexLayout(flNameInputAreaStyle);
		flNameInput.addChild(flNameInputArea);
		this.flNameInputArea = flNameInputArea;

		const flCardInputAreaStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 207, 175, 179),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.FLEX_END,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var flCardInputArea = new FlexLayout(flCardInputAreaStyle);
		flCardInput.addChild(flCardInputArea);
		this.flCardInputArea = flCardInputArea;

		const imgNameStyle = getCombinedStyle(".imageView", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: null,
			image: Image.createFromFile("images://filter_customer.png"),
			imageFillType: ImageFillType.NORMAL,
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var imgName = new ImageView(imgNameStyle);
		flNameIcon.addChild(imgName);
		this.imgName = imgName;

		const imgCardStyle = getCombinedStyle(".imageView", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 22,
			image: Image.createFromFile("images://filter_card.png"),
			imageFillType: ImageFillType.NORMAL,
			visible: true,
			width: 23,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var imgCard = new ImageView(imgCardStyle);
		flCardIcon.addChild(imgCard);
		this.imgCard = imgCard;

		//assign the children to page 
		this.children = Object.assign({}, {
			flTab: flTab,
			flInputs: flInputs
		});
		
		//assign the children of flTab
		flTab.children = Object.assign({}, {
			flButtons: flButtons,
			flTabIndicator: flTabIndicator
		});
		
		//assign the children of flInputs
		flInputs.children = Object.assign({}, {
			flFirstLine: flFirstLine
		});
		
		//assign the children of flButtons
		flButtons.children = Object.assign({}, {
			btnName: btnName,
			btnCard: btnCard
		});
		
		//assign the children of flFirstLine
		flFirstLine.children = Object.assign({}, {
			flNameInput: flNameInput,
			flCardInput: flCardInput
		});
		
		//assign the children of flTabIndicator
		flTabIndicator.children = Object.assign({}, {
			placeHolderLeft: placeHolderLeft,
			flTabHighlight: flTabHighlight,
			placeHolderRight: placeHolderRight
		});
		
		//assign the children of flNameInput
		flNameInput.children = Object.assign({}, {
			flNameIcon: flNameIcon,
			flNameInputArea: flNameInputArea
		});
		
		//assign the children of flCardInput
		flCardInput.children = Object.assign({}, {
			flCardIcon: flCardIcon,
			flCardInputArea: flCardInputArea
		});
		
		//assign the children of flNameIcon
		flNameIcon.children = Object.assign({}, {
			imgName: imgName
		});
		
		//assign the children of flCardIcon
		flCardIcon.children = Object.assign({}, {
			imgCard: imgCard
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		visible: true,
		color: Color.create(255, 44, 50, 57),
		style: StatusBarStyle.DEFAULT
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
		title: "Search",
		titleColor: Color.create(255, 255, 255, 255)
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create("#FFFFFF"),
		alignContent: FlexLayout.AlignContent.STRETCH,
		alignItems: FlexLayout.AlignItems.STRETCH,
		direction: FlexLayout.Direction.INHERIT,
		flexDirection: FlexLayout.FlexDirection.COLUMN,
		flexWrap: FlexLayout.FlexWrap.NOWRAP,
		justifyContent: FlexLayout.JustifyContent.FLEX_START
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgCustomerFilter_);
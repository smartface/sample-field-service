/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Button = require('sf-core/ui/button');
const ActivityIndicator = require('sf-core/ui/activityindicator');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgLogin_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		}, props || {}));

		const flLeftStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
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
		var flLeft = new FlexLayout(flLeftStyle);
		this.layout.addChild(flLeft);
		
		const flMiddleStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			marginBottom: 133.81,
			marginTop: 59.31,
			bottom: null,
			height: null,
			top: null,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.SPACE_AROUND,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 5
		});
		var flMiddle = new FlexLayout(flMiddleStyle);
		this.layout.addChild(flMiddle);
		
		const flRightStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
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
		var flRight = new FlexLayout(flRightStyle);
		this.layout.addChild(flRight);
		
		const imgLogoStyle = getCombinedStyle(".imageView", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 67,
			image: Image.createFromFile("images://logo.png"),
			imageFillType: ImageFillType.NORMAL,
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var imgLogo = new ImageView(imgLogoStyle);
		flMiddle.addChild(imgLogo);
		this.imgLogo = imgLogo;

		const flTextsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 90,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flTexts = new FlexLayout(flTextsStyle);
		flMiddle.addChild(flTexts);
		
		const flInputsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 95,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flInputs = new FlexLayout(flInputsStyle);
		flMiddle.addChild(flInputs);
		this.flInputs = flInputs;

		const flButtonStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			height: 63,
			visible: true,
			width: null,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			flexDirection: FlexLayout.FlexDirection.ROW_REVERSE,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			justifyContent: FlexLayout.JustifyContent.FLEX_END,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var flButton = new FlexLayout(flButtonStyle);
		flMiddle.addChild(flButton);
		
		const lblTitleStyle = getCombinedStyle(".label", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 60, 67, 80),
			height: 37,
			text: "Field Services",
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			font: Font.create("Arial", 27.5, Font.NORMAL)
		});
		var lblTitle = new Label(lblTitleStyle);
		flTexts.addChild(lblTitle);
		
		const btnLoginStyle = getCombinedStyle(".button", {
			backgroundColor: Color.create(255, 6, 190, 189),
			alpha: 1,
			borderRadius: 32.5,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 0,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 255, 255, 255),
			right: 0,
			bottom: 0,
			height: null,
			left: 0,
			text: "Login",
			top: 0,
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			font: Font.create("default", 18, Font.NORMAL)
		});
		var btnLogin = new Button(btnLoginStyle);
		flButton.addChild(btnLogin);
		this.btnLogin = btnLogin;

		const lblSubTitleStyle = getCombinedStyle(".label", {
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 105, 109, 111),
			height: 44,
			multiline: true,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
			visible: true,
			width: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			font: Font.create("Arial", 15, Font.NORMAL)
		});
		var lblSubTitle = new Label(lblSubTitleStyle);
		flTexts.addChild(lblSubTitle);
		
		const aiLoginStyle = getCombinedStyle(".activityIndicator", {
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			marginBottom: null,
			marginRight: null,
			marginTop: null,
			height: 42,
			visible: true,
			width: 42,
			color: Color.create(255, 44, 50, 57),
			minHeight: 21,
			minWidth: 21,
			marginLeft: 20,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var aiLogin = new ActivityIndicator(aiLoginStyle);
		flButton.addChild(aiLogin);
		this.aiLogin = aiLogin;

		//assign the children to page 
		this.children = Object.assign({}, {
			flLeft: flLeft,
			flMiddle: flMiddle,
			flRight: flRight
		});
		
		//assign the children of flMiddle
		flMiddle.children = Object.assign({}, {
			imgLogo: imgLogo,
			flTexts: flTexts,
			flInputs: flInputs,
			flButton: flButton
		});
		
		//assign the children of flTexts
		flTexts.children = Object.assign({}, {
			lblTitle: lblTitle,
			lblSubTitle: lblSubTitle
		});
		
		//assign the children of flButton
		flButton.children = Object.assign({}, {
			btnLogin: btnLogin,
			aiLogin: aiLogin
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		visible: true,
		color: Color.create(26, 255, 255, 255)
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		backgroundColor: Color.create("#FFFFFF"),
		visible: false,
		title: "newPage001",
		titleColor: Color.create("#000000")
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
		flexDirection: FlexLayout.FlexDirection.ROW,
		flexWrap: FlexLayout.FlexWrap.NOWRAP,
		justifyContent: FlexLayout.JustifyContent.FLEX_START
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgLogin_);
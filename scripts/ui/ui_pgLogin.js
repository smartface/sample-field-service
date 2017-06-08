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



const PgLogin_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var flLeft = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(flLeft);
		
		var flMiddle = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.SPACE_AROUND,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 5,
			marginTop: 59.31,
			marginBottom: 133.81,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(flMiddle);
		
		var flRight = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(flRight);
		
		var imgLogo = new ImageView({
			height: 67,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://logo.png"),
			imageFillType: ImageFillType.NORMAL
		}); 
		flMiddle.addChild(imgLogo);
		
		var flTexts = new FlexLayout({
			height: 90,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flMiddle.addChild(flTexts);
		
		var flInputs = new FlexLayout({
			height: 95,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flMiddle.addChild(flInputs);
		this.flInputs = flInputs;
		var flButton = new FlexLayout({
			height: 65,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.FLEX_END,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flMiddle.addChild(flButton);
		
		var lblTitle = new Label({
			height: 37,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 60, 67, 80),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Customer Services"
		});
		lblTitle.font = Font.create("Arial", 27.5, Font.NORMAL); 
		flTexts.addChild(lblTitle);
		
		var btnLogin = new Button({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 6, 190, 189),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 255, 255, 255),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 32.5,
			visible: true,
			text: "Login"
		});
		btnLogin.font = Font.create("default", 18, Font.NORMAL); 
		flButton.addChild(btnLogin);
		this.btnLogin = btnLogin;
		var lblSubTitle = new Label({
			height: 44,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 105, 109, 111),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
			multiline: true
		});
		lblSubTitle.font = Font.create("Arial", 15, Font.NORMAL); 
		flTexts.addChild(lblSubTitle);
		
		var aiLogin = new ActivityIndicator({
			width: 65,
			height: 65,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginRight: 20,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			color: Color.create("#ADADAD")
		}); 
		flButton.addChild(aiLogin);
		this.aiLogin = aiLogin;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			flLeft: flLeft,
			flMiddle: flMiddle,
			flRight: flRight
		});
		
		//assign the children of flMiddle
		flMiddle.children =  Object.assign({}, {
			imgLogo: imgLogo,
			flTexts: flTexts,
			flInputs: flInputs,
			flButton: flButton
		});
		
		//assign the children of flTexts
		flTexts.children =  Object.assign({}, {
			lblTitle: lblTitle,
			lblSubTitle: lblSubTitle
		});
		
		//assign the children of flButton
		flButton.children =  Object.assign({}, {
			btnLogin: btnLogin,
			aiLogin: aiLogin
		});

});

function onLoad() { 

  this.headerBar.title = "newPage001";
  this.headerBar.titleColor = Color.create("#000000");
  this.headerBar.backgroundColor = Color.create("#FFFFFF");
  this.headerBar.visible = false;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create(255, 255, 255, 255));
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.backgroundColor = Color.create("#FFFFFF");

}

module && (module.exports = PgLogin_);
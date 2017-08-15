/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Button = require('sf-core/ui/button');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgCustomerDetails_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const btnBackStyle = getCombinedStyle(".button", {
			text: "<",
			backgroundColor: Color.create(0, 0, 161, 241),
			textColor: Color.create(255, 0, 0, 0),
			width: 10.5,
			height: 19.56,
			left: 12,
			top: 30,
			visible: false,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});  
		var btnBack = new Button(btnBackStyle);  
		this.layout.addChild(btnBack);
		this.btnBack = btnBack;
	
		const flCustomerTopStyle = getCombinedStyle(".flexLayout", {
			height: 90,
			width: 249,
			backgroundColor: Color.create(0, 255, 255, 255),
			marginLeft: null,
			marginTop: 5,
			paddingLeft: 1,
			paddingRight: 1,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			flexDirection: FlexLayout.FlexDirection.ROW,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			alignItems: FlexLayout.AlignItems.CENTER
		});  
		var flCustomerTop = new FlexLayout(flCustomerTopStyle);  
		this.layout.addChild(flCustomerTop);
			
		const lblNameStyle = getCombinedStyle(".label", {
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 36, 42, 52),
			height: 32,
			width: null,
			marginTop: 14.64,
			text: "Adam Stewart",
			alignSelf: FlexLayout.AlignSelf.AUTO,
			font: Font.create("Lato", 24, Font.NORMAL)
		});  
		var lblName = new Label(lblNameStyle);  
		if(lblNameStyle.scrollEnabled === false)
			lblName.ios && (lblName.ios.scrollEnabled = false);
		this.layout.addChild(lblName);
		this.lblName = lblName;
	
		const lblTitleStyle = getCombinedStyle(".label", {
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(255, 47, 55, 68),
			height: 25,
			width: null,
			text: " Lorem Ipsum",
			alignSelf: FlexLayout.AlignSelf.AUTO,
			font: Font.create("Lato", 18, Font.NORMAL)
		});  
		var lblTitle = new Label(lblTitleStyle);  
		if(lblTitleStyle.scrollEnabled === false)
			lblTitle.ios && (lblTitle.ios.scrollEnabled = false);
		this.layout.addChild(lblTitle);
		this.lblTitle = lblTitle;
	
		const flLineStyle = getCombinedStyle(".flexLayout", {
			height: 0.5,
			width: null,
			marginLeft: 24.5,
			marginRight: 25.39,
			backgroundColor: Color.create(255, 91, 198, 149),
			marginTop: 21.25
		});  
		var flLine = new FlexLayout(flLineStyle);  
		this.layout.addChild(flLine);
		this.flLine = flLine;
	
		const flWaitStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			left: 0,
			right: 0,
			bottom: 0,
			top: 2,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER
		});  
		var flWait = new FlexLayout(flWaitStyle);  
		this.layout.addChild(flWait);
		this.flWait = flWait;
	
		const btnShareStyle = getCombinedStyle(".button", {
			backgroundColor: Color.create(255, 244, 244, 244),
			borderRadius: 25,
			height: 50,
			width: 50,
			marginTop: null,
			text: null
		});  
		var btnShare = new Button(btnShareStyle);  
		flCustomerTop.addChild(btnShare);
		this.btnShare = btnShare;
	
		const aiWaitStyle = getCombinedStyle(".activityIndicator", {
			minHeight: 21,
			minWidth: 21
		});  
		var aiWait = new ActivityIndicator(aiWaitStyle);  
		flWait.addChild(aiWait);
		this.aiWait = aiWait;
	
		const imgCustomerPictureStyle = getCombinedStyle(".imageView", {
			width: 88,
			height: 88,
			marginTop: null,
			image: Image.createFromFile("images://customer_detail_picture.png"),
			imageFillType: ImageFillType.ASPECTFIT,
			borderWidth: 0.5,
			borderColor: Color.create(255, 91, 198, 149),
			borderRadius: 44,
			alignSelf: FlexLayout.AlignSelf.CENTER
		});  
		var imgCustomerPicture = new ImageView(imgCustomerPictureStyle);  
		flCustomerTop.addChild(imgCustomerPicture);
		this.imgCustomerPicture = imgCustomerPicture;
	
		const btnAddToContactsStyle = getCombinedStyle(".button", {
			backgroundColor: Color.create(255, 244, 244, 244),
			borderRadius: 25,
			height: 50,
			width: 50,
			marginTop: null,
			text: null
		});  
		var btnAddToContacts = new Button(btnAddToContactsStyle);  
		flCustomerTop.addChild(btnAddToContacts);
		this.btnAddToContacts = btnAddToContacts;
	
		//assign the children to page 
		this.children = Object.assign({}, {
			btnBack: btnBack,
			flCustomerTop: flCustomerTop,
			lblName: lblName,
			lblTitle: lblTitle,
			flLine: flLine,
			flWait: flWait
		});
		
		//assign the children of flCustomerTop
		flCustomerTop.children = Object.assign({}, {
			btnShare: btnShare,
			imgCustomerPicture: imgCustomerPicture,
			btnAddToContacts: btnAddToContacts
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
		color: Color.create(255, 44, 50, 57)
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		title: "Customer Details",
		visible: true
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create(255, 255, 255, 255)
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgCustomerDetails_);
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
const Button = require('sf-core/ui/button');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgNewCustomer_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const flContentStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			top: 34,
			width: null,
			height: null,
			left: 21,
			right: 15,
			bottom: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flContent = new FlexLayout(flContentStyle);
		this.layout.addChild(flContent);
		
		const flNameSurnamePictureStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: 88.76,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flNameSurnamePicture = new FlexLayout(flNameSurnamePictureStyle);
		flContent.addChild(flNameSurnamePicture);
		
		const flEmailRowStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 33,
			marginTop: 42,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flEmailRow = new FlexLayout(flEmailRowStyle);
		flContent.addChild(flEmailRow);
		
		const flPhoneRowStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 33,
			marginTop: 24,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flPhoneRow = new FlexLayout(flPhoneRowStyle);
		flContent.addChild(flPhoneRow);
		
		const flAddressRowStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 33,
			marginTop: 24,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flAddressRow = new FlexLayout(flAddressRowStyle);
		flContent.addChild(flAddressRow);
		
		const imgAddressStyle = getCombinedStyle(".imageView", {
			width: 43.5,
			height: null,
			image: Image.createFromFile("images://new_customer_location.png")
		});
		var imgAddress = new ImageView(imgAddressStyle);
		flAddressRow.addChild(imgAddress);
		
		const btnPictureStyle = getCombinedStyle(".button", {
			height: 73,
			width: 73,
			text: null,
			borderRadius: 36.5,
			borderColor: Color.create(255, 151, 151, 151),
			borderWidth: 0.5,
			backgroundColor: Color.create(255, 255, 255, 255)
		});
		var btnPicture = new Button(btnPictureStyle);
		flNameSurnamePicture.addChild(btnPicture);
		this.btnPicture = btnPicture;

		const imgEmailStyle = getCombinedStyle(".imageView", {
			width: 43.5,
			height: null,
			image: Image.createFromFile("images://new_customer_email.png")
		});
		var imgEmail = new ImageView(imgEmailStyle);
		flEmailRow.addChild(imgEmail);
		
		const imgPhoneStyle = getCombinedStyle(".imageView", {
			width: 43.5,
			height: null,
			image: Image.createFromFile("images://new_customer_phone.png")
		});
		var imgPhone = new ImageView(imgPhoneStyle);
		flPhoneRow.addChild(imgPhone);
		
		const flNameSurnameStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			marginLeft: 18,
			flexGrow: 1,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN
		});
		var flNameSurname = new FlexLayout(flNameSurnameStyle);
		flNameSurnamePicture.addChild(flNameSurname);
		
		const flEmailStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1
		});
		var flEmail = new FlexLayout(flEmailStyle);
		flEmailRow.addChild(flEmail);
		this.flEmail = flEmail;

		const flPhoneStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1
		});
		var flPhone = new FlexLayout(flPhoneStyle);
		flPhoneRow.addChild(flPhone);
		this.flPhone = flPhone;

		const flAddressStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1
		});
		var flAddress = new FlexLayout(flAddressStyle);
		flAddressRow.addChild(flAddress);
		this.flAddress = flAddress;

		const flNameStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 33
		});
		var flName = new FlexLayout(flNameStyle);
		flNameSurname.addChild(flName);
		this.flName = flName;

		const flSurnameStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 33
		});
		var flSurname = new FlexLayout(flSurnameStyle);
		flNameSurname.addChild(flSurname);
		this.flSurname = flSurname;

		//assign the children to page 
		this.children = Object.assign({}, {
			flContent: flContent
		});
		
		//assign the children of flContent
		flContent.children = Object.assign({}, {
			flNameSurnamePicture: flNameSurnamePicture,
			flEmailRow: flEmailRow,
			flPhoneRow: flPhoneRow,
			flAddressRow: flAddressRow
		});
		
		//assign the children of flNameSurnamePicture
		flNameSurnamePicture.children = Object.assign({}, {
			btnPicture: btnPicture,
			flNameSurname: flNameSurname
		});
		
		//assign the children of flEmailRow
		flEmailRow.children = Object.assign({}, {
			imgEmail: imgEmail,
			flEmail: flEmail
		});
		
		//assign the children of flPhoneRow
		flPhoneRow.children = Object.assign({}, {
			imgPhone: imgPhone,
			flPhone: flPhone
		});
		
		//assign the children of flAddressRow
		flAddressRow.children = Object.assign({}, {
			imgAddress: imgAddress,
			flAddress: flAddress
		});
		
		//assign the children of flNameSurname
		flNameSurname.children = Object.assign({}, {
			flName: flName,
			flSurname: flSurname
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
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
		title: "New Customer",
		backgroundColor: Color.create(255, 44, 50, 57),
		titleColor: Color.create(255, 255, 255, 255)
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

module && (module.exports = PgNewCustomer_);
/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Switch = require('sf-core/ui/switch');
const Label = require('sf-core/ui/label');
const Font = require('sf-core/ui/font');
const TextAlignment = require('sf-core/ui/textalignment');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgSettings_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const flThemeStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: 48.5,
			marginLeft: 20,
			marginRight: 15,
			marginTop: 28.5,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flTheme = new FlexLayout(flThemeStyle);
		this.layout.addChild(flTheme);
		
		const flNotificationsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: 41.5,
			marginLeft: 20,
			marginRight: 15,
			marginTop: 20,
			flexDirection: FlexLayout.FlexDirection.ROW_REVERSE,
			alignItems: FlexLayout.AlignItems.CENTER
		});
		var flNotifications = new FlexLayout(flNotificationsStyle);
		this.layout.addChild(flNotifications);
		
		const flTextsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: null,
			marginLeft: 20,
			marginRight: 15,
			marginTop: 61.3,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN
		});
		var flTexts = new FlexLayout(flTextsStyle);
		this.layout.addChild(flTexts);
		
		const swNotificationsStyle = getCombinedStyle(".switch", {
			minWidth: 37,
			minHeight: 20,
			width: null,
			thumbOnColor: Color.create(255, 80, 210, 194),
			toggleOnColor: Color.create(128, 131, 108, 179)
		});
		var swNotifications = new Switch(swNotificationsStyle);
		if(swNotificationsStyle.toggleOffColor)
			swNotifications.android && (swNotifications.android.toggleOffColor = swNotificationsStyle.toggleOffColor);
		flNotifications.addChild(swNotifications);
		this.swNotifications = swNotifications;

		const lblThemeStyle = getCombinedStyle(".label", {
			text: "Theme",
			width: null,
			height: null,
			textColor: Color.create(255, 29, 29, 38),
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1,
			font: Font.create("Lato", 14, Font.NORMAL)
		});
		var lblTheme = new Label(lblThemeStyle);
		flTheme.addChild(lblTheme);
		
		const lblAboutStyle = getCombinedStyle(".label", {
			width: null,
			text: "About v1.0.0",
			height: 16,
			textColor: Color.create(255, 29, 29, 38),
			backgroundColor: Color.create(0, 255, 255, 255),
			font: Font.create("Arial", 14, Font.NORMAL)
		});
		var lblAbout = new Label(lblAboutStyle);
		flTexts.addChild(lblAbout);
		this.lblAbout = lblAbout;

		const lblTextStyle = getCombinedStyle(".label", {
			width: null,
			text: "Lorem ipsum dolor sit amet, veniam melius duo ei, ea his esse sonet, eu rebum tation vituperatoribus his. Lorem ipsum dolor sit amet, veniam melius duo ei eu rebum tation vituperatoribus his.",
			height: null,
			textColor: Color.create(255, 155, 155, 155),
			backgroundColor: Color.create(0, 255, 255, 255),
			multiline: true,
			textAlignment: TextAlignment.TOPLEFT,
			marginTop: 11,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});
		var lblText = new Label(lblTextStyle);
		flTexts.addChild(lblText);
		this.lblText = lblText;

		const lblNotificationsStyle = getCombinedStyle(".label", {
			text: "Notification",
			width: null,
			height: null,
			textColor: Color.create(255, 29, 29, 38),
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			font: Font.create("Lato", 14, Font.NORMAL)
		});
		var lblNotifications = new Label(lblNotificationsStyle);
		flNotifications.addChild(lblNotifications);
		
		const flThemeSelectionsStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: 68,
			height: null,
			flexGrow: null,
			flexDirection: FlexLayout.FlexDirection.ROW_REVERSE,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN
		});
		var flThemeSelections = new FlexLayout(flThemeSelectionsStyle);
		flTheme.addChild(flThemeSelections);
		
		const flLineThemeStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 0.5,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 80, 210, 194),
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flLineTheme = new FlexLayout(flLineThemeStyle);
		flTheme.addChild(flLineTheme);
		this.flLineTheme = flLineTheme;

		const flLineNotificationsStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 0.5,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 80, 210, 194),
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flLineNotifications = new FlexLayout(flLineNotificationsStyle);
		flNotifications.addChild(flLineNotifications);
		this.flLineNotifications = flLineNotifications;

		const flPurpleSelectionStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: 30,
			height: 30.42,
			borderColor: Color.create(255, 195, 195, 195),
			borderWidth: 1,
			borderRadius: 6,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER
		});
		var flPurpleSelection = new FlexLayout(flPurpleSelectionStyle);
		flThemeSelections.addChild(flPurpleSelection);
		this.flPurpleSelection = flPurpleSelection;

		const flNavySelectionStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: 30,
			height: 30.42,
			borderColor: Color.create(255, 195, 195, 195),
			borderWidth: 1,
			borderRadius: 6,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER
		});
		var flNavySelection = new FlexLayout(flNavySelectionStyle);
		flThemeSelections.addChild(flNavySelection);
		this.flNavySelection = flNavySelection;

		const flNavyStyle = getCombinedStyle(".flexLayout", {
			width: 20,
			height: 20.28,
			borderRadius: 3,
			backgroundColor: Color.create(255, 44, 50, 57),
			borderWidth: 0.5,
			borderColor: Color.create(255, 44, 50, 57)
		});
		var flNavy = new FlexLayout(flNavyStyle);
		flNavySelection.addChild(flNavy);
		
		const flPurpleStyle = getCombinedStyle(".flexLayout", {
			width: 20,
			height: 20.28,
			borderRadius: 3,
			backgroundColor: Color.create(255, 131, 108, 179),
			borderWidth: 0.5,
			borderColor: Color.create(255, 131, 108, 179)
		});
		var flPurple = new FlexLayout(flPurpleStyle);
		flPurpleSelection.addChild(flPurple);
		
		//assign the children to page 
		this.children = Object.assign({}, {
			flTheme: flTheme,
			flNotifications: flNotifications,
			flTexts: flTexts
		});
		
		//assign the children of flTheme
		flTheme.children = Object.assign({}, {
			lblTheme: lblTheme,
			flThemeSelections: flThemeSelections,
			flLineTheme: flLineTheme
		});
		
		//assign the children of flNotifications
		flNotifications.children = Object.assign({}, {
			swNotifications: swNotifications,
			lblNotifications: lblNotifications,
			flLineNotifications: flLineNotifications
		});
		
		//assign the children of flTexts
		flTexts.children = Object.assign({}, {
			lblAbout: lblAbout,
			lblText: lblText
		});
		
		//assign the children of flThemeSelections
		flThemeSelections.children = Object.assign({}, {
			flPurpleSelection: flPurpleSelection,
			flNavySelection: flNavySelection
		});
		
		//assign the children of flPurpleSelection
		flPurpleSelection.children = Object.assign({}, {
			flPurple: flPurple
		});
		
		//assign the children of flNavySelection
		flNavySelection.children = Object.assign({}, {
			flNavy: flNavy
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
		title: "Settings",
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

module && (module.exports = PgSettings_);
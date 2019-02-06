/*globals lang*/
const theme = require("../lib/theme");
const extend = require('js-base/core/extend');
const Router = require("../router/index");
const DialogWaitDesign = require('library/DialogWait');
const Dialog = require("sf-core/ui/dialog");
const Page = require('sf-core/ui/page');
const Animator = require('sf-core/ui/animator');
const System = require('sf-core/device/system');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const addChild = require("@smartface/contx/lib/smartface/action/addChild");
const Screen = require('sf-core/device/screen');
const Color = require('sf-core/ui/color');


const DialogWait = extend(DialogWaitDesign)(
	//constructor
	function(_super, props, pageName) {
		var dialogWait = this;
		_super(dialogWait, props || DialogWaitDesign.defaults);
		dialogWait.pageName = pageName;
		var selectedTheme = theme[theme.selected];
		dialogWait.aiWait.color = selectedTheme.topBarColor;
		dialogWait.imgCheck.image = selectedTheme.checkImage;
		dialogWait.imgCheck.alpha = 1;
		dialogWait.lblSaving.text = lang.savingCustomer;
		dialogWait.lblSaving.textColor = selectedTheme.topBarColor;

		dialogWait.aiWait.ios.type = ActivityIndicator.iOS.Type.WHITELARGE;

		dialogWait.showOK = function(callback) {
			dialogWait.aiWait.visible = false;
			dialogWait.lblSaving.visible = false;
			dialogWait.flCheck.visible = true;
			dialogWait.applyLayout();

			var dialogObject = (dialogWait.dialogObject && dialogWait.dialogObject.layout) || dialogWait.getParent();
			var animationParent = System.OS === "Android" ? dialogWait.flWaitWhite : dialogObject;

			setTimeout(() => {
				Animator.animate(animationParent, 1000, function() {
					dialogWait.imgCheck.alpha = 0.05;
				}).complete(function() {
					callback && callback();
				});
			}, 200);

		};
	}
);

DialogWait.show = function showWaitdialog(page) {
	if (!page)
		page = Router.getState();
		
	var sliderDrawer = require("../sliderDrawer");
	var sliderDrawerEnableChanged = false;
	var headerBarLeftItemChanged = false;
	var headerBarItemsChanged = [];
	var headerBar;
	var backButtonPressed = null;

	var dialogWait = Object.assign(new DialogWait(), {
		visible: true,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	});
	dialogWait.top = (Screen.height / 2) - 100;


	var waitDialog = new Dialog();
	dialogWait.dialogObject = waitDialog;
	showDialog();

	function showDialog() {
		sliderDrawerEnableChanged = false;
		headerBarLeftItemChanged = false;
		headerBarItemsChanged = [];

		if (sliderDrawer.enabled) {
			sliderDrawer.enabled = false;
			sliderDrawer.hide();
			sliderDrawerEnableChanged = true;
		}
		if (page instanceof Page) {
			if (page.headerBar.visible) {
				headerBar = page.headerBar;
				if (headerBar.leftItem && headerBar.leftItem.enabled) {
					headerBar.leftItem.enabled = true;
					headerBarLeftItemChanged = true;
				}
				if (headerBar.items && headerBar.items instanceof Array) {
					for (var i = 0; i < headerBar.items.length; i++) {
						var item = headerBar.items[i];
						if (item.enabled) {
							item.enabled = false;
							headerBarItemsChanged[i] = true;
						}
					}
				}
			}
			backButtonPressed = page.android.onBackButtonPressed;
			page.android.onBackButtonPressed = empty;
		}
		waitDialog.layout.backgroundColor = Color.create(0, 0, 0, 255);
		waitDialog.layout.addChild(dialogWait, "dialogWait");
		waitDialog.show();
		waitDialog.layout.applyLayout();
	}


	function hideDialog() {
		if (sliderDrawerEnableChanged)
			sliderDrawer.enabled = true;
		if (headerBarLeftItemChanged)
			headerBar.leftItem.enabled = true;
		for (var i in headerBarItemsChanged) {
			headerBar.items[i].enabled = true;
		}
		page.onBackButtonPressed = backButtonPressed;
		waitDialog.hide();
	}

	return {
		show: showDialog,
		hide: hideDialog,
		showOK: dialogWait.showOK
	};
};

function empty() {}

module && (module.exports = DialogWait);

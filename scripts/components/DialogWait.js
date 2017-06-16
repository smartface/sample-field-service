const theme = require("../lib/theme");
const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const DialogWaitDesign = require('library/DialogWait');
const Dialog = require("sf-core/ui/dialog");
const Page = require('sf-core/ui/page');
const DialogWait = extend(DialogWaitDesign)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, props || DialogWaitDesign.defaults);
		this.pageName = pageName;
		var selectedTheme = theme[theme.selected];
		this.aiWait.color = selectedTheme.topBarColor;
	}

);

DialogWait.show = function showWaitdialog(page) {
	if (!page)
		page = Router.getCurrent();
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
	
	var waitDialog = new Dialog();
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
		waitDialog.layout.addChild(dialogWait);
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
		hide: hideDialog
	};
};

function empty() {}

module && (module.exports = DialogWait);

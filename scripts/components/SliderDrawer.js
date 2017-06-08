/*globals lang*/
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const SliderDrawer = require('library/SliderDrawer');

const SliderDrawer_ = extend(SliderDrawer)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, props || SliderDrawer.defaults);
		this.pageName = pageName;

		this.btnSigout.onPress = function() {
			if (touchControl.target) {
				touchControl.target.alpha = 1;
			}
			alert("signout");
		};


		var touchControl = {};

		mimicPressed(this.flSettings, function() {
			alert("settings pressed");
		}, touchControl);

		mimicPressed(this.flDashboard, function() {
			alert("dashboard");
		}, touchControl);

		mimicPressed(this.flCustomers, function() {
			alert("customers");
		}, touchControl);

		mimicPressed(this.flGroupNotifications, function() {
			alert("group notifications");
		}, touchControl);

		mimicPressed(this.flOpenNotifications, function() {
			alert("open notifications");
		}, touchControl);

		this.onTouchEnded = function() {
			if (touchControl.target) {
				touchControl.target.alpha = 1;
			}
		};

		this.whenHide = function whenHide() {
			if (touchControl.target) {
				touchControl.target.alpha = 1;
			}
		};



		this.btnSigout.text = lang.signout;
		this.lblSettings.text = lang.settings;
		this.lblDashboard.text = lang.dashboard;
		this.lblCustomers.text = lang.customers;
		this.lblNotifications.text = lang.notifications;
		this.lblGroupNotifications.text = lang.groupNotifications;
		this.lblOpenNotifications.text = lang.openNotifications;

	}

);


function mimicPressed(target, eventFunction, touchControl) {
	for (var i in target.children) {
		let child = target.children[i];
		child.touchEnabled = false;
	}


	target.onTouch = function(e) {
		if (touchControl.target) {
			touchControl.target.alpha = 1;
		}
		touchControl.target = target;
		target.alpha = 0.5;
	};

	target.onTouchEnded = function(e) {
		if (eventFunction && touchControl.target === target) {
			eventFunction.call(target, e);
		}
		if (touchControl.target) {
			touchControl.target.alpha = 1;
		}
		touchControl.target = null;
	};
}


module && (module.exports = SliderDrawer_);

/*globals lang*/
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const SliderDrawer = require('library/SliderDrawer');
const mcs = require("../lib/mcs");
const DialogWait = require("./DialogWait");
const SliderDrawer_ = extend(SliderDrawer)(
	//constructor
	function(_super, props, pageName) {
		_super(this, props || SliderDrawer.defaults);
		this.pageName = pageName;

		this.btnSigout.onPress = function() {
			hide();
			if (touchControl.target) {
				touchControl.target.alpha = 1;
			}
			mcs.logout();
			Router.goBack("pgLogin");
		};


		var touchControl = {};

		mimicPressed(this.flSettings, function() {
			hide();
			alert("settings pressed");
		}, touchControl);

		mimicPressed(this.flDashboard, function() {
			hide();
			Router.goBack("pgDashboard");

		}, touchControl);

		mimicPressed(this.flCustomers, function() {
			hide();
			alert("customers");
		}, touchControl);

		mimicPressed(this.flGroupNotifications, function() {
			hide();
			Router.go("pgNotification");
		}, touchControl);

		mimicPressed(this.flOpenNotifications, function() {
			hide();
			var dialogWait = DialogWait.show();
			const notifications = require("../model/notifications");
			notifications.getNotifications(function(err, notificationsData) {
				dialogWait.hide();
				console.log("after getting notifications. Is there error? " + !!err);
				if (err) {
					return alert(JSON.stringify(err), "Notifications Service Error");
				}

				Router.go("pgNotification", notificationsData);
			});
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

function hide() {
	var sliderDrawer = require("../sliderDrawer");
	sliderDrawer.hide();
}


module && (module.exports = SliderDrawer_);
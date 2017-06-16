/*globals lang*/
const Application = global.Application;
const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const SliderDrawer = require('library/SliderDrawer');
const DialogWait = require("./DialogWait");
const user = require("../lib/user");

const SliderDrawer_ = extend(SliderDrawer)(
	//constructor
	function(_super, props, pageName) {
		var self = this;
		_super(this, props || SliderDrawer.defaults);
		this.pageName = pageName;
		var touchControl = {};


		mimicPressed(this.flSignout, function() {
			user.logOut(function(err, loggingOut) {
				if (err) return;
				if (loggingOut) {
					hide();
					if (touchControl.target) {
						touchControl.target.alpha = 1;
					}
				}
			});

		}, touchControl);

		mimicPressed(this.flDashboard, function() {
			hide();
			Router.goBack("pgDashboard");
			moveHighlight(0);
		}, touchControl);

		mimicPressed(this.flCustomers, function() {
			hide();
			Router.go("pgCustomerFilter", {
				reset: true
			});
			moveHighlight(1);
		}, touchControl);

		mimicPressed(this.flNotifications, function() {
			hide();
			var dialogWait = DialogWait.show();
			const notifications = require("../model/notifications");
			notifications.getNotifications(function(err, notificationsData) {
				dialogWait.hide();
				console.log("after getting notifications. Is there error? " + !!err);
				if (err) {
					return alert(JSON.stringify(err), "Notifications Service Error");
				}
				moveHighlight(2);
				Router.go("pgNotification", {
					notificationsData: notificationsData,
					from: "sliderDrawer"
				});
			});

		}, touchControl);

		mimicPressed(this.flSettings, function() {
			hide();
			Router.go("pgSettings");
			moveHighlight(3);
		}, touchControl);

		function moveHighlight(index) {
			var target = {
				top: 30 + ((30 + 22) * index),
				height: 22
			};
			var flHighlightHeight = 47.42;

			var top = Math.round(target.top + ((target.height - flHighlightHeight) / 2), 2);
			self.flHighlight.top = top;
			self.flHighlight.applyLayout();
		}
		this.moveHighlight = moveHighlight;

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

		this.lblSignout.text = lang.signout;
		this.lblSettings.text = lang.settings;
		this.lblDashboard.text = lang.dashboard;
		this.lblCustomers.text = lang.customers;
		this.lblNotifications.text = lang.notifications;
		this.lblVersion.text = "v" + Application.version;

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

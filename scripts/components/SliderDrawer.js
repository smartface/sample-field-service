/*globals lang*/
const Application = require("sf-core/application");
const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const SliderDrawer = require('library/SliderDrawer');
const user = require("../lib/user");
const mimicPressed = require("../lib/ui/mimicPressed");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");

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
			Router.goBack("pgDashboard", null, false);
			moveHighlight(0);
		}, touchControl);

		mimicPressed(this.flCustomers, function() {
			hide();
			Router.go("pgCustomerFilter", {
				reset: true
			}, false);
			moveHighlight(1);
		}, touchControl);

		mimicPressed(this.flNotifications, function() {
			hide();
			moveHighlight(2);
			Router.go("pgNotification", {
				from: "sliderDrawer"
			}, false);
		}, touchControl);

		mimicPressed(this.flSettings, function() {
			hide();
			Router.go("pgSettings", null, false);
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

		componentContextPatch(this, "sliderDrawer");
	}
);

function hide() {
	var sliderDrawer = require("../sliderDrawer");
	sliderDrawer.hide();
}

module && (module.exports = SliderDrawer_);

const theme = require("../lib/theme");
const extend = require('js-base/core/extend');

const CustomerActionRowDesign = require('library/CustomerActionRow');

const CustomerActionRow = extend(CustomerActionRowDesign)(
	//constructor
	function(_super, props, pageName) {
		var customerActionRow = this;
		_super(this, props || CustomerActionRowDesign.defaults);
		this.pageName = pageName;
		var selectedTheme = theme[theme.selected];
		customerActionRow.flCustomerActionLine.backgroundColor = selectedTheme.lineSeparator;

		Object.defineProperties(customerActionRow, {
			showLine: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerActionRow.flCustomerActionLine.visible;
				},
				set: function(value) {
					return customerActionRow.flCustomerActionLine.visible = value;
				}
			},
			fieldName: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerActionRow.lblActionName.text;
				},
				set: function(value) {
					return customerActionRow.lblActionName.text = value;
				}
			},
			count: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerActionRow.lblCount.text;
				},
				set: function(value) {
					if (!value)
						value = "";
					return customerActionRow.lblCount.text = value;
				}
			},
			onPress: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerActionRow.btnAction.onPress;
				},
				set: function(value) {
					return customerActionRow.btnAction.onPress = value;
				}
			}
		});
	}

);

module && (module.exports = CustomerActionRow);

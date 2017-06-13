/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Color = require('sf-core/ui/color');
const gradientColor = Color.createGradient({
	direction: Color.GradientDirection.HORIZONTAL,
	startColor: Color.create("#06BEBD"),
	endColor: Color.create("#B7CE63")
});
const CustomerActionRowDesign = require('library/CustomerActionRow');

const CustomerActionRow = extend(CustomerActionRowDesign)(
	//constructor
	function(_super, props, pageName) {
		var customerActionRow = this;
		_super(this, props || CustomerActionRowDesign.defaults);
		this.pageName = pageName;

		customerActionRow.flCustomerActionLine.backgroundColor = gradientColor;

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

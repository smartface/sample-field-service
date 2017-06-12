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
const CustomerDetailRowDesign = require('library/CustomerDetailRow');

const CustomerDetailRow = extend(CustomerDetailRowDesign)(
	//constructor
	function(_super, props, pageName) {
		var customerDetailRow = this;
		_super(this, props || CustomerDetailRowDesign.defaults);
		this.pageName = pageName;
		this.flCustomerDetailLine.backgroundColor = gradientColor;


		Object.defineProperties(customerDetailRow, {
			showLine: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerDetailRow.flCustomerDetailLine.visible;
				},
				set: function(value) {
					return customerDetailRow.flCustomerDetailLine.visible = value;
				}
			},
			fieldName: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerDetailRow.lblFieldName.text;
				},
				set: function(value) {
					return customerDetailRow.lblFieldName.text = value;
				}
			},
			fieldValue: {
				enumerable: true,
				configurable: true,
				get: function() {
					return customerDetailRow.lblFieldValue.text;
				},
				set: function(value) {
					return customerDetailRow.lblFieldValue.text = value;
				}
			}
		});

	});



module && (module.exports = CustomerDetailRow);

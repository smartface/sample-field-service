const FlexLayout = require('sf-core/ui/flexlayout');
const extend = require('js-base/core/extend');
const Color = require('sf-core/ui/color');
const lineColor = Color.createGradient({
	direction: Color.GradientDirection.HORIZONTAL,
	startColor: Color.create("#06BEBD"),
	endColor: Color.create("#B7CE63")
});

const CustomerRowDesign = require('library/CustomerRow');

const CustomerRow = extend(CustomerRowDesign)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, Object.assign({}, CustomerRowDesign.defaults, props || {}, {
			positionType: FlexLayout.PositionType.ABSOLUTE,
			left: 0,
			top: 0,
			bottom: 0,
			right: 0,
		}));
		this.pageName = pageName;
		this.customerRowLine.backgroundColor = lineColor;
	}

);

module && (module.exports = CustomerRow);

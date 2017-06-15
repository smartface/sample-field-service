const FlexLayout = require('sf-core/ui/flexlayout');
const extend = require('js-base/core/extend');
const theme = require("../lib/theme");


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
		var selectedTheme = theme[theme.selected];
		this.customerRowLine.backgroundColor = selectedTheme.lineSeparator;
		this.imgCustomerPicture.borderColor = selectedTheme.mainColor;
	}

);

module && (module.exports = CustomerRow);

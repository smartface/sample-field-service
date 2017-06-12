/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Flexlayout1Design = require('library/Flexlayout1');

const Flexlayout1 = extend(Flexlayout1Design)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || Flexlayout1Design.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = Flexlayout1);


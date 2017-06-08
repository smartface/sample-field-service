/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const TextInput = require('library/TextInput');

const TextInput_ = extend(TextInput)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || TextInput.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = TextInput_);


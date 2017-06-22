module.exports = exports = mimicPressed;

function mimicPressed(target, eventFunction, touchControl) {
	if (target.children) {
		for (var i in target.children) {
			let child = target.children[i];
			child.touchEnabled = false;
		}
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

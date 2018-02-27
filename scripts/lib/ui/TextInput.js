const extend = require('js-base/core/extend');
const TextBox = require('sf-core/ui/textbox');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const View = require('sf-core/ui/view');
const mapProperties = require("../map-properties");
const theme = require("../theme");

var lineColorInactive = Color.create("#CCCCCC");
var lineColorInvalid = Color.RED;


const TextInput = extend(FlexLayout)(
	function(_super, props) {
		var textInput = this;
		_super(this, props);


		var textbox = new TextBox({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 1,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#696D6F"),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "",
			padding: 0,
			onEditBegins: function() {
				var selectedTheme = theme[theme.selected];
				line.backgroundColor = selectedTheme.gradient;
			},
			onEditEnds: function() {
				line.backgroundColor = lineColorInactive;
			}
		});
		textbox.font = Font.create("Lato", 16, Font.NORMAL);
		textbox.ios.clearButtonEnabled = true;
		this.addChild(textbox);
		this.textbox = textbox;
		var line = new View({
			left: 0,
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 1,
			backgroundColor: lineColorInactive,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(line);


		this.children = Object.assign({}, {
			textbox: textbox,
			line: line
		});

		mapProperties(textInput, textbox, ["text", "hint", "onActionButtonPress", "onTextChanged", "onTouchEnded",
			"hideKeyboard", "showKeyboard", "keyboardType", "textAlignment",
			"isPassword", "actionKeyType", "requestFocus", "removeFocus"
		]);

		//mapProperties(textInput, textbox.ios, ["clearButtonEnabled"]);

		textInput.invalidate = function invalidate() {
			line.backgroundColor = lineColorInvalid;
		};
	}
);

TextInput.defaults = {
	left: 0,
	top: 0,
	height: 70,
	alignContent: FlexLayout.AlignContent.STRETCH,
	alignItems: FlexLayout.AlignItems.STRETCH,
	justifyContent: FlexLayout.JustifyContent.FLEX_START,
	flexWrap: FlexLayout.FlexWrap.NOWRAP,
	flexDirection: FlexLayout.FlexDirection.COLUMN,
	positionType: FlexLayout.PositionType.RELATIVE,
	right: 0,
	backgroundColor: Color.create(0, 255, 255, 255),
	alpha: 1,
	borderColor: Color.create(255, 0, 0, 0),
	borderWidth: 0,
	visible: true,
};

module && (module.exports = TextInput);

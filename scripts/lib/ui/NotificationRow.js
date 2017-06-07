const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const View = require('sf-core/ui/view');
const relativeTime = require("../relative-time");
const Screen = require('sf-core/device/screen');

const NotificationRow = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		var row = this;
		_super(this, props);
		var lblTitleMinHeight = 2;
		var lblTitleMaxHeight = 30.5;
		var topShift = 35 * 1.5;
		var contentStartLeft = 126;

		var flLeft = new FlexLayout({
			left: 0,
			top: 0,
			bottom: 0,
			width: 105,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flLeft);

		var flLine = new View({
			left: 105,
			top: 0,
			bottom: 0,
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			backgroundColor: Color.create(255, 242, 242, 242),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flLine);

		var flContent = new FlexLayout({
			left: contentStartLeft,
			top: topShift,
			right: 2,
			bottom: 2,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flContent);

		var flBall = new View({
			left: 99.75,
			top: topShift + 4,
			width: 10.5,
			height: 10.5,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			backgroundColor: Color.create(255, 80, 210, 194),
			alpha: 1,
			borderColor: Color.create(255, 80, 210, 194),
			borderWidth: 0,
			borderRadius: 5.25,
			visible: true
		});
		this.addChild(flBall);

		var lblDate = new Label({
			height: 31,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginTop: topShift,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 39, 39, 49),
			textAlignment: TextAlignment.TOPCENTER,
			visible: true,
			text: "<Date>",
			multiline: false
		});
		lblDate.font = Font.create("Lato", 13, Font.NORMAL);
		flLeft.addChild(lblDate);

		var lblTitle = new Label({
			height: lblTitleMinHeight,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 39, 39, 49),
			textAlignment: TextAlignment.TOPLEFT,
			visible: true,
			text: "",
			multiline: false
		});
		lblTitle.font = Font.create("Lato", 13, Font.NORMAL);
		flContent.addChild(lblTitle);

		var lblContent = new Label({
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 155, 155, 155),
			textAlignment: TextAlignment.TOPLEFT,
			visible: true,
			text: "<Content>",
			multiline: true
		});
		lblContent.font = Font.create("Arial", 12, Font.NORMAL);
		flContent.addChild(lblContent);


		//assign the children to notificationRow 
		this.children = Object.assign({}, {
			flLeft: flLeft,
			flLine: flLine,
			flContent: flContent,
			flBall: flBall
		});

		//assign the children of flLeft
		flLeft.children = Object.assign({}, {
			lblDate: lblDate
		});

		//assign the children of flContent
		flContent.children = Object.assign({}, {
			lblTitle: lblTitle,
			lblContent: lblContent
		});

		var date;
		var title;
		var text;
		Object.defineProperties(this, {
			"date": {
				enumerable: true,
				configurable: true,
				get: function() {
					return date;
				},
				set: function(value) {
					date = value;
					lblDate.text = relativeTime(date);
					return value;
				}
			},
			"title": {
				enumerable: true,
				configurable: true,
				get: function() {
					return title;
				},
				set: function(value) {
					title = value;
					lblTitle.height = !!title ? lblTitleMaxHeight : lblTitleMinHeight;
					lblTitle.text = title;
					return value;
				}
			},
			"text": {
				enumerable: true,
				configurable: true,
				get: function() {
					return text;
				},
				set: function(value) {
					text = value;
					var areaWidth = Screen.width - contentStartLeft;
					var numberOfCharactersPerLine = areaWidth / 8;
					var extraLines = (text.match(/\n/g) || []).length;
					var numberOfLines = Math.floor(1 + (text.length / numberOfCharactersPerLine) + extraLines);
					var lblHeight = numberOfLines * 21;
					lblContent.height = lblHeight;
					lblContent.text = text;

					var rowHeight = topShift + lblHeight + lblTitle.height;
					row.height = rowHeight;
					
					return value;
				}
			}
		});
	}
);

NotificationRow.defaults = {
	height: 200,
	alignContent: FlexLayout.AlignContent.STRETCH,
	alignItems: FlexLayout.AlignItems.STRETCH,
	justifyContent: FlexLayout.JustifyContent.FLEX_START,
	flexWrap: FlexLayout.FlexWrap.NOWRAP,
	flexDirection: FlexLayout.FlexDirection.ROW,
	positionType: FlexLayout.PositionType.RELATIVE,
	backgroundColor: Color.create("#FFFFFF"),
	alpha: 1,
	borderColor: Color.create(255, 0, 0, 0),
	borderWidth: 0,
	visible: true
};

module && (module.exports = NotificationRow);

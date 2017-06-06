const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');


const NotificationRow = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);


		var flLeft = new FlexLayout({
			width: 105,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.GREEN,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flLeft);

		var flLine = new FlexLayout({
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 242, 242, 242),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flLine);

		var flContent = new FlexLayout({
			width: 400,
			height: 200,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginTop: 70,
			marginLeft: 40,
			backgroundColor: Color.RED,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		this.addChild(flContent);

		var flBall = new FlexLayout({
			left: 99.75,
			top: 70,
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
			marginTop: 70,
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
		lblDate.font = Font.create("Lato", 26, Font.NORMAL);
		flLeft.addChild(lblDate);

		var lblTitle = new Label({
			height: 30.5,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 39, 39, 49),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "<Title>",
			multiline: false
		});
		lblTitle.font = Font.create("Lato", 26, Font.NORMAL);
		flContent.addChild(lblTitle);

		var lblContent = new Label({
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.TRANSPARENT,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 155, 155, 155),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "<Content>",
			multiline: true
		});
		lblContent.font = Font.create("Arial", 24, Font.NORMAL);
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

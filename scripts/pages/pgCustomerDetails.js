const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgCustomerDetailsDesign = require("../ui/ui_pgCustomerDetails");
const ScrollView = require('sf-core/ui/scrollview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const CustomerDetailRow = require("../components/CustomerDetailRow");
const CustomerActionRow = require("../components/CustomerActionRow");
const fieldMargin = 24.5;
const View = require('sf-core/ui/view');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const sliderDrawer = require("../sliderDrawer");
const Image = require('sf-core/ui/image');
const gradientColor = Color.createGradient({
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create("#06BEBD"),
    endColor: Color.create("#B7CE63")
});
const actions = {
    "Notes": showNotes,
    "Notification flow": showNotificationFlow
};

const pgCustomerDetails = extend(pgCustomerDetailsDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var svCustomerDetail;


        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            svCustomerDetail = new ScrollView({
                flexGrow: 1,
                align: ScrollView.Align.VERTICAL
            });
            page.layout.addChild(svCustomerDetail);
            page.onBackButtonPressed = goBack;
            Object.assign(page.btnBack, {
                onPress: goBack,
                text: "",
                backgroundImage: Image.createFromFile("images://back_dark.png"),
            });
            // page.imgCustomerPicture.borderColor = gradientColor;
            page.flLine.backgroundColor = gradientColor;


        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            data && loadData(data);
            page.statusBar.ios.style = StatusBarStyle.DEFAULT;
            sliderDrawer.enabled = false;
        };

        function loadData(customerDetails) {
            if (!svCustomerDetail)
                return;
            if (svCustomerDetail.layout) {
                var oldLayout = svCustomerDetail.layout;
                svCustomerDetail.removeChild(oldLayout);
                delete svCustomerDetail.layout;
            }

            var layout = new FlexLayout({
                left: 0,
                top: 0,
                right: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                backgroundColor: Color.WHITE,
                alignItems: FlexLayout.AlignItems.STRETCH,
                flexDirection: FlexLayout.FlexDirection.COLUMN,
                justifyContent: FlexLayout.JustifyContent.FLEX_START
            });
            var detailRowHeight = 61.75,
                actionRowHeight = 60,
                placeholderHeight = 16,
                layoutHeight = 0;
            if (customerDetails.fields) {
                customerDetails.fields.forEach(function(field, index) {
                    layoutHeight += detailRowHeight;
                    var customerDetailRow = Object.assign(new CustomerDetailRow(), {
                        marginLeft: fieldMargin,
                        marginRight: fieldMargin,
                        showLine: index !== (customerDetails.fields.length - 1),
                        fieldName: field.name,
                        fieldValue: field.value
                    });
                    layout.addChild(customerDetailRow);
                });
                if (customerDetails.actions) {
                    var vPlaceholder = new View({
                        backgroundColor: Color.create("#D8D8D8"),
                        alpha: 0.24,
                        height: placeholderHeight
                    });
                    layoutHeight += placeholderHeight;
                }
                layout.addChild(vPlaceholder);
            }
            if (customerDetails.actions) {
                customerDetails.actions.forEach(function(action, index) {
                    layoutHeight += actionRowHeight;
                    var customerActionRow = Object.assign(new CustomerActionRow(), {
                        marginLeft: fieldMargin,
                        marginRight: fieldMargin,
                        showLine: index !== (customerDetails.actions.length - 1),
                        fieldName: action.text || action.name,
                        onPress: actions[action.name].bind(page, customerDetails)
                    });
                    layout.addChild(customerActionRow);
                });
            }
            layout.height = layoutHeight;
            svCustomerDetail.addChild(layout);
            svCustomerDetail.layout = layout;
        }
    });

function goBack() {
    Router.goBack();
}

function showNotes(customerData) {
    alert("show notes");
}

function showNotificationFlow(customerData) {
    alert("show notification flow");
}

module && (module.exports = pgCustomerDetails);

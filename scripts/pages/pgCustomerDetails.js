/* globals lang */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgCustomerDetailsDesign = require("../ui/ui_pgCustomerDetails");
const ScrollView = require('sf-core/ui/scrollview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const CustomerDetailRow = require("../components/CustomerDetailRow");
const CustomerActionRow = require("../components/CustomerActionRow");
const fieldMargin = 24.5;
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const sliderDrawer = require("../sliderDrawer");
const Image = require('sf-core/ui/image');
const emptyColor = Color.create(61, 216, 216, 216);
const actions = {
    "Notes": showNotes,
    "Notification flow": showNotificationFlow
};
const Share = require('sf-core/share');
const theme = require("../lib/theme");
const shadow = require("../lib/ui").shadow;
const Application = require("sf-core/application");
const Contacts = require("sf-core/device/contacts");
const System = require('sf-core/device/system');
const permission = require("../lib/permission");
const HeaderBarItem = require('sf-core/ui/headerbaritem');

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
                align: ScrollView.Align.VERTICAL,
                backgroundColor: emptyColor
            });
            page.layout.addChild(svCustomerDetail);
            page.android.onBackButtonPressed = goBack;
            Object.assign(page.btnBack, {
                onPress: goBack,
                text: "",
                backgroundImage: Image.createFromFile("images://back_dark.png"),
            });

            var selectedTheme = theme[theme.selected];
            page.flLine.backgroundColor = selectedTheme.lineSeparator;
            page.imgCustomerPicture.borderColor = selectedTheme.mainColor;
            page.btnShare.backgroundImage = selectedTheme.share;
            page.btnAddToContacts.backgroundImage = selectedTheme.addToContacts;


            page.headerBar.leftItemEnabled = true;

            if (System.OS === "iOS") { //default android will do the trick;
                var leftItem = new HeaderBarItem({
                    title: "",
                    onPress: function() {
                        goBack();
                    },
                    image: Image.createFromFile("images://back_dark.png"),
                    color: Color.BLACK
                });
                page.headerBar.leftItem = leftItem;
                page.headerBar.setLeftItem(leftItem);
            }
            if (!page.android.onBackButtonPressed) {
                page.android.onBackButtonPressed = function() {
                    goBack();
                };
            }


        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            data && loadData(data);
            page.statusBar.ios.style = StatusBarStyle.DEFAULT;
            sliderDrawer.enabled = false;
            var selectedTheme = theme[theme.selected];
            page.statusBar.android.color = selectedTheme.topBarColor;
            if (System.OS === "Android") {
                page.headerBar.titleColor = Color.WHITE;
                page.headerBar.backgroundColor = selectedTheme.topBarColor;
            }
        };

        function loadData(customerDetails) {
            if (!svCustomerDetail)
                return;
            if (svCustomerDetail.layout) {
                var oldLayout = svCustomerDetail.layout;
                svCustomerDetail.removeChild(oldLayout);
                delete svCustomerDetail.layout;
            }
            var contactData = {};

            var layout = new FlexLayout({
                left: 0,
                top: 0,
                right: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                backgroundColor: Color.TRANSPARENT,
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
                        paddingLeft: fieldMargin,
                        paddingRight: fieldMargin,
                        showLine: index !== (customerDetails.fields.length - 1),
                        fieldName: field.name,
                        fieldValue: field.value
                    });
                    Object.assign(customerDetailRow.children.flCustomerDetailLine, {
                        marginLeft: fieldMargin,
                        marginRight: fieldMargin,
                    });
                    layout.addChild(customerDetailRow);
                    contactData[field.name] = field.value;
                });
                if (customerDetails.actions) {
                    var flPlaceholder = new FlexLayout({
                        backgroundColor: Color.create(61, 216, 216, 216),
                        height: placeholderHeight
                    });
                    var shadow1 = shadow.createVShadowDown({
                        left: 0,
                        top: 0,
                        right: 0,
                        positionType: FlexLayout.PositionType.ABSOLUTE,
                    });
                    flPlaceholder.addChild(shadow1);
                    flPlaceholder.children = Object.assign(flPlaceholder.children || {}, {
                        shadow1: shadow1
                    });
                    layoutHeight += placeholderHeight;
                }
                layout.addChild(flPlaceholder);
            }
            if (customerDetails.actions) {
                customerDetails.actions.forEach(function(action, index) {
                    layoutHeight += actionRowHeight;
                    var customerActionRow = Object.assign(new CustomerActionRow(), {
                        paddingLeft: fieldMargin,
                        paddingRight: fieldMargin,
                        showLine: index !== (customerDetails.actions.length - 1),
                        fieldName: action.text || action.name,
                        onPress: actions[action.name].bind(page, customerDetails)
                    });

                    Object.assign(customerActionRow.children.flCustomerActionLine, {
                        marginLeft: fieldMargin,
                        marginRight: fieldMargin
                    });
                    layout.addChild(customerActionRow);
                });
            }
            if (customerDetails.fields || customerDetails.actions) {
                var shadow2 = shadow.createVShadowDown({
                    positionType: FlexLayout.PositionType.RELATIVE
                });
                layout.addChild(shadow2);
                layoutHeight += shadow.size;
            }
            layout.height = layoutHeight;
            svCustomerDetail.addChild(layout);
            svCustomerDetail.layout = layout;
            page.imgCustomerPicture.image = customerDetails.picture ||
                Image.createFromFile("images://customers_empty.png");


            page.btnAddToContacts.onPress = function() {
                if (System.OS === "Android") {
                    permission.checkPermission(Application.android.Permissions.WRITE_CONTACTS, function(err) {
                        if (err) return;
                        addToContacts();
                    });
                }
                else {
                    addToContacts();
                }

                function addToContacts() {
                    Contacts.add({
                        contact: {
                            displayName: "Adam Stewart",
                            phoneNumber: "+16506173265",
                            email: "info@smartface.io",
                            address: "347 N Canon Dr Beverly Hills, CA 90210"
                        },
                        //contactData,
                        onSuccess: function() {
                            alert(lang.contactAddSuccess);
                        },
                        onFailure: function() {
                            alert(lang.contactAddFailure);
                        }
                    });
                }
            };

            page.btnShare.onPress = function() {
                var contactDataString = JSON.stringify(contactData, null, "\t");
                Share.shareText(contactDataString, page, []);
            };
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

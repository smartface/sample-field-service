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
//const HeaderBarItem = require('sf-core/ui/headerbaritem');
const initTime = require("../lib/init-time");
const getSingleCustomer = require("../model/customers").getSingleCustomer;
const Blob = require('sf-core/blob');
const backAction = require("../lib/ui").backAction;
const File = require('sf-core/io/file');
const Path = require('sf-core/io/path');
const FileStream = require('sf-core/io/filestream');

const pgCustomerDetails = extend(pgCustomerDetailsDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var svCustomerDetail;
        var customerInfo = null;


        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            svCustomerDetail = new ScrollView({
                flexGrow: 1,
                align: ScrollView.Align.VERTICAL,
                backgroundColor: emptyColor,
                visible: false
            });
            page.layout.addChild(svCustomerDetail);
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
            page.aiWait.color = selectedTheme.topBarColor;


            page.headerBar.leftItemEnabled = true;
        };

        page.onShow = function onShow(id) {
            baseOnShow && baseOnShow();

            page.statusBar.ios.style = StatusBarStyle.DEFAULT;
            sliderDrawer.enabled = false;
            var selectedTheme = theme[theme.selected];
            page.statusBar.android.color = selectedTheme.topBarColor;
            if (System.OS === "Android") {
                page.headerBar.titleColor = Color.WHITE;
                page.headerBar.backgroundColor = selectedTheme.topBarColor;
            }
            page.headerBar.title = lang.customerDetails;
            if (id) {
                setTimeout(function() {
                    getSingleCustomer(id, function(err, customerData) {
                        page.flWait.visible = true;
                        console.log("after getting single. Is there error? " + !!err);
                        if (err) {
                            return alert(JSON.stringify(err), "Customer Service Error");
                        }
                        var customerDetails = {
                            fields: [{
                                name: lang["Customer Number"],
                                value: customerData.customFields.CO.CardNo || ""
                            }, {
                                name: lang["Mobile Phone"],
                                value: customerData.customFields.CO.Phone || ""
                            }, {
                                name: lang["Cutomer Type"],
                                value: lang[customerData.customFields.CO.CustType] || ""
                            }, {
                                name: lang.Adress,
                                value: customerData.address.street || ""
                            }, ],
                            actions: [{
                                name: "Notes",
                                text: lang["Notes"]
                            }, {
                                name: "Notification flow",
                                text: lang["Notification flow"]
                            }],
                        };
                        var pictureAssigned = false;

                        if (customerData.customFields.CO.Picture) {
                            try {
                                customerDetails.picture = Image.createFromBlob(Blob.createFromBase64(customerData.customFields.CO.Picture));
                                pictureAssigned = true;
                            }
                            finally {}
                        } /**/
                        if (!pictureAssigned)
                            customerDetails.picture = Image.createFromFile("images://customers_empty.png");

                        //TODO due to the bug of missing blob
                        //customerDetails.picture = Image.createFromFile("images://customers_1.png");
                        page.lblName.text = customerData.lookupName;
                        customerInfo = {
                            displayName: customerData.lookupName || "",
                            phoneNumber: customerData.customFields.CO.Phone || "",
                            email: customerData.customFields.CO.Email || "",
                            address: customerData.address.street || "",
                            picture: customerDetails.picture,
                            notes: String(customerData.customFields.CO.CardNo || ""),
                            firstName: customerData.name.first || "",
                            lastName: customerData.name.last || ""
                        };
                        loadData(customerDetails);
                        page.flWait.visible = false;
                        svCustomerDetail.visible = true;
                        page.layout.applyLayout();
                    });



                }, initTime);
                backAction(page, goBack, "DARK");
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
                //if (System.OS === "Android") {
                permission.checkPermission(Application.android.Permissions.WRITE_CONTACTS, function(err) {
                    if (err) return;
                    addToContacts();
                });
                //}
                //else {
                //    addToContacts();
                //}

                function addToContacts() {
                    Contacts.add({
                        contact: customerInfo,
                        onSuccess: function() {
                            alert(lang.contactAddSuccess);
                        },
                        onFailure: function() {
                            alert(lang.contactAddFailure);
                        },
                        page
                    });
                }
            };

            page.btnShare.onPress = function() {
                //var contactDataString = JSON.stringify(contactData, null, "\t");
                //Share.shareText(contactDataString, page, []);


                permission.checkPermission(Application.android.Permissions.WRITE_EXTERNAL_STORAGE, function(err) {
                    if (err) return;
                    var fileName = "test.vcf";
                    var path;
                    if (System.OS === "Android") {
                        path = Path.android.storages.internal + Path.Separator + fileName;
                    }
                    else {
                        path = Path.DataDirectory + Path.Separator + fileName;
                    }
                    createAndSendVCF(path);
                });

            };

            function createAndSendVCF(destinationPath, contact) {
                var vcfFile = new File({
                    path: destinationPath
                });
                vcfFile.createFile();
                var fileStream = vcfFile.openStream(FileStream.StreamType.WRITE);
                var fileContent =
                    "BEGIN:VCARD\r\n" +
                    "VERSION:3.0\r\n" +
                    "N:" + customerInfo.lastName + ";" + customerInfo.firstName + "\r\n" +
                    "FN:" + customerInfo.displayName + "\r\n" +
                    "NOTE:" + customerInfo.notes + "\r\n" +
                    "TEL;TYPE=PREF,CELL:" + customerInfo.phoneNumber + "\r\n" +
                    "EMAIL;TYPE=PREF,INTERNET:" + customerInfo.email + "\r\n" +
                    "END:VCARD\r\n";
                fileStream.write(fileContent);
                fileStream.close();

                Share.shareFile(vcfFile, page);
            }
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

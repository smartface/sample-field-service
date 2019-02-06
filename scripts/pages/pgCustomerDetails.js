/* globals lang */
const extend = require("js-base/core/extend");
const Router = require("../router/index");
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
const permission = require("sf-extension-utils/lib/permission");
//const HeaderBarItem = require('sf-core/ui/headerbaritem');
const initTime = require("../lib/init-time");
const getSingleCustomer = require("../model/customers").getSingleCustomer;
const Blob = require('sf-core/blob');
const backAction = require("../lib/ui").backAction;
const File = require('sf-core/io/file');
const Path = require('sf-core/io/path');
const FileStream = require('sf-core/io/filestream');
const notes = require("../model/notes");
const getImage = require("../lib/getImage");
const addChild = require("@smartface/contx/lib/smartface/action/addChild");

var page;
const pgCustomerDetails = extend(pgCustomerDetailsDesign)(
    function(_super,routeData,router) {
        page = this;
        _super(this);
        
        page.routeData = routeData;
        page.router = router;
        
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;

        var svCustomerDetail;
        var customerInfo = null;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;
            
            Application.android.onBackButtonPressed = () => {
                page.router.goBack();
            }
            svCustomerDetail = new ScrollView({
                align: ScrollView.Align.VERTICAL,
            });
            page.layout.addChild(svCustomerDetail, "svCustomerDetail", "", function(userProps) {
                userProps.flexGrow = 1;
                //userProps.align = "VERTICAL";
                userProps.backgroundColor = "rgba(255, 255, 255,1)";
                userProps.visible = false;
                return userProps;
            });
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
        };

        page.onShow = function onShow(id) {
            id = page.routeData;
            baseOnShow && baseOnShow();
            applyTheme();
            sliderDrawer.enabled = false;

            page.headerBar.title = lang.customerDetails;
            if (page.dataID || id) {
                setTimeout(() => {
                    if (!page.dataID)
                        page.dataID = id;
                    notes.getNotes(function(err, notes) {
                        if (err) {
                            return alert(JSON.stringify(err), "Customer Service Error");
                        }

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
                                    value: customerData.customFields.CO.CustType || ""
                                }, {
                                    name: lang.Adress,
                                    value: customerData.address.street || ""
                                }, ],
                                actions: [{
                                    name: "Notes",
                                    text: lang["Notes"],
                                    count: notes.length
                                }, {
                                    name: "Notification flow",
                                    text: lang["Notification flow"]
                                }],
                                id: customerData.id
                            };
                            var pictureAssigned = false;

                            if (customerData.customFields.CO.Picture) {
                                try {
                                    customerDetails.picture = getImage(customerData.customFields.CO.Picture);
                                    pictureAssigned = true;
                                }
                                finally {}
                            } /**/
                            if (!pictureAssigned)
                                customerDetails.picture = Image.createFromFile("images://customers_empty.png");

                            page.lblName.text = customerData.lookupName;
                            page.lblTitle.text = customerData.customFields.CO.Title || "";

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
                            loadData.call(this, customerDetails);
                            page.flWait.visible = false;
                            svCustomerDetail.visible = true;
                            page.layout.applyLayout();
                        });
                    });
                }, initTime);
            }
            backAction(page, goBack);
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            Application.statusBar.style = StatusBarStyle.LIGHTCONTENT;
            Application.statusBar.itemColor = Color.WHITE;

            page.headerBar.titleColor = Color.WHITE;
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            Application.statusBar.android && (Application.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;
            page.aiWait.color = selectedTheme.topBarColor;
        }

        function loadData(customerDetails) {
            if (!svCustomerDetail)
                return;
            var contactData = {};

            // var layout = new FlexLayout();
            var layout = new FlexLayout({
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                backgroundColor: Color.create("#FFFFFF"),
                alignItems: FlexLayout.AlignItems.STRETCH,
                flexDirection: FlexLayout.FlexDirection.COLUMN,
                justifyContent: FlexLayout.JustifyContent.FLEX_START
            });
            svCustomerDetail.layout.addChild(layout, "layout");
            var detailRowHeight = 61.75,
                actionRowHeight = 60,
                placeholderHeight = 16,
                layoutHeight = 0;
            if (customerDetails.fields) {
                customerDetails.fields.forEach(function(field, index) {
                    layoutHeight += detailRowHeight;
                    var customerDetailRow = new CustomerDetailRow();
                    layout.addChild(customerDetailRow, `customerDetailRow${index}`, "", function(userProps) {
                        userProps.color = "rgba(0,0,0,0,0)";
                        userProps.paddingLeft = fieldMargin;
                        userProps.paddingRight = fieldMargin;
                        userProps.fieldName = field.name;
                        userProps.fieldValue = field.value
                        return userProps;
                    });
                    customerDetailRow.children["flCustomerDetailLine"].dispatch({
                        type: "updateUserStyle",
                        userStyle: {
                            marginLeft: fieldMargin,
                            marginRight: fieldMargin,
                            visible: index !== (customerDetails.fields.length - 1)
                        }
                    });
                    customerDetailRow.children["flCustomerDetailLine"].applyLayout();
                    contactData[field.name] = field.value;
                });
                if (customerDetails.actions) {
                    var flPlaceholder = new FlexLayout();
                    var shadow1 = shadow.createVShadowDown({
                        left: 0,
                        top: 0,
                        right: 0,
                        positionType: FlexLayout.PositionType.ABSOLUTE,
                    });
                    flPlaceholder.addChild(shadow1, "shadow");

                    flPlaceholder.children = Object.assign(flPlaceholder.children || {}, {
                        shadow1: shadow1
                    });
                    layoutHeight += placeholderHeight;
                }
                layout.addChild(flPlaceholder, "shadow", "", function(userProps) {
                    userProps.backgroundColor = "rgba(216, 216, 216, 0.24)";
                    userProps.height = placeholderHeight
                    return userProps;
                });
            }
            if (customerDetails.actions) {
                customerDetails.actions.forEach(function(action, index) {
                    layoutHeight += actionRowHeight;
                    // var customerActionRow = Object.assign(new CustomerActionRow(), {
                    //     paddingLeft: fieldMargin,
                    //     paddingRight: fieldMargin,
                    //     showLine: index !== (customerDetails.actions.length - 1),
                    //     fieldName: action.text || action.name,
                    //     onPress: actions[action.name].bind(page, customerDetails),
                    //     count: action.count
                    // });
                    var customerActionRow = new CustomerActionRow();
                    // Object.assign(customerActionRow.children["flCustomerActionLine"], {
                    //     marginLeft: fieldMargin,
                    //     marginRight: fieldMargin
                    // });
                    customerActionRow.onPress = actions[action.name].bind(page, customerDetails);
                    layout.addChild(customerActionRow, `customerActionRow${index}`, "", function(userProps) {
                        userProps.paddingLeft = fieldMargin;
                        userProps.paddingRight = fieldMargin;
                        userProps.showLine = index !== (customerDetails.actions.length - 1);
                        userProps.fieldName = action.text || action.name;
                        userProps.count = action.count;

                        return userProps;
                    });

                    customerActionRow.children["flCustomerActionLine"].dispatch({
                        type: "updateUserStyle",
                        userStyle: {
                            marginLeft: fieldMargin,
                            marginRight: fieldMargin,
                            visible: index !== (customerDetails.actions.length - 1)
                        }
                    });
                });


            }
            if (customerDetails.fields || customerDetails.actions) {
                var shadow2 = shadow.createVShadowDown({
                    positionType: FlexLayout.PositionType.RELATIVE
                });
                layout.addChild(shadow2, "shadow2", "", {
                    positionType: "RELATIVE"
                });
                layoutHeight += shadow.size;
            }
            var flPlaceholderBottom = new FlexLayout({
                flexGrow: 1,
                positionType: FlexLayout.PositionType.RELATIVE,
            });

            layout.addChild(flPlaceholderBottom, "shadow2", "", function(userProps) {
                userProps.flexGrow = 1;
                userProps.backgroundColor = "rgba(216, 216, 216, 0.24)";
                return userProps;
            });
            
            svCustomerDetail.layout.height = layoutHeight + 20 ;

            page.imgCustomerPicture.image = customerDetails.picture ||
                Image.createFromFile("images://customers_empty.png");

            page.btnAddToContacts.onPress = function() {
                //if (System.OS === "Android") {
                permission.getPermission(Application.android.Permissions.WRITE_CONTACTS, function(err) {
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
                permission.getPermission(Application.android.Permissions.WRITE_EXTERNAL_STORAGE, function(err) {
                    if (err) return;
                    var fileName = customerInfo.firstName.toLocaleLowerCase() + "_" + customerInfo.lastName.toLowerCase() + ".vcf";
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
    page.router.goBack();
}

function showNotes(customerData) {
    page.router.push("/slider/customersPage/pgNotes", {
        customerId: customerData.id
    });
}

function showNotificationFlow(customerData) {
    alert("show notification flow");
}

module && (module.exports = pgCustomerDetails);

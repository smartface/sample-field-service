/*globals lang, Blob */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const CustomerRow = require("../components/CustomerRow");
const pgCustomersDesign = require("../ui/ui_pgCustomers");
const Image = require('sf-core/ui/image');
const ListViewItem = require('sf-core/ui/listviewitem');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const backAction = require("../lib/ui").backAction;
const theme = require("../lib/theme");
const pageLength = 20;
const getCustomers = require("../model/customers").getCustomers;
const loadingRowData = {
    loading: true
};
Object.freeze(loadingRowData);
const Color = require("sf-core/ui/color");
const FlexLayout = require("sf-core/ui/flexlayout");
const ActivityIndicator = require("sf-core/ui/activityindicator");
const DialogWait = require("../components/DialogWait");
const getSingleCustomer = require("../model/customers").getSingleCustomer;

const pgCustomers = extend(pgCustomersDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var isLoading = false;
        var dataset = [];
        var filter = {};
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.headerBar.title = lang.customers;

            Object.assign(page.btnAddCustomer, {
                text: "",
                borderRadius: 0,
                onPress: function() {
                    Router.go("pgNewCustomer");
                }
            });


            var lvCustomers = page.lvCustomers;
            lvCustomers.refreshEnabled = false;
            var customerRowID = 149,
                loadingLayoutID = 150,
                loadingIndicatorID = 151,
                flInteriorID = 152,
                flCustomerDataID = 153,
                flCustomerRowPhoneID = 154,
                lblCustomerRowPhoneID = 155,
                flCustomerRowEmailID = 156,
                lblCustomerRowEmailID = 157,
                lblCustomerRowNameID = 158,
                imgCustomerPictureID = 159;

            lvCustomers.onRowCreate = function() {
                var selectedTheme = theme[theme.selected];
                var lviCustomerRow = new ListViewItem();
                var customerRow = Object.assign(new CustomerRow(), {
                    id: customerRowID,
                });
                lviCustomerRow.addChild(customerRow);


                var loadingLayout = new FlexLayout({
                    id: loadingLayoutID,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    visible: false,
                    backgroundColor: Color.WHITE,
                    justifyContent: FlexLayout.JustifyContent.CENTER,
                    positionType: FlexLayout.PositionType.ABSOLUTE,
                });

                var loadingIndicator = new ActivityIndicator({
                    id: loadingIndicatorID,
                    alignSelf: FlexLayout.AlignSelf.CENTER,
                    backgroundColor: Color.TRANSPARENT,
                    alpha: 1,
                    borderColor: Color.create(255, 0, 0, 0),
                    visible: true,
                    color: selectedTheme.topBarColor,
                });
                loadingLayout.addChild(loadingIndicator);
                lviCustomerRow.addChild(loadingLayout);



                return lviCustomerRow;
            };

            lvCustomers.onRowBind = function(listViewItem, index) {
                var item = dataset[index];
                var customerRow = listViewItem.findChildById(customerRowID);
                var flInterior = customerRow.findChildById(flInteriorID);
                var flCustomerData = flInterior.findChildById(flCustomerDataID);
                var flCustomerRowPhone = flCustomerData.findChildById(flCustomerRowPhoneID);
                var lblCustomerRowPhone = flCustomerRowPhone.findChildById(lblCustomerRowPhoneID);
                var flCustomerRowEmail = flCustomerData.findChildById(flCustomerRowEmailID);
                var lblCustomerRowEmail = flCustomerRowEmail.findChildById(lblCustomerRowEmailID);
                var lblCustomerRowName = flCustomerData.findChildById(lblCustomerRowNameID);
                var imgCustomerPicture = flInterior.findChildById(imgCustomerPictureID);

                var loadingLayout = listViewItem.findChildById(loadingLayoutID);
                if (item === loadingRowData) {
                    loadingLayout.visible = true;
                    customerRow.visible = false;
                }
                else if(item){
                    loadingLayout.visible = false;
                    customerRow.visible = true;
                    if (item.customFields && item.customFields.CO) {
                        lblCustomerRowPhone.text = item.customFields.CO.Phone || "";
                        lblCustomerRowEmail.text = item.customFields.CO.Email || "";
                        var pictureAssigned = false;
                        /*if (item.customFields.CO.Picture) {
                            try {
                                var Blob = global.Blob;
                                imgCustomerPicture.image = Image.createFromBlob(Blob.createFromBase64(item.customFields.CO.Picture));
                                pictureAssigned = true;
                            }
                            finally {}
                        }/**/
                        if (!pictureAssigned)
                            imgCustomerPicture.image = Image.createFromFile("images://customers_empty.png");

                        //TODO due to the bug of missing blob
                        var imageNameNumber = (index % 4) + 1;
                        var imageName = "images://customers_" + imageNameNumber + ".png";
                        imgCustomerPicture.image = Image.createFromFile(imageName);
                    }
                    lblCustomerRowName.text = item.lookupName || "";
                }
            };

            lvCustomers.onScroll = function() {
                if (lvCustomers.getLastVisibleIndex() > dataset.length - 1 && !isLoading) {
                    isLoading = true;
                    setTimeout(function() {
                        filter.length = pageLength;
                        filter.start = dataset.length + pageLength - 1;
                        getCustomers(filter, function(err, customers) {
                            console.log("after getting customers. Is there error? " + !!err);
                            if (err) {
                                return alert(JSON.stringify(err), "Customers Service Error");
                            }
                            bindData(customers, true);
                        });
                    }, 1500);
                }
            };

            lvCustomers.onRowSelected = function(listViewItem, index) {
                var item = dataset[index];
                if (item === loadingRowData)
                    return;

                var dialogWait = DialogWait.show();
                getSingleCustomer(item.id, function(err, customerData) {
                    dialogWait.hide();
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

                    /*if (customerData.customFields.CO.Picture) {
                            try {
                                var Blob = global.Blob;
                                customerDetails.picture = Image.createFromBlob(Blob.createFromBase64(customerData.customFields.CO.Picture));
                                pictureAssigned = true;
                            }
                            finally {}
                        }/**/
                    if (!pictureAssigned)
                        customerDetails.picture = Image.createFromFile("images://customers_empty.png");

                    //TODO due to the bug of missing blob
                    customerDetails.picture = Image.createFromFile("images://customers_1.png");


                    Router.go("pgCustomerDetails", customerDetails);
                });
            };
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            if (data) {
                data.customers && bindData(data.customers);
                data.filter && (filter = data.filter);
            }


            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            backAction(page);
            applyTheme();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.btnAddCustomer.backgroundImage = {
                normal: selectedTheme.addCustomer
            };
        }

        function bindData(customerData, append) {
            isLoading = false;
            var items = customerData.items || [];
            var previousDatasetLength = 0;
            if (append) {
                if (dataset[dataset.length - 1] === loadingRowData) {
                    dataset.pop(); //remove loading row    
                    previousDatasetLength = dataset.length;
                }
            }
            else {
                dataset = [];
            }
            dataset = dataset.concat(items);
            if (dataset.length % pageLength === 0 && dataset.length !== previousDatasetLength)
                dataset.push(loadingRowData); // add loading row

            page.lvCustomers.itemCount = dataset.length;
            page.lvCustomers.refreshData();
        }
    });



module && (module.exports = pgCustomers);

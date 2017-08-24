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
const initTime = require("../lib/init-time");
const Blob = require('sf-core/blob');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const SearchView = require('sf-core/ui/searchview');
const System = require('sf-core/device/system');
const Font = require('sf-core/ui/font');
const FloatingMenu = require('sf-core/ui/floatingmenu');

const pgCustomers = extend(pgCustomersDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var isLoading = false;
        var dataset = [];
        var unfilteredDataset = [];
        var filterActive = false;
        var filter = null;
        var svFilter = null;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            var selectedTheme = theme[theme.selected];
            var fmNewCustomer = new FloatingMenu({
                width: 56,
                height: 56,
                bottom: 10,
                right: 8.5,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                icon: selectedTheme.addCustomer,
                color: selectedTheme.topBarColor,
                onClick: function() {
                    Router.go("pgNewCustomer");
                },
            });
            page.layout.addChild(fmNewCustomer);

            var lvCustomers = page.lvCustomers;
            lvCustomers.itemCount = 0;
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

                var flCustomerRowPhone = lviCustomerRow.findChildById(customerRowID).findChildById(flInteriorID).findChildById(flCustomerDataID).findChildById(flCustomerRowPhoneID);
                var lblCustomerRowPhone = flCustomerRowPhone.findChildById(lblCustomerRowPhoneID);

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
                else {
                    loadingLayout.visible = false;
                    customerRow.visible = true;
                    if (item.customFields && item.customFields.CO) {
                        lblCustomerRowPhone.text = item.customFields.CO.Phone || "";
                        lblCustomerRowEmail.text = item.customFields.CO.Email || "";
                        var pictureAssigned = false;
                        if (item.customFields.CO.Picture) {
                            try {
                                imgCustomerPicture.image = Image.createFromBlob(Blob.createFromBase64(item.customFields.CO.Picture));
                                pictureAssigned = true;
                            }
                            finally {}
                        } /**/
                        if (!pictureAssigned)
                            imgCustomerPicture.image = Image.createFromFile("images://customers_empty.png");

                        //TODO due to the bug of missing blob
                        //var imageNameNumber = (index % 4) + 1;
                        //var imageName = "images://customers_" + imageNameNumber + ".png";
                        //imgCustomerPicture.image = Image.createFromFile(imageName);
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

                Router.go("pgCustomerDetails", item.id);
            };

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            if (data && data.filter) {
                filter = data.filter;
                setTimeout(function() {
                    getCustomers(filter, function(err, customers) {
                        console.log("after getting customers. Is there error? " + !!err);
                        if (err) {
                            return alert(JSON.stringify(err), "Customers Service Error");
                        }
                        bindData(customers);
                        page.aiWait.visible = false;
                        page.lvCustomers.visible = true;
                        initSearchView();
                    });
                }, initTime);

            }

            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            backAction(page);
            applyTheme();
            page.headerBar.title = lang.customers;
        };

        function initSearchView() {
            if (System.OS === "iOS") {
                var filterItem = new HeaderBarItem({
                    onPress: function() {
                        if (!filterActive) {
                            showFilter();
                        }
                        else {
                            hideFilter();
                        }
                    },
                    image: Image.createFromFile("images://filter.png"),
                    color: Color.WHITE
                });
                page.headerBar.setItems([filterItem]);
                page.headerBar.items = [filterItem];
            }
            svFilter = new SearchView({
                textColor: System.OS === "Android" ? Color.WHITE : Color.BLACK,
                hint: lang.search,
                onSearchBegin: function() {
                    filterActive = true;
                },
                onTextChanged: function(searchText) {
                    console.log("searched text : " + searchText);
                    var text = searchText.toLowerCase();
                    var datasetFitered = unfilteredDataset.filter(function(item) {
                        return item.customFields.CO.Phone.toLowerCase().indexOf(text) > -1 ||
                            item.customFields.CO.Email.toLowerCase().indexOf(text) > -1 ||
                            item.lookupName.toLowerCase().indexOf(text) > -1;
                    });
                    bindData({
                        items: datasetFitered
                    }, false);
                }
            });
            svFilter.android.hintTextColor = Color.create("#CCCCCC");
            svFilter.androidfont = Font.create("Lato", 18, Font.NORMAL);
            svFilter.ios.showsCancelButton = true;
            svFilter.ios.cursorColor = Color.create(0, 122, 255); //iOS blue --> https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
            svFilter.ios.onCancelButtonClicked = function() {
                hideFilter();
            };


            if (System.OS === "Android") {
                svFilter.addToHeaderBar(page);
            }
        }

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;
            page.aiWait.color = selectedTheme.topBarColor;
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
            if (dataset.length % pageLength === 0 && dataset.length !== previousDatasetLength && !filterActive)
                dataset.push(loadingRowData); // add loading row

            page.lvCustomers.itemCount = dataset.length;
            page.lvCustomers.refreshData();
        }

        function showFilter() {
            filterActive = true;
            unfilteredDataset = dataset;
            //if (!svFilter) return;
            svFilter.addToHeaderBar(page);
            svFilter.requestFocus();
            console.log("added to header bar");
            page.headerBar.setItems([]);

        }

        function hideFilter() {
            filterActive = false;
            //if (!svFilter) return;
            svFilter.removeFromHeaderBar(page);
            console.log("removed from header bar");
            page.headerBar.setItems(page.headerBar.items);
            if (dataset !== unfilteredDataset) {
                bindData({
                    items: unfilteredDataset
                }, false);

            }
            filterActive = false;
        }
    });



module && (module.exports = pgCustomers);

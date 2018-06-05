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
const getImage = require("../lib/getImage");
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
const ListView = require('sf-core/ui/listview');
const ImageView = require('sf-core/ui/imageview');
const MapView = require('sf-core/ui/mapview');


const addChild = require("@smartface/contx/lib/smartface/action/addChild");

var page;
const pgCustomers = extend(pgCustomersDesign)(
    function(_super) {
        page = this;
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

            page.customerMapview.clusterEnabled = true;
            page.customerMapview.zoomLevel = 10;

            page.customerMapview.onCreate = function() {
                page.customerMapview.centerLocation = {
                    latitude: 40.6409884,
                    longitude: -73.9452045
                };
            };
            page.ios.safeAreaLayoutMode = true;

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
                imgCustomerPictureID = 159,
                itemIndex = 0;

            lvCustomers.onRowCreate = function() {
                var selectedTheme = theme[theme.selected];
                var lviCustomerRow = new ListViewItem();
                var customerRow = Object.assign(new CustomerRow(), {
                    id: customerRowID
                })
                this.dispatch(addChild(`item${++itemIndex}`, lviCustomerRow));
                lviCustomerRow.addChild(customerRow, "child", "", function(style) {
                    style.flexProps = {
                        flexDirection: "ROW"
                    };
                    return style;
                });


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

                            imgCustomerPicture.imageFillType = ImageView.FillType.STRETCH;
                            imgCustomerPicture.image = getImage(item.customFields.CO.Picture);
                            pictureAssigned = true;


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

            page.customerMapview.userLocationEnabled = true;
            console.log(" page.customerMapview.userLocationEnabled " + page.customerMapview.userLocationEnabled);


            // filter = data.filter;
            setTimeout(function() {
                getCustomers(filter, function(err, customers) {
                    if (err) {
                        return alert(JSON.stringify(err), "Customers Service Error");
                    }
                    bindData(customers);
                    if (data && data.filter) {
                        page.aiWait.visible = false;
                        page.lvCustomers.visible = true;
                        initSearchViewAndMapView();
                    }
                });
            }, initTime);

            // ListView.constructor.prototype.refreshCustomers = function(customerData) {
            //     bindData(customerData);
            // }

            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            backAction(page);
            applyTheme();
            page.headerBar.title = lang.customers;
        };

        function initSearchViewAndMapView() {

            var items = [];

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

                items.push(filterItem);
                page.headerBar.items = items;
            }

            var customerMapItem = new HeaderBarItem({
                onPress: function() {
                    changeVisibleCustomerfl.call(page);
                    changeVisiblecustomerMapview.call(page);
                },
                image: Image.createFromFile("images://mapicon.png"),
                color: Color.WHITE
            });

            items.push(customerMapItem);
            page.headerBar.setItems(items);

            svFilter = new SearchView({
                textColor: System.OS === "Android" ? Color.WHITE : Color.BLACK,
                hint: lang.search,
                onSearchBegin: function() {
                    filterActive = true;
                    unfilteredDataset = dataset;
                },
                onTextChanged: function(searchText) {
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

            initCustomersPin();

            page.lvCustomers.itemCount = dataset.length;
            page.lvCustomers.refreshData();
        }

        function showFilter() {
            if (!page.customerMapview.visible) {
                filterActive = true;
                unfilteredDataset = dataset;
                //if (!svFilter) return;
                svFilter.addToHeaderBar(page);
                svFilter.requestFocus();
                page.headerBar.setItems([]);
            }
        }

        function hideFilter() {
            if (!page.customerMapview.visible) {
                filterActive = false;
                //if (!svFilter) return;
                svFilter.removeFromHeaderBar(page);
                page.headerBar.setItems(page.headerBar.items);
                if (dataset !== unfilteredDataset) {
                    bindData({
                        items: unfilteredDataset
                    }, false);

                }
                filterActive = false;
            }
        }

        var doNotProduceAgain = false;

        function initCustomersPin() {

            if (!doNotProduceAgain) {
                dataset.forEach((person) => {
                    if (person.address.latitude !== "" && person.address.longitudem !== "") {
                        var customerPin = new MapView.Pin({
                            location: {
                                latitude: person.address.latitude,
                                longitude: person.address.longitude
                            },
                            title: person.lookupName
                        });

                        page.customerMapview.addPin(customerPin);
                    }
                });

                doNotProduceAgain = true;
            }
            else {
                var latestCustomer = dataset[(dataset.length - 1)];
                if (latestCustomer.address.latitude !== "" && latestCustomer.address.longitude !== "") {
                    var customerPin = new MapView.Pin({
                        location: {
                            latitude: latestCustomer.address.latitude,
                            longitude: latestCustomer.address.longitude
                        },
                        title: latestCustomer.lookupName
                    });

                    page.customerMapview.addPin(customerPin);
                }
            }

        }

        function changeVisibleCustomerfl() {
            const page = this;

            if (page.customerfl.visible) {
                page.customerfl.visible = false;
            }
            else {
                page.customerfl.visible = true;
            }

        }

        function changeVisiblecustomerMapview() {
            const page = this;

            if (page.customerMapview.visible) {
                page.customerMapview.visible = false;
                svFilter.visible = true;
            }
            else {
                page.customerMapview.visible = true;
                svFilter.visible = false;
            }
        }

    });


module && (module.exports = pgCustomers);

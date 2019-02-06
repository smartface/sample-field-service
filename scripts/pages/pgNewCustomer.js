/*globals lang */
const extend = require("js-base/core/extend");
const Router = require("../router/index");
const pgNewCustomerDesign = require("../ui/ui_pgNewCustomer");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');
const Color = require('sf-core/ui/color');
const Multimedia = require("sf-core/device/multimedia");
const TextInput = require("../lib/ui").TextInput;
const FlexLayout = require('sf-core/ui/flexlayout');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const KeyboardType = require('sf-core/ui/keyboardtype');
const TextAlignment = require('sf-core/ui/textalignment');
const permission = require("sf-extension-utils").permission;
const Application = require('sf-core/application');
const System = require('sf-core/device/system');
const Menu = require('sf-core/ui/menu');
const MenuItem = require('sf-core/ui/menuitem');
const location = require("sf-extension-utils").location;
const Http = require("sf-core/net/http");
const pgCustomers = require("../pages/pgCustomers");
const textInputDefaults = {
    positionType: FlexLayout.PositionType.ABSOLUTE,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlignment: TextAlignment.MIDLEFT
};
const theme = require("../lib/theme");
const DialogWait = require("../components/DialogWait");
const addCustomer = require("../model/customers").addCustomer;
const mimicPressed = require("../lib/ui").mimicPressed;
const VMasker = require('vanilla-masker/lib/vanilla-masker');
const pgNewCustomer = extend(pgNewCustomerDesign)(
    function(_super,routeData) {
        const page = this;
        _super(this);
        this.routeData = routeData;
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var tiName, tiSurname, tiEmail, tiPhone, tiAddress;
        var pictureSet = false;
        var touchControl = {};
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;
            
            Application.android.onBackButtonPressed = () => {
                Router.goBack();
            }
            
            // page.android.onBackButtonPressed = function(e) {
            //     back();
            // };

            var saveItem = new HeaderBarItem({
                onPress: function() {
                    save();
                },
                image: Image.createFromFile("images://new_customer_ok.png"),
                color: Color.WHITE
            });
            page.headerBar.items = [saveItem];
            page.headerBar.setItems([saveItem]);

            var cancelItem = new HeaderBarItem({
                title: lang.cancel,
                onPress: function() {
                    back();
                },
                color: Color.create("#50D2C2")
            });
            page.headerBar.leftItem = cancelItem;
            page.headerBar.setLeftItem(cancelItem);

            page.btnPicture.backgroundImage = Image.createFromFile("images://new_customer_picture.png");
            page.btnPicture.onPress = pickPicture;

            mimicPressed(page.imgPicture, function() {
                pickPicture();
            }, touchControl);


            tiName = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.name,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiSurname.requestFocus();
                }
            });
            page.flName.addChild(tiName);


            tiSurname = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.surname,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiEmail.requestFocus();
                }
            });
            page.flSurname.addChild(tiSurname);

            tiEmail = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.eMail,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiPhone.requestFocus();
                },
                keyboardType: KeyboardType.EMAILADDRESS
            });
            page.flEmail.addChild(tiEmail);

            tiPhone = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.phone,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiAddress.requestFocus();
                },
                onTextChanged: function(e) {
                    var maskedText = VMasker.toPattern(this.text, "+(9)-999-999-9999");
                    this.text = maskedText;
                },
                keyboardType: KeyboardType.PHONE
            });
            page.flPhone.addChild(tiPhone);

            tiAddress = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.Adress,
                actionKeyType: ActionKeyType.SEND,
                onActionButtonPress: function(e) {
                    save();
                },
            });
            page.flAddress.addChild(tiAddress);

            page.selectMapButton.text = lang.selectOnMap;
            page.selectMapButton.onPress = function() {
                Router.push("/slider/customersPage/pgSelectMap");
            };

            if (System.OS === "iOS") {
                page.btnPicture.visible = true;
                page.imgPicture.visible = false;
            }
            else {
                page.btnPicture.visible = false;
                page.imgPicture.visible = true;
            }

        };

        var location;
        page.onShow = function onShow(data) {
            data = this.routeData;
            baseOnShow && baseOnShow(data);
            Application.statusBar.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();

            //alert("size " + page.selectMapButton.font );
            //EBTEMPORARY
            // location.getLocation(function(err, location) {
            //     if (err) {
            //         console.log("location err");
            //         return;
            //     }
            //     var requestOptions = {
            //         'url': 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=true',
            //         'method': 'GET'
            //     };
            //     var http = new Http();
            //     http.request(requestOptions,
            //         function(response) {
            //             if (response.headers["Content-Type"] && response.headers["Content-Type"].indexOf("application/json") > -1 && tiAddress) {
            //                 var locationResponse = JSON.parse(response.body.toString());
            //                 if (locationResponse.status === "OK" && locationResponse.results &&
            //                     locationResponse.results[0] && locationResponse.results[0].formatted_address
            //                 ) {
            //                     tiAddress.text = locationResponse.results[0].formatted_address;
            //                 }
            //             }
            //         },
            //         function() {
            //             console.log("failure http");
            //         }
            //     );
            // });
            page.headerBar.title = lang.newCustomer;

            if (data !== undefined) {
                tiAddress.text = data.adress;

                if (data.location) {
                    location = data.location;
                }
            }


        };

        page.onHide = function() {
            tiName.removeFocus();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            Application.statusBar.android && (Application.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.headerBar.leftItem && (page.headerBar.leftItem.color = selectedTheme.secondaryColor);
        }

        function back() {
            //TODO: check values ask save?
            Router.goBack();
        }


        function save() {
            var isValid = true;
            if (tiName.text.length === 0) {
                isValid = false;
                tiName.invalidate();
            }
            if (tiSurname.text.length === 0) {
                isValid = false;
                tiSurname.invalidate();
            }

            Application.hideKeyboard();

            if (!isValid) {
                return;
            }

            var dialogWait = DialogWait.show();

            var customerData = {
                name: {
                    first: tiName.text,
                    last: tiSurname.text
                },
                lookupName: tiName.text + " " + tiSurname.text,
                address: {
                    street: tiAddress.text,
                    latitude: (location !== undefined) ? location.latitude : "",
                    longitude: (location !== undefined) ? location.longitude : ""
                },
                customFields: {
                    CO: {
                        Email: tiEmail.text,
                        Phone: tiPhone.text
                    }
                }
            };
            if (pictureSet) {
                var picture = pictureSet;
                //TODO: increase quality
                //console.log("Picture is " + customerData.customFields.CO.Picture);
                customerData.customFields.CO.Picture = picture.compress(Image.Format.JPEG, 100).toBase64();
            }

            addCustomer(customerData, function(err, newCustomerData) {
                console.log("after adding customer. Is there error? " + !!err);
                if (err) {
                    dialogWait.hide();
                    return alert(JSON.stringify(err), "Customer Service Error");
                }
                dialogWait.showOK(function() {
                    clearDataOnSave.call(page);
                    dialogWait.hide();
                    Router.goBack();
                });
            });
        }

        function clearDataOnSave() {
            const page = this;

            tiName.text = "";
            tiSurname.text = "";
            tiAddress.text = "";
            tiEmail.text = "";
            tiPhone.text = "";

            var emptyPicture = Image.createFromFile("images://customers_empty.png");
            if (System.OS === "iOS")
                page.btnPicture.backgroundImage = emptyPicture;
            else
                page.imgPicture.image = emptyPicture;
        }

        function pickPicture() {
            showPictureselectionModeMenu();

            function showPictureselectionModeMenu() {
                var menu = new Menu();
                menu.headerTitle = lang.addAPicture;
                menu.items = [
                    new MenuItem({
                        title: lang.takePicture,
                        onSelected: function() {
                            startCamera();
                        }
                    }),
                    new MenuItem({
                        title: lang.selectFromGallery,
                        onSelected: function() {
                            pickImage();
                        }
                    }),
                    new MenuItem({
                        title: lang.cancel,
                        onSelected: function() {},
                        ios: {
                            style: MenuItem.ios.Style.CANCEL
                        }
                    })
                ];

                menu.show(page);
            }

            function pickImage() {
                if (System.OS === "Android") {
                    permission.getPermission(Application.android.Permissions.READ_EXTERNAL_STORAGE, function() {
                        pickImageAction();
                    });
                }
                else {
                    pickImageAction();
                }
            }

            function pickImageAction() {
                Multimedia.pickFromGallery({
                    allowsEditing: true,
                    type: Multimedia.Type.IMAGE,
                    onSuccess: onSuccess,
                    page: page
                });
            }

            function startCamera() {
                permission.getPermission(Application.android.Permissions.CAMERA, function(err) {
                    if (err)
                        return;
                    permission.getPermission(Application.android.Permissions.WRITE_EXTERNAL_STORAGE, function(err) {
                        if (err)
                            return;
                        startCameraAction();
                    });
                });
            }

            function startCameraAction() {
                Multimedia.startCamera({
                    allowsEditing: true,
                    onSuccess: onSuccess,
                    action: Multimedia.ActionType.IMAGE_CAPTURE,
                    page: page
                });
            }

            function onSuccess(picked) {
                var image = picked.image;
                pictureSet = (System.OS === "iOS") ? image : image.android.round(36.5);
                if (System.OS === "iOS")
                    page.btnPicture.backgroundImage = pictureSet;
                else
                    page.imgPicture.image = pictureSet;
            }
        }
    });



module && (module.exports = pgNewCustomer);

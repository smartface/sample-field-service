/*globals lang */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
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
const permission = require("../lib/permission");
const Application = require('sf-core/application');
const System = require('sf-core/device/system');
const Menu = require('sf-core/ui/menu');
const MenuItem = require('sf-core/ui/menuitem');
const location = require("../lib/location");
const Http = require("sf-core/net/http");
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

const pgNewCustomer = extend(pgNewCustomerDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var tiName, tiSurname, tiEmail, tiPhone, tiAddress;
        var pictureSet = false;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.android.onBackButtonPressed = function(e) {
                back();
            };

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

            page.btnPicture.backgroundImage = {
                normal: Image.createFromFile("images://new_customer_picture.png")
            };
            page.btnPicture.onPress = pickPicture;


            tiName = Object.assign(new TextInput, textInputDefaults, {
                hint: lang.name,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiSurname.requestFocus();
                }
            });
            page.flName.addChild(tiName);


            tiSurname = Object.assign(new TextInput, textInputDefaults, {
                hint: lang.surname,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiEmail.requestFocus();
                }
            });
            page.flSurname.addChild(tiSurname);

            tiEmail = Object.assign(new TextInput, textInputDefaults, {
                hint: lang.eMail,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiPhone.requestFocus();
                },
                keyboardType: KeyboardType.EMAILADDRESS
            });
            page.flEmail.addChild(tiEmail);

            tiPhone = Object.assign(new TextInput, textInputDefaults, {
                hint: lang.phone,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiAddress.requestFocus();
                },
                keyboardType: KeyboardType.PHONE
            });
            page.flPhone.addChild(tiPhone);

            tiAddress = Object.assign(new TextInput, textInputDefaults, {
                hint: lang.Adress,
                actionKeyType: ActionKeyType.SEND,
                onActionButtonPress: function(e) {
                    save();
                }
            });
            page.flAddress.addChild(tiAddress);

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();
            location.getLocation(function(err, location) {
                if (err) {
                    console.log("location err");
                    return;
                }
                var requestOptions = {
                    'url': 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=true',
                    'method': 'GET'
                };
                Http.request(requestOptions,
                    function(response) {
                        if (response.headers["Content-Type"] && response.headers["Content-Type"].indexOf("application/json") > -1 && tiAddress) {
                            var locationResponse = JSON.parse(response.body.toString());
                            if (locationResponse.status === "OK" && locationResponse.results &&
                                locationResponse.results[0] && locationResponse.results[0].formatted_address
                            ) {
                                tiAddress.text = locationResponse.results[0].formatted_address;
                            }
                        }
                    },
                    function() {
                        console.log("failure http");
                    }
                );
            });
            page.headerBar.title = lang.newCustomer;
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
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

            tiAddress.hideKeyboard();
            tiEmail.hideKeyboard();
            tiName.hideKeyboard();
            tiPhone.hideKeyboard();
            tiSurname.hideKeyboard();

            if (!isValid) {
                return;
            }
            var dialogWait = DialogWait.show();
            
            var customerData = {
                lookupName: tiName.text + " " + tiSurname,
                address: {
                    street: tiAddress.text
                },
                CO: {
                    Email: tiEmail.text,
                    Phone: tiPhone.text,

                }
            };
            if (pictureSet) {
                var picture = page.btnPicture.backgroundImage.normal || page.btnPicture.backgroundImage;
                //TODO: increase quality
                customerData.CO.Picture = picture.compress(Image.Format.JPEG, 1).toBase64();
            }
            
            addCustomer(customerData, function(err, newCustomerData) {
                console.log("after adding customer. Is there error? " + !!err);
                if (err) {
                    dialogWait.hide();
                    return alert(JSON.stringify(err), "Customer Service Error");
                }
                dialogWait.showOK(function() {
                    dialogWait.hide();
                    Router.goBack();
                });

            });
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
                    permission.checkPermission(Application.android.Permissions.READ_EXTERNAL_STORAGE, function() {
                        pickImageAction();
                    });
                }
                else {
                    pickImageAction();
                }
            }

            function pickImageAction() {
                Multimedia.pickFromGallery({
                    type: Multimedia.Type.IMAGE,
                    onSuccess: onSuccess,
                    page: page
                });
            }

            function startCamera() {
                permission.checkPermission(Application.android.Permissions.CAMERA, function(err) {
                    if (err)
                        return;
                    permission.checkPermission(Application.android.Permissions.WRITE_EXTERNAL_STORAGE, function(err) {
                        if (err)
                            return;
                        startCameraAction();
                    });
                });
            }

            function startCameraAction() {
                Multimedia.startCamera({
                    onSuccess: onSuccess,
                    action: Multimedia.ActionType.IMAGE_CAPTURE,
                    page: page
                });
            }

            function onSuccess(picked) {
                var image = picked.image;
                page.btnPicture.backgroundImage = {
                    normal: image
                };
                pictureSet = true;
            }
        }
    });



module && (module.exports = pgNewCustomer);

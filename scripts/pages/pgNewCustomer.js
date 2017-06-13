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
const textInputDefaults = {
    positionType: FlexLayout.PositionType.ABSOLUTE,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlignment: TextAlignment.MIDLEFT
};

const pgNewCustomer = extend(pgNewCustomerDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var tiName, tiSurname, tiEmail, tiPhone, tiAddress;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            var saveItem = new HeaderBarItem({
                title: "",
                onPress: function() {
                    save();
                },
                image: Image.createFromFile("images://new_customer_ok.png"),
                color: Color.WHITE
            });
            page.headerBar.setItems([saveItem]);

            var cancelItem = new HeaderBarItem({
                title: "Cancel",
                onPress: function() {
                    back();
                },
                color: Color.create("#50D2C2")
            });
            page.headerBar.setLeftItem(cancelItem);

            page.btnPicture.backgroundImage = {
                normal: Image.createFromFile("images://new_customer_picture.png")
            };
            page.btnPicture.onPress = pickPicture;


            tiName = Object.assign(new TextInput, textInputDefaults, {
                hint: "Name",
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiSurname.requestFocus();
                }
            });
            page.flName.addChild(tiName);


            tiSurname = Object.assign(new TextInput, textInputDefaults, {
                hint: "Surname",
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiEmail.requestFocus();
                }
            });
            page.flSurname.addChild(tiSurname);

            tiEmail = Object.assign(new TextInput, textInputDefaults, {
                hint: "E-mail",
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiPhone.requestFocus();
                },
                keyboardType: KeyboardType.EMAILADDRESS
            });
            page.flEmail.addChild(tiEmail);

            tiPhone = Object.assign(new TextInput, textInputDefaults, {
                hint: "Phone",
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiAddress.requestFocus();
                },
                keyboardType: KeyboardType.PHONE
            });
            page.flPhone.addChild(tiPhone);

            tiAddress = Object.assign(new TextInput, textInputDefaults, {
                hint: "Surname",
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

        };

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

            if (!isValid) {
                return;
            }

            Router.goBack();
        }

        function pickPicture() {
            //TODO: Android permission
            Multimedia.pickFromGallery({
                type: Multimedia.Type.IMAGE,
                onSuccess: onSuccess,
                page: page
            });

            function onSuccess(picked) {
                var image = picked.image;
                page.btnPicture.backgroundImage = {
                    normal: image
                };
            }
        }
    });



module && (module.exports = pgNewCustomer);

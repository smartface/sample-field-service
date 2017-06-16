/*globals lang, Application*/
const System = require('sf-core/device/system');
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const mcs = require("../lib/mcs");
const pgLoginDesign = require("../ui/ui_pgLogin");
const TextInput = require("../lib/ui").TextInput;
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Network = require('sf-core/device/network');
const sliderDrawer = require("../sliderDrawer");
const userData = require("../model/user");
const rau = require("../lib/rau");
const theme = require("../lib/theme");
const KeyboardType = require('sf-core/ui/keyboardtype');
// const Application = require("sf-core/application");

const pgLogin = extend(pgLoginDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var tiUserName, tiPassword;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            tiUserName = new TextInput();
            Object.assign(tiUserName, {
                height: 30,
                hint: lang.username,
                actionKeyType: ActionKeyType.NEXT,
                onActionButtonPress: function(e) {
                    tiPassword.requestFocus();
                }
            });
            tiPassword = new TextInput();
            Object.assign(tiPassword, {
                height: 30,
                hint: lang.password,
                isPassword: true,
                actionKeyType: ActionKeyType.GO,
                onActionButtonPress: function(e) {
                    doLogin();
                }
            });
            if(System.OS === "Android") {
                tiPassword.keyboardType = KeyboardType.android.TEXTNOSUGGESTIONS;
            }

            page.flInputs.addChild(tiUserName);
            page.flInputs.addChild(tiPassword);
            page.btnLogin.onPress = doLogin;
            page.btnLogin.text = lang.login;

            page.android.onBackButtonPressed = function(e) {
                Application.exit();
            };

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            page.headerBar.visible = false;
            sliderDrawer.enabled = false;
            tiUserName.text = tiPassword.text = "";
            page.setState(true);
            userData.currentUser = null;
            if (data && data.checkUpdate) {
                setTimeout(function() {
                    rau.checkUpdate();
                }, 10);
            }
            applyTheme();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.imgLogo.image = selectedTheme.logo;
            page.btnLogin.backgroundColor = selectedTheme.mainColor;
        }

        page.setState = function setState(enabled) {
            page.aiLogin.visible = !enabled;
            page.btnLogin.enabled = !!enabled;
            tiPassword.touchEnabled = !!enabled;
            tiUserName.touchEnabled = !!enabled;
            tiPassword.hideKeyboard();
            tiUserName.hideKeyboard();
        };


        function doLogin() {
            if (!tiPassword || !tiUserName)
                return;
            var isValid = true;
            if (tiUserName.text.length === 0) {
                tiUserName.invalidate();
                isValid = false;
            }
            if (tiPassword.text.length === 0) {
                tiPassword.invalidate();
                isValid = false;
            }
            if (Network.connectionType === Network.ConnectionType.None) {
                isValid = false;
                alert(lang.noInternetMessage, lang.noInternetTitle);
            }
            if (!isValid)
                return;
            page.setState(false);


            mcs.login({
                username: tiUserName.text.toLowerCase().trim(),
                password: tiPassword.text.trim()
            }, function(err, result) {
                page.setState(true);
                if (err) {
                    return alert("LOGIN FAILED.  " + err, "MCS Login Error");
                }
                if (typeof result === "string") {
                    try {
                        result = JSON.parse(result);
                    }
                    finally {}
                }
                userData.currentUser = result;
                sliderDrawer.setUserData();

                // console.log(JSON.stringify(result));

                // alert("success");
                // proceedNotifications();
                showDashboard();
            });

            function showDashboard() {
                //TODO: set sliderDrawerValues
                sliderDrawer.enabled = true;
                Router.go("pgDashboard");
            }

            // function proceedNotifications() {
            //     console.log("before getting notifications");
            //     notifications.getNotifications(function(err, notificationsData) {
            //         console.log("after getting notifications. Is there error? " + !!err);
            //         if (err) {
            //             return alert(JSON.stringify(err), "Notifications Service Error");
            //         }

            //         //Router.go("pgNotification", notificationsData);
            //     });
            // }
        }

        if (Application.currentReleaseChannel === "test") {
            page.imgLogo.onTouch = function() {
                tiPassword.text = "123qweASD";
                tiUserName.text = "fieldservice";
            };
        }



    });



module && (module.exports = pgLogin);

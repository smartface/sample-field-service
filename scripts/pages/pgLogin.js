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
const rau = require("sf-extension-utils").rau;
const theme = require("../lib/theme");
const KeyboardType = require('sf-core/ui/keyboardtype');
const fingerprint = require("sf-extension-utils").fingerprint;

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
                    startLogin();
                }
            });
            if (System.OS === "Android") {
                tiPassword.keyboardType = KeyboardType.android.TEXTNOSUGGESTIONS;
            }

            page.flInputs.addChild(tiUserName);
            page.flInputs.addChild(tiPassword);
            page.btnLogin.onPress = startLogin;
            page.btnLogin.text = lang.login;

            page.android.onBackButtonPressed = function(e) {
                Application.exit();
            };

            fingerprint.init({
                userNameTextBox: tiUserName,
                passwordTextBox: tiPassword
            });

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            page.headerBar.visible = false;
            sliderDrawer.enabled = false;
            tiPassword.text = "";
            page.setState(true);
            userData.currentUser = null;
            if (data && data.checkUpdate) {
                setTimeout(function() {
                    rau.checkUpdate();
                }, 10);
            }
            applyTheme();

            //TODO: delete
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


        function startLogin() {
            if (!tiPassword || !tiUserName)
                return;
            var isValid = true;
            if (tiUserName.text.length === 0) {
                tiUserName.invalidate();
                isValid = false;
            }
            if (Network.connectionType === Network.ConnectionType.None) {
                isValid = false;
                alert(lang.noInternetMessage, lang.noInternetTitle);
            }
            if (!isValid)
                return;

            fingerprint.loginWithFingerprint(function(err, fingerprintResult) {
                var password = "",
                    success = fingerprintResult && fingerprintResult.success;
                if (err) {
                    password = tiPassword.text;
                }
                else {
                    password = fingerprintResult.password;
                }
                if (password.length === 0) {
                    tiPassword.invalidate();
                    isValid = false;
                }

                if (!isValid)
                    return;
                page.setState(false);

                performLogin(password, success);
            });




        }

        function performLogin(password, success) {
            password = password || tiPassword.text.trim();
            mcs.login({
                username: tiUserName.text.toLowerCase().trim(),
                password: password
            }, function(err, result) {
                page.setState(true);
                if (err) {
                    if (typeof err === "object") {
                        if (typeof err.body === "object") {
                            try {
                                err.body = JSON.parse(err.body.toString());
                            }
                            catch (ex) {
                                err.body = err.body.size !== 0 ? err.body.toString() : "";
                            }
                        }
                        err = JSON.stringify(err);
                    }
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
                success && success();
                showDashboard();
            });

            function showDashboard() {
                sliderDrawer.enabled = true;
                Router.go("pgDashboard");
            }
        }

        if (Application.currentReleaseChannel === "test") {
            page.imgLogo.onTouch = function() {
                tiPassword.text = "123qweASD";
                tiUserName.text = "fieldservice";
            };
        }
    });



module && (module.exports = pgLogin);

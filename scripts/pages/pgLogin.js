/*globals lang, Application*/
const System = require('sf-core/device/system');
const extend = require("js-base/core/extend");
const Router = require("../router/index");
const mcs = require("../lib/mcs");
const pgLoginDesign = require("../ui/ui_pgLogin");
const TextInput = require("../lib/ui").TextInput;
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Network = require('sf-core/device/network');
const sliderDrawer = require("../sliderDrawer");
const userData = require("../model/user");
const rau = require("sf-extension-utils/lib/rau");
const theme = require("../lib/theme");
const KeyboardType = require('sf-core/ui/keyboardtype');
const fingerprint = require("sf-extension-utils/lib/fingerprint");
const Application = require('sf-core/application');
const login = require("../model/getAuthUser");

const pgLogin = extend(pgLoginDesign)(
    function(_super,routeData,router) {
        const page = this;
        _super(this);
        
        page.router = router;
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        var tiUserName, tiPassword;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;

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

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            page.headerBar.visible = false;
            sliderDrawer.enabled = false;
            const ImageView = require('sf-core/ui/imageview');
            page.imgLogo.imageFillType = ImageView.FillType.ASPECTFIT;
            tiPassword.text = "";
            page.setState(true);
            userData.currentUser = null;
            if (data && data.checkUpdate) {
                setTimeout(function() {
                    rau.checkUpdate({
                        url: "https://smf.to/fieldservice" //if the update is incompatible will redirect to this url
                    });
                }, 10);
            }
            applyTheme();

            fingerprint.init({
                userNameTextBox: tiUserName,
                passwordTextBox: tiPassword,
                autoLogin: true,
                callback: function(err, fingerprintResult) {
                    var password = "",
                        success = fingerprintResult && fingerprintResult.success;
                    if (err) {
                        password = tiPassword.text;
                    }
                    else {
                        password = fingerprintResult.password;
                    }
                    if (!password) {
                        return tiPassword.invalidate();
                    }

                    page.setState(false);
                    performLogin(password, success);
                }
            });
        };

        page.onHide = function() {
            tiPassword.removeFocus();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            Application.statusBar.android && (Application.statusBar.android.color = selectedTheme.topBarColor);
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

            fingerprint.loginWithFingerprint();
        }

        function performLogin(password, success) {
            login.userAuth.confirmUser({
                username: tiUserName.text,
                password: password
            }, function(err, userData) {
                page.setState(true);
                if (err) {
                    return alert("Invalid credential");
                }
                sliderDrawer.setUserData();
                success && success();
                showDashboard();
            });
        }

        function showDashboard() {
            sliderDrawer.enabled = true;
            page.router.push("/slider/pgDashboard");
        }

        page.imgLogo.onTouch = function() {
            tiPassword.text = "123qweASD";
            tiUserName.text = "fieldservice";
        };
    });

module && (module.exports = pgLogin);

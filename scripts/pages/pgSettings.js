/* globals lang */
const Application = global.Application;
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgSettingsDesign = require("../ui/ui_pgSettings");
const sliderDrawer = require("../sliderDrawer");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const theme = require("../lib/theme");
const fingerprint = require("sf-extension-utils").fingerprint;
const Data = require('sf-core/data');
const Color = require("sf-core/ui/color");

const pgSettings = extend(pgSettingsDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.ios.safeAreaLayoutMode = true;

            sliderDrawer.setLeftItem(page.headerBar);
            page.android.onBackButtonPressed = function(e) {
                Router.goBack("pgDashboard");
            };
            page.lblAbout.text = lang.about + " v" + Application.version;
            page.swNotifications.toggle = true;
            page.lblText.text = lang.aboutContent;

            page.flNavySelection.onTouchEnded = function() {
                if (theme.selected !== theme.themes.NAVY) {
                    theme.selected = theme.themes.NAVY;
                    setThemeBox();
                    applyTheme();
                    sliderDrawer.applyTheme();
                    Data.setStringVariable("theme", theme.selected);
                }
            };

            page.flPurpleSelection.onTouchEnded = function() {
                if (theme.selected !== theme.themes.PURPLE) {
                    theme.selected = theme.themes.PURPLE;
                    setThemeBox();
                    applyTheme();
                    sliderDrawer.applyTheme();
                    Data.setStringVariable("theme", theme.selected);
                }
            };

            page.lblTheme.text = lang.theme;
            page.lblNotifications.text = lang.notification;
            page.lblFingerPrint.text = lang.useFingerprintTitle;

            page.swFingerprint.toggle = fingerprint.useFingerprintLogin;
            page.swFingerprint.onToggleChanged = function() {
                fingerprint.useFingerprintLogin = page.swFingerprint.toggle;
            }.bind(page);
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            sliderDrawer.enabled = true;
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            setThemeBox();
            applyTheme();

            page.headerBar.title = lang.settings;

        };

        function setThemeBox() {
            var selected = theme.selected;
            if (selected === theme.themes.NAVY) {
                page.flNavySelection.borderWidth = 1;
                page.flPurpleSelection.borderWidth = 0;
            }
            else if (selected === theme.themes.PURPLE) {
                page.flNavySelection.borderWidth = 0;
                page.flPurpleSelection.borderWidth = 1;
            }
        }

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.swFingerprint.thumbOnColor = page.swNotifications.thumbOnColor = selectedTheme.thumbOnColor;
            page.swFingerprint.toggleOnColor = page.swNotifications.toggleOnColor = Color.create("#dfd8d8");
            page.flLineTheme.backgroundColor = selectedTheme.lineSeparator;
            page.flLineNotifications.backgroundColor = selectedTheme.lineSeparator;
        }
    });



module && (module.exports = pgSettings);

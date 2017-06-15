/* globals lang */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgCustomerFilterDesign = require("../ui/ui_pgCustomerFilter");
const TextInput = require("../lib/ui").TextInput;
const TextAlignment = require('sf-core/ui/textalignment');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Animator = require('sf-core/ui/animator');
const System = require('sf-core/device/system');
const KeyboardType = require('sf-core/ui/keyboardtype');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const backAction = require("../lib/ui").backAction;
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');
const theme = require("../lib/theme");


const textInputDefaults = {
    textAlignment: TextAlignment.MIDLEFT,
    positionType: FlexLayout.PositionType.ABSOLUTE,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

const pgCustomerFilter = extend(pgCustomerFilterDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;

        var selectedTheme = theme[theme.selected];
        const tabActiveTextColor = selectedTheme.secondaryColor;
        const tabInactiveTextColor = selectedTheme.inactiveColor;
        page.btnCard.backgroundColor = page.btnName.backgroundColor = selectedTheme.topBarColor;

        var searchMode = "name";
        var tiName, tiCard, tiEmail, tiPhone;
        if (!page.layout.applyLayout)
            page.layout.applyLayout = function dummyApplyLayout() {};

        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            page.headerBar.title = lang.search;

            page.flTabIndicator.touchEnabled = false;

            tiName = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.nameSurname,
                onActionButtonPress: function() {
                    tiPhone.focus();
                },
                actionKeyType: ActionKeyType.NEXT
            });
            page.flNameInputArea.addChild(tiName);

            tiCard = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.cardNumber,
                keyboardType: KeyboardType.NUMBER,
                onActionButtonPress: function() {
                    tiPhone.focus();
                },
                actionKeyType: ActionKeyType.NEXT
            });
            page.flCardInputArea.addChild(tiCard);

            tiPhone = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.phone,
                keyboardType: KeyboardType.PHONE,
                onActionButtonPress: function() {
                    tiEmail.focus();
                },
                actionKeyType: ActionKeyType.NEXT
            });
            page.flPhoneInputArea.addChild(tiPhone);


            tiEmail = Object.assign(new TextInput(), textInputDefaults, {
                hint: lang.eMail,
                keyboardType: KeyboardType.EMAILADDRESS,
                onActionButtonPress: function() {
                    doSearch();
                },
                actionKeyType: ActionKeyType.SEARCH
            });
            page.flEmailInputArea.addChild(tiEmail);

            page.btnName.onPress = function() {
                page.flCardInput.flexGrow = 0;
                page.flNameInput.flexGrow = 1;
                page.flFirstLine.applyLayout();
                Animator.animate((System.OS === "iOS") ? page.layout : page.flButtons, 350, function() {
                    page.placeHolderLeft.flexGrow = 0;
                    page.placeHolderRight.flexGrow = 1;
                    page.btnName.textColor = tabActiveTextColor;
                    page.btnCard.textColor = tabInactiveTextColor;
                }).complete(function() {

                });
                searchMode = "name";
            };

            page.btnCard.onPress = function() {
                page.flCardInput.flexGrow = 1;
                page.flNameInput.flexGrow = 0;
                page.flFirstLine.applyLayout();
                Animator.animate((System.OS === "iOS") ? page.layout : page.flButtons, 350, function() {
                    page.placeHolderLeft.flexGrow = 1;
                    page.placeHolderRight.flexGrow = 0;
                    page.btnName.textColor = tabInactiveTextColor;
                    page.btnCard.textColor = tabActiveTextColor;
                }).complete(function() {

                });
                searchMode = "card";
            };

            function doSearch() {
                if (searchMode === "name") {

                }
                else { // searchMode == "card" then

                }

                //TODO: go to service then pgCustomers
                Router.go("pgCustomers");
            }

            page.btnSearch.onPress = doSearch;


            var searchItem = new HeaderBarItem({
                title: "",
                onPress: function() {
                    doSearch();
                },
                image: Image.createFromFile("images://search_icon.png"),
                color: Color.WHITE
            });
            page.headerBar.setItems([searchItem]);
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            if (data) {
                data.reset && reset();
            }
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            backAction(page, "pgDashboard");
            applyTheme();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.flTabHighlight.backgroundColor = selectedTheme.secondaryColor;
        }


        function reset() {
            tiName.text = "";
            tiCard.text = "";
            tiEmail.text = "";
            tiPhone.text = "";
            page.placeHolderLeft.flexGrow = 0;
            page.placeHolderRight.flexGrow = 1;
            page.btnName.textColor = tabActiveTextColor;
            page.btnCard.textColor = tabInactiveTextColor;
            page.flCardInput.flexGrow = 0;
            page.flNameInput.flexGrow = 1;
            page.flFirstLine.applyLayout();
            searchMode = "name";
        }
    });



module && (module.exports = pgCustomerFilter);

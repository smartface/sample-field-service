const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const pgCustomerFilterDesign = require("../ui/ui_pgCustomerFilter");
const TextInput = require("../lib/ui").TextInput;
const TextAlignment = require('sf-core/ui/textalignment');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Animator = require('sf-core/ui/animator');
const System = require('sf-core/device/system');

const tabActiveTextColor = Color.create("#50D2C2");
const tabInactiveTextColor = Color.create('#C6C6C6');

const pgCustomerFilter = extend(pgCustomerFilterDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;

        var tiName;
        if (!page.layout.applyLayout)
            page.layout.applyLayou = function dummyApplyLayout() {};


        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.flTabIndicator.touchEnabled = false;

            tiName = Object.assign(new TextInput(), {
                hint: "Name Surname",
                textAlignment: TextAlignment.TOPLEFT,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            page.flNameInputArea.addChild(tiName);

            page.btnName.onPress = function() {
                Animator.animate((System.OS === "iOS") ? page.layout : page.flButtons, 350, function() {
                    page.placeHolderLeft.flexGrow = 0;
                    page.placeHolderRight.flexGrow = 1;
                    page.btnName.textColor = tabActiveTextColor;
                    page.btnCard.textColor = tabInactiveTextColor;
                }).complete(function() {
                    
                });
            };


            page.btnCard.onPress = function() {
                Animator.animate((System.OS === "iOS") ? page.layout : page.flButtons, 350, function() {
                    page.placeHolderLeft.flexGrow = 1;
                    page.placeHolderRight.flexGrow = 0;
                    page.btnName.textColor = tabInactiveTextColor;
                    page.btnCard.textColor = tabActiveTextColor;
                }).complete(function() {
                    
                });
            };
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);

        };

        function reset() {
            tiName.text = "";
            page.placeHolderLeft.flexGrow = 0;
            page.placeHolderRight.flexGrow = 1;
            page.btnName.textColor = tabActiveTextColor;
            page.btnCard.textColor = tabInactiveTextColor;
        }
    });



module && (module.exports = pgCustomerFilter);

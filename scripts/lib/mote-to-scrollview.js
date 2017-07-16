const FlexLayout = require('sf-core/ui/flexlayout');
const ScrollView = require('sf-core/ui/scrollview');
const Color = require('sf-core/ui/color');
const Screen = require('sf-core/device/screen');
const skipList = ["id", "flexGrow", "flexShrink", "height"];
const defaults = {
    alignSelf: FlexLayout.AlignSelf.STRETCH,
    positionType: FlexLayout.PositionType.RELATIVE
};

module.exports = exports = moveToScrollView;

function moveToScrollView(page) {
    if (page.__moved)
        return;
    page.layout.removeAll();
    var scrollView = new ScrollView(Object.assign({}, defaults, {
        flexGrow: 1
    }));

    assign(page.layout, scrollView.layout);
    Object.assign(scrollView.layout, Object.assign({}, defaults, {
        height: Screen.height - page.statusBar.height - page.headerBar.height
    }));

    for (var cName in page.children) {
        var c = page.children[cName];
        scrollView.layout.addChild(c);
    }
    page.layout.addChild(scrollView);
    page.layout.applyLayout();

    page.__moved = true;
}

function assign(source, target) {
    for (var propName in source) {
        if (skipList.indexOf(propName) > -1)
            continue;
        try {
            var p = source[propName];
            var typeofP = typeof p;

            if (typeofP === "function" || typeofP === "undefined" || p === null, isNaN(p))
                continue;

            if (propName === "iOS" || propName === "iOS" || propName === "Android" || propName === "android") {
                Object.assign(target[propName], p);
            }

            target[propName] = p;
        }
        catch (ex) {
            continue;
        }
    }
}

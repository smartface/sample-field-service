const View = require('sf-core/ui/view');
const Color = require('sf-core/ui/color');
const size = 2;
exports.createHShadowRight = createHShadowRight;
exports.createVShadowDown = createVShadowDown;
exports.size = size;
Object.freeze(exports.size);

function createShadowView(options, direction) {
    var shadow = new View(Object.assign({
        backgroundColor: Color.createGradient({
            direction: direction,
            startColor: Color.create(64, 0, 0, 0),
            endColor: Color.create(0, 0, 0, 0)
        })
    }, options));
    return shadow;
}

function createVShadowDown(options) {
    return createShadowView(Object.assign({
        height: size
    }, options), Color.GradientDirection.VERTICAL);
}

function createHShadowRight(options) {
    return createShadowView(Object.assign({
        width: size
    }, options), Color.GradientDirection.HORIZONTAL);
}

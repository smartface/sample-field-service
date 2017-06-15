const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
exports.themes = {
    NAVY: "NAVY",
    PURPLE: "PURPLE"
};

exports.selected = exports.themes.NAVY;


exports.PURPLE = {
    topBarColor: Color.create("#836CB3"),
    thumbOnColor: Color.create(255, 131, 108, 179),
    toggleOnColor: Color.create(128, 131, 108, 179),
    reportImage: Image.createFromFile("images://reports_purple.png"),
    dashboardColor: Color.WHITE,
    logo: Image.createFromFile("images://logo_purple.png"),
    mainColor: Color.create("#836CB3"),
    gradient: Color.create("#836CB3"),
    sliderDrawer: Color.createGradient({
        direction: Color.GradientDirection.HORIZONTAL,
        startColor: Color.create("#382B53"),
        endColor: Color.create("#4E4168")
    }),
    addCustomer: Image.createFromFile("images://add_customer_purple.png"),
    lineSeparator: Color.create("#979797"),
    secondaryColor: Color.create("#F6A623"),
};

exports.NAVY = {
    topBarColor: Color.create("#2C3239"),
    thumbOnColor: Color.create(255, 80, 210, 194),
    toggleOnColor: Color.create(128, 80, 210, 194),
    reportImage: Image.createFromFile("images://reports.png"),
    dashboardColor: Color.create(255, 36, 42, 52),
    logo: Image.createFromFile("images://logo.png"),
    mainColor: Color.create("#06BEBD"),
    gradient: Color.createGradient({
        direction: Color.GradientDirection.HORIZONTAL,
        startColor: Color.create("#06BEBD"),
        endColor: Color.create("#B7CE63")
    }),
    sliderDrawer: Color.createGradient({
        direction: Color.GradientDirection.HORIZONTAL,
        startColor: Color.create("#06BEBD"),
        endColor: Color.create("#7CC981")
    }),
    addCustomer: Image.createFromFile("images://add_customer.png"),
    lineSeparator: Color.createGradient({
        direction: Color.GradientDirection.HORIZONTAL,
        startColor: Color.create("#06BEBD"),
        endColor: Color.create("#B7CE63")
    }),
    secondaryColor: Color.create("#50D2C2"),
};

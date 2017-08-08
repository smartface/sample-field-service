const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const Data = require('sf-core/data');
exports.themes = {
    NAVY: "NAVY",
    PURPLE: "PURPLE"
};

exports.selected = Data.getStringVariable("theme") || exports.themes.PURPLE;


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
    inactiveColor: Color.create("#B395F0"),
    highlight: Color.create(135, 175, 92, 238),
    share: Image.createFromFile("images://share_purple.png"),
    addToContacts: Image.createFromFile("images://add_to_contacts_purple.png"),
    checkImage: Image.createFromFile("images://check_purple.png"),
    chartColors: [
        "#836CB3",
        "#F6A623",
        "#382B53",
        "#4E4168",
        "#B395F0",
        "#979797"
    ]
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
    inactiveColor: Color.create("#C6C6C6"),
    highlight: Color.create(135, 153, 236, 105),
    share: Image.createFromFile("images://share.png"),
    addToContacts: Image.createFromFile("images://add_to_contacts.png"),
    checkImage: Image.createFromFile("images://check.png"),
    chartColors: [
        "#2C3239",
        "#50D2C2",
        "#7CC981",
        "#06BEBD",
        "#C6C6C6",
        "#5FC690"
    ]
};

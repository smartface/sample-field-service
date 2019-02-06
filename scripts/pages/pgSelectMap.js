/* globals lang */
const extend = require('js-base/core/extend');
const Color = require('sf-core/ui/color');
const UI = require('sf-core/ui');
const theme = require("../lib/theme");
const PgSelectMapDesign = require('ui/ui_pgSelectMap');
const MapView = require('sf-core/ui/mapview');
const Application = require("sf-core/application");
const System = require('sf-core/device/system');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const Location = require('sf-core/device/location');
const Router = require('../router/index');
const AlertView = require('sf-core/ui/alertview');
const Http = require("sf-core/net/http");
var http = new Http();

var page;
var selectedLocation;
var myPin;

console.log("pgSelectMap");

const PgSelectMap = extend(PgSelectMapDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    page = this;
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
  Application.statusBar.style = StatusBarStyle.LIGHTCONTENT;
  page.headerBar.title = lang.map;
  applyTheme();

  var myItem = new UI.HeaderBarItem({
    title: lang.apply,
    color: Color.WHITE,
    onPress: function() {
      if (selectedLocation) {
        Router.goBack("/slider/customersPage/customers/pgNewCustomer", { adress: page.adressLabel.text, location: selectedLocation });
        selectedLocation = null;
      }
      else {
        var centerLocation = page.mapview.centerLocation;
        locationConfirmation(centerLocation);
      }
    }
  });
  page.headerBar.itemColor = Color.WHITE;
  page.headerBar.setItems([myItem]);

  // ANDROID PERMISSION
  // -------------------
  Application.android.requestPermissions(1002, Application.Android.Permissions.ACCESS_COARSE_LOCATION);
  Application.android.onRequestPermissionsResult = function(e) {
    if (e.result) {
      page.mapview.userLocationEnabled = true;
    }
  };
  // -------------------
  if (System.OS === "iOS") {
    page.mapview.userLocationEnabled = true;
  }
  // -------------------

  page.mapview.onPress = function(location) {
    selectedLocation = location;
    if (myPin) {
      page.mapview.removePin(myPin);
    }
    myPin = new MapView.Pin({
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      }
    });

    page.mapview.addPin(myPin);

  };

  Location.start([Location.Android.Provider.GPS, Location.Android.Provider.NETWORK]);
  Location.onLocationChanged = function(event) {
    page.mapview.centerLocation = event;
    getAdress(event);
    // locationConfirmation(event);
    Location.stop();
  };

}

function locationConfirmation(currentLocation) {

  var locationAlertView = new AlertView({
    title: lang.locationTitle || "Current Location",
    message: lang.locationMessage || "Do you wish to apply current location ? Otherwise you can select location."
  });
  locationAlertView.addButton({
    index: AlertView.ButtonType.NEGATIVE,
    text: lang.cancel
  });
  locationAlertView.addButton({
    index: AlertView.ButtonType.POSITIVE,
    text: lang.ok,
    onClick: function() {
      Router.goBack("pgNewCustomer", { adress: page.adressLabel.text, location: currentLocation });
      selectedLocation = null;
    }
  });

  locationAlertView.show();

}


function getAdress(location) {
  http.request({
    'url': 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&key=AIzaSyBzCXGodsAlhw05gW-e6OC-M2TIzLQuOio',
    'headers': {
      // YOUR_HEADER_HERE'
    },
    'method': 'GET',
    onLoad: function(response) {
      var parsedData = JSON.parse(response.body);
      if (parsedData.results.length > 0) {
        page.adressLabel.visible = true;
        page.adressLabel.text = parsedData.results[0].formatted_address;
      }
    },
    onError: function(e) {
      // Handle error like:
      if (e.statusCode === 500) {
        alert("Internal Server Error Occurred.");
      }
      else {
        alert("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
      }
    }
  });
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  
  Application.android.onBackButtonPressed = () => {
      Router.goBack();
  }
}

function applyTheme() {
  var selectedTheme = theme[theme.selected];
  Application.statusBar.android && (Application.statusBar.android.color = selectedTheme.topBarColor);
  page.headerBar.backgroundColor = selectedTheme.topBarColor;
}

module && (module.exports = PgSelectMap);

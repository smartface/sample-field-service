/*globals lang*/

module.exports = exports = relativeTime;

function relativeTime(date) {
    if (!date)
        return;
    var parsed_date
    if (typeof date === "string") {
        date = date.trim();
        date = date.replace(/\.\d\d\d+/, ""); // remove the milliseconds
        date = date.replace(/-/, "/").replace(/-/, "/"); //substitute - with /
        date = date.replace(/T/, " ").replace(/Z/, " UTC"); //remove T and substitute Z with UTC
        date = date.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // +08:00 -> +0800
        parsed_date = new Date(date);
    }
    else if (date instanceof Date) {
        parsed_date = date;
    }
    else {
        parsed_date = new Date(date);
    }
    if (isNaN(parsed_date.getTime()))
        throw Error("Invalid date specified");
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
    delta = (delta < 2) ? 2 : delta;
    var r = '';
    if (delta < 60) {
        r = delta + ' ' + (lang.secondsAgo || 'seconds ago');
    }
    else if (delta < 120) {
        r = lang.aMinuteAgo || 'a minute ago';
    }
    else if (delta < (45 * 60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' ' + (lang.minutesAgo || 'minutes ago');
    }
    else if (delta < (2 * 60 * 60)) {
        r = lang.anHourAgo || 'an hour ago';
    }
    else if (delta < (24 * 60 * 60)) {
        r = (parseInt(delta / 3600, 10)).toString() + ' ' + (lang.hoursAgo || 'hours ago');
    }
    else if (delta < (48 * 60 * 60)) {
        r = lang.aDayAgo || 'a day ago';
    }
    else {
        r = (parseInt(delta / 86400, 10)).toString() + ' ' + (lang.daysAgo || 'days ago');
    }
    return /*'about ' + */ r;
}

String.prototype.shortDateFormat = function() {
    return this.substr(0, this.indexOf('T'));
};
Number.prototype.padLeft = function(pad) {
    return pad.substring(0, pad.length - this.toString().length) + this.toString();
};
Date.prototype.shortDateFormat = function(){
    return this.getFullYear() +
        '-' +  (this.getUTCMonth()+1).padLeft('00') +
        '-' +  this.getUTCDate().padLeft('00');
};
String.prototype.removeTimestamp = function(){
    return this.substring(0, this.indexOf('T'));
};
String.prototype.capitalizeFirstLetter = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Date.prototype.shortReservationFormat = function() {
    var hours = this.getHours().padLeft('00');
    var amPm = getAmPm(hours);
    if(hours > 12) { hours = hours-12; }
    return (this.getMonth()+1).padLeft('00') +
        '/' +  this.getDate().padLeft('00') +
        '  ' +  hours +
        ':' + this.getMinutes().padLeft('00') + ' ' + amPm;
}
function getAmPm(hours) {
    var amPm = 'AM';
    if(hours >= 12) {
        if(hours !== '12') {
            hours = hours - 12;
        }
        amPm = 'PM';
    }
    return amPm;
}
Date.prototype.shortReservationTimeFormat = function() {
    var hours = this.getHours().padLeft('00');
    var amPm = getAmPm(hours);
    if(hours > 12) { hours = hours-12; }
    return  hours + ':' + this.getMinutes().padLeft('00') + ' ' + amPm;
}
String.prototype.shortReservationFormat = function() {
    return (new Date(this)).shortReservationFormat();
};
String.prototype.shortReservationTimeFormat = function() {
    return (new Date(this)).shortReservationTimeFormat();
};
Date.prototype.formatReservationDate = function() {
    var hours = this.getHours().padLeft('00');
    var amPm = getAmPm(hours);
    return this.getFullYear() +
        '-' +  (this.getMonth()+1).padLeft('00') +
        '-' +  this.getDate().padLeft('00') +
        ' ' +  hours +
        ':' + this.getMinutes().padLeft('00') + ' ' + amPm;
};
String.prototype.formatReservationDate = function() {
    return (new Date(this)).formatReservationDate();
};
Date.prototype.addDays = function(date, days) {
    return new Date(this.getTime() + days*60000*60*24);
}
Date.prototype.addDays = function(days) {
    return new Date(this.getTime() + days*60000*60*24);
}
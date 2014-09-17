'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require("mongoose-times");



/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
    name: String
}
    );
EmployeeSchema.plugin(timestamps, { created: "creation_datetime", lastUpdated: "updated_datetime" });

module.exports = mongoose.model('Employee',  EmployeeSchema);

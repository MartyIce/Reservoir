'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require("mongoose-times");

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
    name: String,
    email_address: String
}
    );
CustomerSchema.plugin(timestamps, { created: "creation_datetime", lastUpdated: "updated_datetime" });

module.exports = mongoose.model('Customer',  CustomerSchema);

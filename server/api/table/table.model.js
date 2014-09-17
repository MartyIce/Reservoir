'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Table Schema
 */
var TableSchema = new Schema({
    name: String,
    capacity: Number,
    notes: String,
    row: Number,
    col: Number
}
    );

module.exports = mongoose.model('Table',  TableSchema);

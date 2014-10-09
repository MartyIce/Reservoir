'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require("mongoose-times"),
    mongooseApiQuery = require('mongoose-api-query');


/**
 * Reservation Schema
 */
var ReservationSchema = new Schema({
        customer: {type: Schema.ObjectId, ref: 'Customer'},
        server: {type: Schema.ObjectId, ref: 'Employee'},
        seated_by: {type: Schema.ObjectId, ref: 'Employee'},
        scheduled_datetime: Date,
        seated_datetime: Date,
        completed_datetime: Date,
        notes: String,
        status: String,
        tables: [{type: Schema.Types.ObjectId, ref: 'Table'}],
        restaurantId: String
    }
);
ReservationSchema.plugin(timestamps, { created: "creation_datetime", lastUpdated: "updated_datetime" });
ReservationSchema.plugin(mongooseApiQuery);

module.exports = mongoose.model('Reservation', ReservationSchema);

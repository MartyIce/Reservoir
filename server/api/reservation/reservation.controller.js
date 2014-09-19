/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /reservations              ->  index
 * POST    /reservations              ->  create
 * GET     /reservations/:id          ->  show
 * PUT     /reservations/:id          ->  update
 * DELETE  /reservations/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Reservation = require('./reservation.model');
var mongoose = require('mongoose');

var joins = ['customer', 'server', 'seated_by', 'tables'];

// Get list of reservations
exports.index = function(req, res) {
    if(req.query) {

//        User.where('location').$regex(/^Paris/);
        console.log(req.query);
        var queryExists = false;
        var quer = Reservation.apiQuery(req.query);
        if(req.query.hasOwnProperty('scheduled_datetime')) {
            var start = new Date(req.query.scheduled_datetime);
            var end = start.addDays(1);
            console.log('start: ' + start.toISOString() + ' end: ' + end.toISOString());
            quer = Reservation.find({"scheduled_datetime": {"$gte": start.toISOString(), "$lt": end.toISOString()}});
            quer.sort('scheduled_datetime');
            quer.sort('customer');
            queryExists = true;
        }

        if(queryExists) {
            quer.populate(joins).exec(function (err, reservations) {
                if(err) { return handleError(reservations, err); }
                return res.json(200, reservations);
            });
        } else {
            Reservation.find().populate(joins).exec(function (err, reservations) {
                if (err) {
                    return handleError(res, err);
                }
                return res.json(200, reservations);
            });
        }

//        var skip = page > 0 ? (page*nper) : 0;
//        console.log('skip:' + skip);
//        quer.skip(skip).limit(nper).exec(function (err, victims) {
//            if(err) { return handleError(res, err); }
//            delete quer.options.sort;
//            delete quer.options.limit;
//            delete quer.options.skip;
//            quer.count(function(err, count) {
//                if(err) { return handleError(res, err); }
//                return res.json(200, {count: count, victims: victims});
//            });
//        });

    } else {
        console.log('using default');
        Reservation.find().populate(joins).exec(function (err, reservations) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, reservations);
        });
    }
};

// Get list of seated reservations for the last two hours
exports.seated = function(req, res) {
    var d = new Date();
    var twoHoursAgo = new Date();
    twoHoursAgo.setHours(d.getHours() - 2);

    Reservation.find({seated_datetime: {$gt: twoHoursAgo }, completed_datetime: {$exists: false}}).populate('tables').exec(function (err, reservations) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, reservations);
    });
};

// Get a single reservation
exports.show = function(req, res) {
  Reservation.findById(req.params.id).populate(joins).exec(function (err, reservation) {
    if(err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    return res.json(reservation);
  });
};

// Creates a new reservation in the DB.
exports.create = function(req, res) {
  Reservation.create(req.body, function(err, reservation) {
    if(err) { return handleError(res, err); }
    return res.json(201, reservation);
  });
};

// Updates an existing reservation in the DB.
function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reservation.findById(req.params.id, function (err, reservation) {
    if (err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }

      if (req.body.tables.length > 0) {
          var tableIds = [];
          _.map(req.body.tables, function(t) {
              // push client id (converted from string to mongo object id) into clients
              tableIds.push(mongoose.Types.ObjectId(t._id));
          });
          if(!isObjectId(req.body.server)) {
              req.body.server = req.body.server._id;
          }
          if(!isObjectId(req.body.seated_by)) {
              req.body.seated_by = req.body.seated_by._id;
          }
          if(!isObjectId(req.body.customer)) {
              req.body.customer = req.body.customer._id;
          }

          req.body.tables = tableIds;
      }

    var updated = _.merge(reservation, req.body);
      updated.markModified('tables');
      console.log('preparing to save:');
      console.log(updated);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reservation);
    });
  });
};

// Deletes a reservation from the DB.
exports.destroy = function(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    if(err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    reservation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
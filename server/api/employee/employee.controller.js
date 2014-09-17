/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /employees              ->  index
 * POST    /employees              ->  create
 * GET     /employees/:id          ->  show
 * PUT     /employees/:id          ->  update
 * DELETE  /employees/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Employee = require('./employee.model');

// Get list of employees
exports.index = function(req, res) {
  Employee.find(function (err, employees) {
    if(err) { return handleError(res, err); }
    return res.json(200, employees);
  });
};

// Get a single employee
exports.show = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    return res.json(employee);
  });
};

// Creates a new employee in the DB.
exports.create = function(req, res) {
  Employee.create(req.body, function(err, employee) {
    if(err) { return handleError(res, err); }
    return res.json(201, employee);
  });
};

// Updates an existing employee in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Employee.findById(req.params.id, function (err, employee) {
    if (err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    var updated = _.merge(employee, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, employee);
    });
  });
};

// Deletes a employee from the DB.
exports.destroy = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    employee.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
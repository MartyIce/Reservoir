/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var employee = require('./employee.model');

exports.register = function(socket) {
  employee.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  employee.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('employee:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('employee:remove', doc);
}
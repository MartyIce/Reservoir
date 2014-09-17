/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var reservation = require('./reservation.model');

exports.register = function(socket) {
  reservation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  reservation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('reservation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('reservation:remove', doc);
}
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var customer = require('./customer.model');

exports.register = function(socket) {
  customer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  customer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('customer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('customer:remove', doc);
}
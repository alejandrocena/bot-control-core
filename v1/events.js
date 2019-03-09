const events = require('events');

const Events = {
  COMPONENT_ACTION_CALL: 'COMPONENT_ACTION',
};

const Emitter = new events.EventEmitter();


module.exports = {
  Events,
  Emitter,
};
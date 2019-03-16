const EventEmitter = require('events');
const Emitter = new EventEmitter();

const Events = {
  COMPONENT_REACHED: 'COMPONENT_REACHED',
  COMPONENT_REQUESTED: 'COMPONENT_REQUESTED',
  COMPONENT_CHANGED: 'COMPONENT_CHANGED'
};

module.exports = {
  Events,
  on: Emitter.on,
  emit: (event,payload) => {
    const valid = Object.keys(Events).filter(evt => Events[evt] === event).length === 1;
    if(!valid) throw `Unknown Event ${event}`;
    Emitter.emit(event,payload);
  },
};
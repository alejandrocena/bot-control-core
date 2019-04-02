const EventEmitter = require('events');

const Emitter = new EventEmitter();
Emitter.setMaxListeners(20);

const Events = {
  COMPONENT_REACHED: 'COMPONENT_REACHED',
  COMPONENT_REACHED_ERROR: 'COMPONENT_REACHED_ERROR',
  COMPONENT_REQUESTED: 'COMPONENT_REQUESTED',
  COMPONENT_CHANGED: 'COMPONENT_CHANGED',

  SERVER_COMPONENT_LOADED: 'SERVER_COMPONENT_LOADED',
  SERVER_COMPONENTS_LOAD_COMPLETE: 'SERVER_COMPONENTS_LOAD_COMPLETE',

};

const events = {
  Events,
  on: (event,payload) => {
    return Emitter.on(event,payload);
  },
  emit: (event,payload) => {
    const valid = Object.keys(Events).filter(evt => Events[evt] === event).length === 1;
    if(!valid) throw `Unknown Event ${event}`;
    return Emitter.emit(event,payload);
  },
};
module.exports = events;
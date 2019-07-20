const EventEmitter = require('events');
const global = require('../events');

module.exports = id => {

  const Emitter = new EventEmitter();

  Object.keys(global.Events).map(event => global.on(global.Events[event],payload => {
    if(payload.id && payload.id === id) {
      Emitter.emit(event,payload);
    }
  }));

  return {
    Events: global.Events,
    on: (event,payload) => {
      return Emitter.on(event,payload);
    },
    emit: (event,payload) => {
      const valid = Object.keys(global.Events).filter(evt => global.Events[evt] === event).length === 1;
      if(!valid) throw `Unknown Event ${event}`;
      return Emitter.emit(event,payload);
    }
  }
};
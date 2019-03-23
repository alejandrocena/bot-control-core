const request = require('request-promise');
const {Events,emit} = require('../events');
const component_events = require('./component-events');

const ACTIONS = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  STOP: 'STOP',
};

module.exports = (PATH,TYPE,id,options={}) => ({
  ...component_events(id),
  ACTIONS,
  type: TYPE,
  sender: (Endpoint) => {
    const uri = Endpoint + PATH.replace(':id', id);
    return {
      forward: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.FORWARD}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      },
      backward: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.BACKWARD}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      },
      stop: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.STOP}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      }
    }
  },
  receiver: (server) => {
    server.put(`${PATH.replace(':id', id)}/${ACTIONS.FORWARD}`, (req, res) => emit(Events.COMPONENT_REACHED, {id,action:ACTIONS.FORWARD,options,res}));
    server.put(`${PATH.replace(':id', id)}/${ACTIONS.BACKWARD}`, (req, res) => emit(Events.COMPONENT_REACHED, {id,action:ACTIONS.BACKWARD,options,res}));
    server.put(`${PATH.replace(':id', id)}/${ACTIONS.STOP}`, (req, res) => emit(Events.COMPONENT_REACHED, {id,action:ACTIONS.STOP,options,res}));
  },
  state: (state) => emit(Events.COMPONENT_CHANGED,{id,state})
});
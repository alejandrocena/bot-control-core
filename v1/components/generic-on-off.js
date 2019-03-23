const request = require('request-promise');
const {Events,emit} = require('../events');
const component_events = require('./component-events');
const responder = require('../server/http-responder');

const ACTIONS = {
  ON: 'ON',
  OFF: 'OFF'
};

module.exports = (PATH,TYPE,id,options={}) => ({
  ...component_events(id),
  ACTIONS,
  type: TYPE,
  sender: (Endpoint) => {
    const uri = `${Endpoint}${PATH.replace(':id', id)}`;
    return {
      on: () => {
        const setup = {method: 'PUT',uri: `${uri}/${ACTIONS.ON}`,simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup);
      },
      off: () => {
        const setup = {method: 'PUT',uri: `${uri}/${ACTIONS.OFF}`,qs: {action:ACTIONS.OFF},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup)
      }
    }
  },
  receiver: (server) => {
    server.put(`${PATH.replace(':id', id)}/${ACTIONS.ON}`,(req,res) => emit(Events.COMPONENT_REACHED,{id,action:ACTIONS.ON,options,responder:responder(res)}));
    server.put(`${PATH.replace(':id', id)}/${ACTIONS.OFF}`,(req,res) => emit(Events.COMPONENT_REACHED,{id,action:ACTIONS.OFF,options,responder:responder(res)}));
  },
  state: (state) => emit(Events.COMPONENT_CHANGED,{id,state})
});
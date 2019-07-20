const request = require('request-promise');
const {Events,emit} = require('../events');
const component_events = require('./component-events');
const responder = require('../server/http-responder');

const ACTIONS = {READ: 'READ'};

module.exports = (PATH,TYPE,id,options={}) => ({
  ...component_events(id),
  id,
  ACTIONS,
  type: TYPE,
  sender: (Endpoint) => {
    const uri = `${Endpoint}${PATH.replace(':id', id)}/${ACTIONS.READ}`;
    return {
      read: () => {
        const setup = {method: 'GET',uri, qs: {action:ACTIONS.READ},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup)
      }
    }
  },
  receiver: (server) => {
    server.get(`${PATH.replace(':id', id)}/${ACTIONS.READ}`,(req,res) => emit(Events.COMPONENT_REACHED,{id,action:ACTIONS.ON,options,args:req.query,responder:responder(res)}));
  },
  state: (state) => emit(Events.COMPONENT_CHANGED,{id,state})
});
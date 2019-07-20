const PATH = `/v1/action/movement`;
const TYPE = 'movement';

const request = require('request-promise');
const {Events,emit} = require('../events');
const responder = require('../server/http-responder');
const action_events = require('./actions-events');

const ACTIONS = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  TURN_LEFT: 'TURN_LEFT',
  TURN_RIGTH: 'TURN_RIGTH',
};

module.exports = {
  ...action_events(),
  ACTIONS,
  type: TYPE,
  sender: (Endpoint) => {
    const uri = Endpoint + PATH;
    return {
      forward: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.FORWARD}, simple: true, json: true};
        emit(Events.ACTION_REACHED, setup);
        return request(setup);
      },
      backward: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.BACKWARD}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      },
      turn_left: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.TURN_LEFT}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      },
      turn_rigth: () => {
        const setup = {method: 'PUT', uri, qs: {action: ACTIONS.TURN_RIGTH}, simple: true, json: true};
        emit(Events.COMPONENT_REQUESTED, setup);
        return request(setup);
      }
    }
  },
  receiver: (server) => {
    server.put(`${PATH}`, (req, res) => emit(Events.COMPONENT_REACHED, {
        action:req.query.action,
        options,
        args:req.query,
        responder: responder(res)
    }));
  }
};
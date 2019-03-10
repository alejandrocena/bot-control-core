const request = require('request-promise');
const {Events,emit} = require('../../../events');
const http_responder = require('../../http-responder');

const PATH = `/v1/components/actuators/motors/:id`;

const ACTIONS = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  STOP: 'STOP',
};

const SENDER_DEFAULT = {
  forward: () => console.log(ACTIONS.FORWARD),
  backward: () => console.log(ACTIONS.BACKWARD),
  stop: () => console.log(ACTIONS.STOP)
};

module.export = {
  sender: (Endpoint,id) => {
    const uri = Endpoint + PATH.replace(':id', id);
    return {
      forward: () => {
        const setup = {method: 'PUT',uri, qs: {action:ACTIONS.FORWARD},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup);
      },
      backward: () => {
        const setup = {method: 'PUT',uri,qs: {action:ACTIONS.BACKWARD},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup);
      },
      stop: () => {
        const setup = {method: 'PUT',uri,qs: {action:ACTIONS.STOP},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup);
      }
    }
  },
  receiver: (server,id,doit = SENDER_DEFAULT) => server.put(PATH.replace(':id', id),(req,res) => {
    const {action} = req.query;
    const responder = http_responder(res);
    try {
      switch (action) {
        case ACTIONS.FORWARD:
        case ACTIONS.BACKWARD:
        case ACTIONS.STOP:
          emit(Events.COMPONENT_REACHED,{id,action,responder});
          responder.ok(res);
          break;
        default: responder.error(res,`Unknown action '${action}'`);
      }
    } catch (ex) {
      responder.error(res,ex);
    }
  })
};
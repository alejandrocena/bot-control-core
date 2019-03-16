const request = require('request-promise');
const {Events,emit} = require('../events');
const http_responder = require('./http-responder');

const ACTIONS = {READ: 'READ'};

module.exports = (PATH) => ({
  sender: (Endpoint,id) => {
    const uri = Endpoint + PATH.replace(':id', id);
    return {
      read: () => {
        const setup = {method: 'GET',uri, qs: {action:ACTIONS.READ},simple: true,json: true};
        emit(Events.COMPONENT_REQUESTED,setup);
        return request(setup);
      }
    }
  },
  receiver: (server,id) => server.put(PATH.replace(':id', id),(req,res) => {
    const {action} = req.query;
    const responder = http_responder(res);
    try {
      switch (action) {
        case ACTIONS.READ:
          emit(Events.COMPONENT_REACHED,{id,action,responder});
          break;
        default: responder.error(res,`Unknown action '${action}'`);
      }
    } catch (ex) {
      responder.error(res,ex);
    }
  })
});
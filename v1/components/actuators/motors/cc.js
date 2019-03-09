const request = require('request-promise');
const responder = require('../../http-responder');

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
      forward: () => request({method: 'PUT',uri, qs: {action:ACTIONS.FORWARD},simple: true,json: true}),
      backward: () => request({method: 'PUT',uri,qs: {action:ACTIONS.BACKWARD},simple: true,json: true}),
      stop: () => request({method: 'PUT',uri,qs: {action:ACTIONS.STOP},simple: true,json: true})
    }
  },
  receiver: (server,id,doit = SENDER_DEFAULT) => server.put(PATH.replace(':id', id),(req,res) => {
    const {action} = req.query;
    try {
      switch (action) {
        case ACTIONS.FORWARD: doit.forward(); responder.ok(res); break;
        case ACTIONS.BACKWARD: doit.backward(); responder.ok(res);break;
        case ACTIONS.STOP: doit.stop(); responder.ok(res); break;
        default: responder.error(res,`Unknown action '${action}'`);
      }
    } catch (ex) {
      responder.error(res,ex);
    }
  })
};
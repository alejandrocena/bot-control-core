const request = require('request-promise');
const responder = require('../../../express-http-responder');

const PATH = `/v1/components/actuators/lights/:id`;

const ACTIONS = {
  ON: 'ON',
  OFF: 'OFF'
};

const SENDER_DEFAULT = {
  on: () => console.log(ACTIONS.ON),
  off: () => console.log(ACTIONS.OFF)
};

module.export = {
  sender: (Endpoint,id) => {
    const uri = Endpoint + PATH.replace(':id', id);
    return {
      on: () => request({method: 'PUT',uri, qs: {action:ACTIONS.ON},simple: true,json: true}),
      off: () => request({method: 'PUT',uri,qs: {action:ACTIONS.OFF},simple: true,json: true})
    }
  },
  receiver: (server,id,doit = SENDER_DEFAULT) => server.put(PATH.replace(':id', id),(req,res) => {
    const {action} = req.query;
    try {
      switch (action) {
        case ACTIONS.ON: doit.forward(); responder.ok(res); break;
        case ACTIONS.OFF: doit.backward(); responder.ok(res);break;
        default: responder.error(res,`Unknown action '${action}'`);
      }
    } catch (ex) {
      responder.error(res,ex);
    }
  })
};
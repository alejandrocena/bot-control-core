const request = require('request-promise');
const responder = require('../../http-responder');

const PATH = `/v1/components/sensors/bumpers/:id`;

const ACTIONS = {READ: 'READ'};

const SENDER_DEFAULT = {
  read: () => console.log(ACTIONS.READ)
};

module.export = {
  sender: (Endpoint,id) => {
    const uri = Endpoint + PATH.replace(':id', id);
    return {
      read: () => request({method: 'GET',uri, qs: {action:ACTIONS.READ},simple: true,json: true})
    }
  },
  receiver: (server,id, doit = SENDER_DEFAULT) => server.put(PATH.replace(':id', id),(req,res) => {
    const {action} = req.query;
    try {
      switch (action) {
        case ACTIONS.READ: responder.data(doit.read()); break;
        default: responder.error(res,`Unknown action '${action}'`);
      }
    } catch (ex) {
      responder.error(res,ex);
    }
  })
};
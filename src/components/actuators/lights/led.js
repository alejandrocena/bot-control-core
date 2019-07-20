const generic_on_off = require('../../generic-on-off');

const PATH = `/v1/components/actuators/lights/led/:id`;
const TYPE = 'actuators:lights:led';

module.exports = (id,options={}) => generic_on_off(PATH,TYPE,id,options);
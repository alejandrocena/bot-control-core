const generic_motor = require('../../generic-motor');

const PATH = `/v1/components/actuators/motors/cc/:id`;
const TYPE = 'actuators:motors:cc';

module.exports = (id,options={}) => generic_motor(PATH,TYPE,id,options);
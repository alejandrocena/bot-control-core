const generic_read = require('../../generic-read');

const PATH = `/v1/components/sensors/bumpers/boolean/:id`;
const TYPE = 'sensors:bumpers:boolean';

module.exports = (id,options={}) => generic_read(PATH,TYPE,id,options);
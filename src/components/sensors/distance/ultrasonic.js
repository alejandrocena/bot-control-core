const generic_read = require('../../generic-read');

const PATH = `/v1/components/sensors/distance/ultrasonic/:id`;
const TYPE = 'sensors:distance:ultrasonic';

module.exports = (id,options={}) => generic_read(PATH,TYPE,id,options);
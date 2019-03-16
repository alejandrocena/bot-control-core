const generic_read = require('../../generic-read');

const PATH = `/v1/components/sensors/distance/:id`;

module.exports = generic_read(PATH);
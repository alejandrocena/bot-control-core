const generic_read = require('../../../generic-read');

const PATH = `/v1/components/sensors/distance/:id`;

module.export = generic_read(PATH);
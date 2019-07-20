const request = require('request-promise');

module.exports = (manifest) => {
  const {discovery:{endpoint=undefined}} = manifest;
  if(endpoint !== undefined) {
    return request({
      method: 'POST',
      uri: `${endpoint}/discovery`,
      body: manifest,
      simple: true,
      json: true
    });
  }
};
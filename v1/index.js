const components = require('./components');
const browser = require('./manifest-browser');
const validator = require('./manifest-validator');
const events = require('./events');

module.exports = (manifest) => {
  const valid = validator(manifest);
  if(!valid) {
    throw 'Invalid Manifest';
  }
  const browser = manifest_browser(manifest);
  return {
    server: (server) => {

    },
    state: (state) => {

    },
    browser,
  }
};
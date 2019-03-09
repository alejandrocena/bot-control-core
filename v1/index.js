const components = require('./components');
const manifest_browser = require('./manifest');
const events = require('./events');

module.exports = (manifest) => {
  const browser = manifest_browser(manifest);
  return {
    server: (server) => {

    },
    state: (state) => {

    },
    browser,
    Events
  }
};
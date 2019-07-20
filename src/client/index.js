const Browser = require('../manifest');
const components = require('../components');
const actions = require('../actions');

module.exports = (endpoint, browser) => {
  return {
    getComponentById: (id) => {
      const {id,type} = browser.getComponentById(id);
      return components(type).sender(endpoint)(id);
    },
    getActionByType: (type) => {
      const action = browser.getActionByType(type);
      return actions(type).sender(endpoint)
    }
  };
};
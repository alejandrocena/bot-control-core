const Browser = require('../manifest');
const components = require('../components');

module.exports = (browser) => {
  return {
    getComponentById: (id) => browser.getComponentById(id).map(({id,type}) => components(type).sender(type)(id))
  };
};
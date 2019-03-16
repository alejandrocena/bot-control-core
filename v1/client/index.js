const Browser = require('../manifest');
const components = require('../components');

module.exports = (manifest) => {
  const browser = Browser(manifest);
  return {
    getComponentById: (id) => browser.getComponentById(id).map(({id,type}) => components(type).sender(type)(id))

};
};
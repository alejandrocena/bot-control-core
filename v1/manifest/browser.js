const validator = require('./validator');

module.exports = manifest => {
  const valid = validator(manifest);
  if(!valid) {
    throw 'Invalid Manifest';
  }
  return {
    getComponents: () => manifest.components,
    getComponentById: (id) => manifest.components.filter(component => component.id === id).pop(),
    getComponentByType: (type) => manifest.components.filter(component => component.type === type),
    getServer: () => () => manifest.server,
    getBroker: () => () => manifest.state,
  }
};
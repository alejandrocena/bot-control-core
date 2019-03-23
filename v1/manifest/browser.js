const validator = require('./validator');

module.exports = manifest => {
  const valid = validator(manifest);
  if(!valid) {
    throw 'Invalid Manifest';
  }

  return {
    ... manifest,
    getComponentsByType: (type) => manifest.components.filter(component => component.type === type),
    getComponentById: (id) => manifest.components.filter(component => component.id === id).pop(),
  }
};
module.exports = manifest => {
  return {
    getComponents: () => manifest.components,
    getComponentById: (id) => manifest.components.filter(component => component.id === id).pop(),
    getComponentByType: (type) => manifest.components.filter(component => component.type === type),
    getServer: () => () => manifest.server,
    getBroker: () => () => manifest.state,
  }
};
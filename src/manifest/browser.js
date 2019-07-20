module.exports = manifest => {

  return {
    manifest,
    
    getComponents: () => manifest.components,
    getComponentsByType: (type) => manifest.components.filter(component => component.type === type),
    getComponentById: (id) => manifest.components.filter(component => component.id === id).pop(),
    
    getActions: () => manifest.actions,
    getActionByType: (type) => manifest.actions.filter(action => action.type === type)
  }
};
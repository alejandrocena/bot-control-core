


module.exports = ({on,Events}) => {

  on(Events.SERVER_COMPONENT_LOADED,({component,server}) => {
    console.info(`Server Component type: ${component.type} id: ${component.id} Loaded`);
  });

  on(Events.SERVER_COMPONENTS_LOAD_COMPLETE,({components,server}) => {
    console.info(`(${components.length}) Server Components Loaded.`);
  });

  on(Events.SERVER_COMPONENTS_LOAD_COMPLETE,({server}) => {
    console.info('Server Endpoints:');
    server._router.stack.filter(r => r.route !== undefined).map(r => r.route).map(({path,methods}) => console.info(`[${Object.keys(methods).map(method => method.toUpperCase()).join(',')}]::${path}`))
  });

  on(Events.COMPONENT_REACHED,({id,action}) => {
    console.info(`Component ${id} Reached :: ${action}.`);
  });

  on(Events.COMPONENT_REACHED_ERROR,({id,action}) => {
    console.info(`Component ${id} Reached :: ${action}.`);
  });

  on(Events.COMPONENT_CHANGED,({id,state}) => {
    console.info(`Component ${id} Status Changed :: ${JSON.stringify(state)}.`);
  });

  on(Events.COMPONENT_REQUESTED,({}) => {
    console.info(`Component ${id} Status Changed :: ${JSON.stringify(state)}.`)
  });

  on(Events.ACTION_REACHED,(payload) => {
    console.info(`Action Reeached :: ${JSON.stringify(payload)}.`);
  });

  on(Events.ACTION_REQUESTED,(payload) => {
    console.info(`Action Requested :: ${JSON.stringify(payload)}.`);
  });


};
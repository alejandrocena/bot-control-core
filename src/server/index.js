const express = require('express');
const components = require('../components');
const {Events,emit,on} = require('../events');

on(Events.COMPONENT_REACHED_ERROR, ({error,res}) => {
  res.status(400).json(error);
});

on(Events.COMPONENT_REACHED_ERROR, ({error,res}) => {
  res.status(400).json(error);
});

module.exports = (browser) => {
  const {port} = browser.manifest.server;
  const server = express();

  // Loading actions
  const actions_loaded = browser.actions.map(browser_action => {
    const {type} = browser_component;
    const action = action(type)();
    return action;
  }).map(action => {
    action.receiver(server);
    return action;
  }).map( action => emit(Events.SERVER_ACTION_LOADED,{action,server}));
  emit(Events.SERVER_ACTIONS_LOAD_COMPLETE,{actions: actions_loaded,server,port});

  // Loading components
  const components_loaded = browser.manifest.components.map(browser_component => {
    const {id,type,options={}} = browser_component;
    const component = components(type)(id,options);
    // Adds to Browser component local event feature
    browser_component.Events = component.Events;
    browser_component.on = component.on;
    return component;
  }).map( component => {
    component.receiver(server);
    return component;
  }).map( component => emit(Events.SERVER_COMPONENT_LOADED,{component,server}));
  emit(Events.SERVER_COMPONENTS_LOAD_COMPLETE,{components:components_loaded,server,port});
  
  server.get('/manifest.json', (req,res) => res.status(200).json(browser.manifest));
  server.listen(port);
  
  return server;
};
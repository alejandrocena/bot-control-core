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
  const {port} = browser.server;
  const server = express();
  const loaded = browser.components.map(browser_component => {
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
  emit(Events.SERVER_COMPONENTS_LOAD_COMPLETE,{components:loaded,server,port});
  server.listen(port);
  return server;
};
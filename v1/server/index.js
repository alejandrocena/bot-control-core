const express = require('express');
const Browser = require('../manifest');
const components = require('../components');

module.exports = (manifest) => {
  const browser = Browser(manifest);
  const {port} = browser.getServer();
  const server = express();
  browser.getComponents().map(({id,type}) => components(type).receiver(server,id));
  server.listen(port, () => console.log(`Server listening on port ${port}`));
  return server;
};
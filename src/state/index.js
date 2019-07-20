const mosca = require('mosca');
const Browser = require('../manifest');

const server = new mosca.Server(settings);

server.on('ready', () => `Mosca server is up and running on port ${settings.port}`);

module.exports = (browser) => {
  const {port} = browser.getBroker();
  const settings = {port};
  const server = new mosca.Server(settings);
  server.on('ready', () => `Mosca server is up and running on port ${settings.port}`);
  return server;
};
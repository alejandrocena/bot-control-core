const messages = require('./events');
const event_logger = require('./event-logger');
const discovery = require('./discovery');


module.exports = (manifest) =>  {
  if(manifest.debug === true) {
    event_logger(messages);
  }
  const browser = require('./manifest')(manifest);
  return {
    browser,
    messages,
    server: () => {
      const server = require('./server')(browser);
      if(manifest.discovery !== undefined) {
        return discovery(manifest).then(res => server);
      }
      return Promise.resolve(server);
    },
    state: () => {
      return require('./state')(browser);
    },
    client: () => {
      return require('./client')(browser);
    },
  }
};

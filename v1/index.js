const messages = require('./events');
const event_logger = require('./event-logger');

event_logger(messages);

module.exports = (manifest) =>  {
  const browser = require('./manifest')(manifest);
  return {
    browser,
    messages,
    server: () => {
      return require('./server')(browser);
    },
    state: () => {
      return require('./state')(browser);
    },
    client: () => {
      return require('./client')(browser);
    },
  }
};

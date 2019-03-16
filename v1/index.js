const {on,Events} = require('./events');

module.exports = (manifest) => ({
  server: () => require('./server')(manifest),
  state: () => require('./state')(manifest),
  browser: () => require('./manifest')(manifest),
  on,
  Events
});
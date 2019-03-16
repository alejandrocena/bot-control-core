module.exports = {
  server: (manifest) => {
    const version = manifest.version;
    switch (version) {
      case 'v1': return require('./v1').server(manifest);

      default: throw `Unknown version :${version}`;
    }
  },
  client: (manifest) => {
    const version = manifest.version;
    switch (version) {
      case 'v1': return require('./v1').client(manifest);

      default: throw `Unknown version :${version}`;
    }
  },
  state: (manifest) => {
    const version = manifest.version;
    switch (version) {
      case 'v1': return require('./v1').state(manifest);

      default: throw `Unknown version :${version}`;
    }
  },
  Messages: (manifest) => {
    const version = manifest.version;
    switch (version) {
      case 'v1':
        const {on,Events} = require('./v1');
        return {on,Events};

      default: throw `Unknown version :${version}`;
    }
  },
};
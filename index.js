const v1 = require('./v1');

module.exports = {
  buildServer: (manifest,express,{port}) => {
    const core_version = manifest.core;
    switch (core_version) {
      case 'v1': return v1.server(manifest,express,{port});

      default: throw `Unknown version :${core_version}`;
    }
  },
  buildClient: (manifest,{endpoint}) => {
    const core_version = manifest.core;
    switch (core_version) {
      case 'v1': return v1.client(manifest,express,{port});

      default: throw `Unknown version :${core_version}`;
    }
  }
};
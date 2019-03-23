const Versions = ['v1'];

const validate_version = (version) => {
  const valid = Versions.reduce((valid = false, valid_version) => (valid || valid_version === version));
  if(!valid) {
    throw `Invalid Version '${version}'`
  }
};

module.exports = (manifest) => {
  const version = manifest.version;
  validate_version(version);
  const core = require(`./${version}`);
  return core(manifest);
};

const TYPES = {
  MOVEMENT : require('./movement').type
};

const factory = (type) => {
  switch (type) {
    case TYPES.MOVEMENT:          return require('./movement')
    default:
      throw `Unknown type '${type}'`;
  }
};

module.exports = factory;
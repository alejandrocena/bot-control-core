
const TYPES = {
  CC_MOTOR : require('./actuators/motors/cc')('none').type,
  LED : require('./actuators/lights/led')('none').type,
  ULTRASONIC_SENSOR : require('./sensors/distance/ultrasonic')('none').type,
  BUMPER : require('./sensors/bumpers/boolean')('none').type
};

const factory = (type) => {
  switch (type) {
    case TYPES.CC_MOTOR:          return require('./actuators/motors/cc');
    case TYPES.LED:               return require('./actuators/lights/led');
    case TYPES.ULTRASONIC_SENSOR: return require('./sensors/distance/ultrasonic');
    case TYPES.BUMPER:            return require('./sensors/bumpers/boolean');
    default:
      throw `Unknown type '${type}'`;
  }
};

module.exports = factory;
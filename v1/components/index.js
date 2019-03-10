const TYPES = {
  CC_MOTOR : 'actuator.motor.cc',
  LED : 'actuator.lights.led',
  ULTRASONIC_SENSOR : 'sensor.ultrasonic',
  BUMPER : 'sensor.bumper'
};

const factory = type => {
  switch (type) {
    case TYPES.CC_MOTOR:          return require('./actuators/motors/cc');
    case TYPES.LED:               return require('./actuators/lights/led');
    case TYPES.ULTRASONIC_SENSOR: return require('./sensors/distance/ultrasonic');
    case TYPES.BUMPER:            return require('./sensors/bumpers/boolean');
    default:
      throw `Unknown type '${type}'`;
  }
};

module.export = {
  TYPES,
  sender: (type) => factory(type).sender,
  receiver: (type) => factory(type).receiver
};
const schema = {
  "name": "mocked",
  "version": "0.1",
  "description": "A Mocked Bot for Development and Test Purpose",
  "state": {
    "type": "mqtt",
    "port": "1883"
  },
  "server": {
    "type": "http",
    "port": "1883"
  },
  "components":[
    {
      "type": "sensors.ultrasonic",
      "id": "ultrasonic-front",
      "description": "Ultrasonic sensor model RS74"
    },
    {
      "type": "sensors.bumper",
      "id": "bumper-front-left",
      "description": "Standard Metalic Bumper"
    },
    {
      "type": "sensors.bumper",
      "id": "bumper-front-right",
      "description": "Standard Metalic Bumper"
    },
    {
      "type": "actuators.motor.cc",
      "id": "motor-left",
      "description": "CC Generic motor"
    },
    {
      "type": "actuators.motor.cc",
      "id": "motor-right",
      "description": "CC Generic motor"
    },
    {
      "type": "actuators.led",
      "id": "led-front-left",
      "description": "Luminic LED"
    },
    {
      "type": "actuators.led",
      "id": "led-front-right",
      "description": "Luminic LED"
    }
  ]
};
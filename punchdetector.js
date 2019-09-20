function enableLinearAccelerationSensor() {
  const shakeThreshold = 10;

  let sensor = new LinearAccelerationSensor({
    frequency: 60
  });
  document.getElementById("linearAccelerationSensor").innerHTML =
    "AWAITING SHAKE!";
  sensor.addEventListener("reading", () => {
    if (sensor.x > shakeThreshold) {
      document.getElementById("linearAccelerationSensor").innerHTML =
        "SHAKE DETECTED";
    }
  });

  sensor.start();
}

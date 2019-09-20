// Dean Edwards/Matthias Miller/John Resig

function init() {
  // quit if this function has already been called
  if (arguments.callee.done) return;

  // flag this function so we don't do the same thing twice
  arguments.callee.done = true;

  // kill the timer
  if (_timer) clearInterval(_timer);

  // do stuff
  console.log("Hello World!");
  document.getElementById(
    "secureContextRequired"
  ).innerHTML = window.isSecureContext ? "" : "HTTPS IS NECESSARY";

  if ("AmbientLightSensor" in window) {
    enableAmbientLightSensor();
  }
  if ("ProximitySensor" in window) {
    enableProximitySensor();
  }
  if ("Magnetometer" in window) {
    enableMagnetometer();
  }
  if ("Accelerometer" in window) {
    enableAccelerometer();
  }
  if ("Gyroscope" in window) {
    enableGyroscope();
  }
  if ("GravitySensor" in window) {
    enableGravitySensor();
  }
  if ("LinearAccelerationSensor" in window) {
    enableLinearAccelerationSensor();
  }
}

function enableAmbientLightSensor() {
  const als = new AmbientLightSensor({ frequency: 20 });
  als.addEventListener("activate", () => console.log("Ready to measure EV."));
  als.addEventListener("error", event => {
    document.getElementById(
      "ambientLightSensor"
    ).innerHTML = `Error: ${event.error.name}`;
  });

  als.addEventListener("reading", () => {
    // Defaut ISO value.
    const ISO = 100;
    // Incident-light calibration constant.
    const C = 250;

    let EV = Math.round(Math.log2((als.illuminance * ISO) / C));
    document.getElementById(
      "ambientLightSensor"
    ).innerHTML = `Exposure Value (EV) is: ${EV}`;
  });

  als.start();

  return "active";
}

function enableProximitySensor() {
  let sensor = new ProximitySensor();
  sensor.start();

  sensor.onreading = () => {
    document.getElementById("proximitySensor").innerHTML = sensor.distance;
  };

  sensor.onerror = event => {
    document.getElementById(
      "proximitySensor"
    ).innerHTML = `${event.error.name}, ${event.error.message}`;
  };
}

function enableMagnetometer() {
  let sensor = new Magnetometer();
  sensor.start();
  let heading = Math.atan2(sensor.y, sensor.x) * (180 / Math.PI);
  document.getElementById("magnetometer").innerHTML =
    "Heading in degrees: " + heading;
}

function enableAccelerometer() {
  let sensor = new Accelerometer();
  sensor.start();

  sensor.onreading = () => {
    let coordinates = `X:  ${sensor.x} Y: ${sensor.y} Z: ${sensor.z}`;
    document.getElementById("accelerometer").innerHTML = coordinates;
  };

  sensor.onerror = event => {
    document.getElementById(
      "accelerometer"
    ).innerHTML = `${event.error.name}, ${event.error.message}`;
  };
}

function enableGravitySensor() {
  let sensor = new GravitySensor({ frequency: 5, referenceFrame: "screen" });

  sensor.onreading = () => {
    if (sensor.y >= 9.8) {
      document.getElementById("magnetometer").innerHTML =
        "Web page is perpendicular to the ground.";
    }
  };

  sensor.start();
}

function enableLinearAccelerationSensor() {
  const shakeThreshold = 10;

  let sensor = new LinearAccelerationSensor({ frequency: 60 });

  sensor.addEventListener("reading", () => {
    if (sensor.x > shakeThreshold) {
      document.getElementById("linearAccelerationSensor").innerHTML =
        "SHAKE DETECTED";
    }
  });

  sensor.start();
}

function enableGyroscope() {
  let sensor = new Gyroscope();
  sensor.start();

  sensor.onreading = () => {
    document.getElementById(
      "gyroscope"
    ).innerHTML = `X: ${sensor.x}, Y: ${sensor.y}, Z: ${sensor.z}`;
  };

  sensor.onerror = event =>
    (document.getElementById(
      "gyroscope"
    ).innerHTML = `${event.error.name}, ${event.error.message}`);
}

/* for Mozilla/Opera9 */
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
}

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) {
  // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); // call the onload handler
    }
  }, 10);
}

/* for other browsers */
window.onload = init;

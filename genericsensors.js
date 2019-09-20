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
  document.getElementById("ambientLightSensor").innerHTML =
    "AmbientLightSensor" in window ? "active" : "inactive";
  document.getElementById("proximitySensor").innerHTML =
    "ProximitySensor" in window ? "active" : "inactive";
  document.getElementById("magnetometer").innerHTML =
    "magnetometer" in window ? "active" : "inactive";
  document.getElementById("accelerometer").innerHTML =
    "accelerometer" in window ? "active" : "inactive";
  document.getElementById("gyroscope").innerHTML =
    "gyroscope" in window ? "active" : "inactive";
  document.getElementById("gravitySensor").innerHTML =
    "gravitySensor" in window ? "active" : "inactive";
  document.getElementById("linearAccelerationSensor").innerHTML =
    "LinearAccelerationSensor" in window ? "active" : "inactive";
  document.getElementById("relativeOrientationSensor").innerHTML =
    "RelativeOrientationSensor" in window ? "active" : "inactive";
  document.getElementById("absoluteOrientationSensor").innerHTML =
    "AbsoluteOrientationSensor" in window ? "active" : "inactive";
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

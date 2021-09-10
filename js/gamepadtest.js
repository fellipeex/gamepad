/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var prevTimestamps = [];
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
  var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h2");
  t.className = "gp-nome"
  t.appendChild(document.createTextNode(gamepad.id));
  d.appendChild(t);
  var d1 = document.createElement("div");
  d1.className = "row infos";
  
  //INDEX
  var e1 = document.createElement("spam");
  e1.className = "gp-infos";
  e1.innerHTML = "<p class='gp-info'>INDEX: </p>" + gamepad.index;
  d1.appendChild(e1);
  
  //TIMESTAMP
  
/*
  var e2 = document.createElement("spam");
  e2.className = "gp-infos";
  var ptimes = gamepad.timestamp;
  ptimes.className = "ptimes";  
  e2.innerHTML = "<p class='gp-info'>Timestamp: </p>" + ptimes;
  d1.appendChild(e2);
  */

  //TEM VIBRATION??
  var e3 = document.createElement("spam");
  e3.className = "gp-infos";
  var isvib = "";
  if(gamepad.vibrationActuator){
    isvib = "YES";
  } else{
    isvib = "N/A";
  }
  e3.innerHTML = "<p class='gp-info'>Vibration: </p>" + isvib;
  d1.appendChild(e3);
  //BOTÃO VIBRATION
  if(gamepad.vibrationActuator){
    var e4 = document.createElement("spam");
    e4.className = "gp-infos";  
    e4.innerHTML = "<button type='button' class='btn btn-vib btn-primary' onclick='testVibration("+ gamepad.index + ")'>  <span className='value'>Vibration</span></buton>";
    d1.appendChild(e4);
  }
  d.appendChild(d1);

  var b = document.createElement("div");
  b.className = "gp-buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "gp-button";
    //e.id = "b" + i;
    e.innerHTML = "B" + i;
    b.appendChild(e);

  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes row";
  for (i=0; i<gamepad.axes.length; i++) {
    var a2 = document.createElement("div");
    a2.className = "ax col-6";
    var rs = document.createElement("p");
    rs.className = "gp-ax-nome";
    rs.innerHTML = "Axis " + i;
    var svg = document.createElementNS("svg");
    svg.setAttribute({'height':200, 'width':200,'version':1.0});
    var line = document.createCircle('circle',10,10,4,{color:'red'}); 
    //
    svg.appendChild(line);  
    e = document.createElement("meter");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("min", "-1");
    e.setAttribute("max", "1");
    e.setAttribute("value", "0");
    e.innerHTML = i;
    a2.appendChild(rs);
    a2.appendChild(svg);
    a2.appendChild(e);
    a.appendChild(a2);
    
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  var root = document.getElementById("root");
  root.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
  console.log(controllers.length)
        document.getElementById("start").style.display = "block";
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  var root = document.getElementById("root");
  root.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("gp-button");
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      var touched = false;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        if ('touched' in val) {
          touched = val.touched;
        }
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%";
      b.style.backgroundColor = "rgba(255, 110, 66, " + val + ")";
      b.style.opacity = Math.abs(val) + 0.4;
      b.innerHTML = "<p class='gp-bt-nome'>  B" + i +"</p>" +"<p class='gp-bt-val'>" + val.toFixed(2) + "</p>";
      b.className = "gp-button";
      if (pressed) {
        b.className += " pressed";
      }
      if (touched) {
        b.className += " touched";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (var i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i]);
    }
  }
  
  rAF(updateStatus);
}
function testVibration(i){
  var j = i;
  scangamepads();
    for(j in controllers){
      controllers[i].vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0.0,
      duration: 1333,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0
    });
  }
}
function tick() {
  pollStatus();
  if (self.ticking) {
    window.requestAnimationFrame(tick);
  }
}
  /**
   * Compares timestamps for changes
   * @see scanGamepads()
   */
   function pollStatus() {
    scanGamepads();
    for (var i in controllers) {
      var gamepad = controllers [i];
      if (gamepad.timestamp &&
              (gamepad.timestamp === prevTimestamps[i])) {
        continue;
      }
      prevTimestamps[i] = gamepad.timestamp;
    }
  }
function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthandler);
  window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 100);
}

window.addEventListener('gamepadconnected',event =>{
    console.log('Gamepad conectado:')
    console.log(event.gamepad)
})
window.addEventListener('gamepaddisconnected',event =>{
    console.log('Gamepad desconectado:')
    console.log(event.gamepad)
})
function update(){
    const gamepads = navigator.getGamepads()
    console.log(gamepads)
    window.requestAnimationFrame(update)
}
/*
let gamepad;
let lpad_x = 200;
let lpad_y = 200;
let rpad_x = 200;
let rpad_y = 200;

console.log('hello world')
function setup() {
  createCanvas(400, 400);
  
  gamepad = new Gamepad();
}

function draw() {
  background(35);
  
  gamepad.update();
  
  fill(255);
  text("A: " + gamepad.getKey("a"), 20,30);
  text("B: " + gamepad.getKey("b"), 20,40);
  text("X: " + gamepad.getKey('x'),20,50);
  text("Y: " + gamepad.getKey('y'),20,60);
  text("rb: " + gamepad.getKey('rb'),20,70);
  text("lb: " + gamepad.getKey('lb'),20,80);
  text("rt: " + gamepad.getKey('rt'),20,90);
  text("lt: " + gamepad.getKey('lt'),20,100);
  text("rs: " + gamepad.getKey('rs'),20,110);
  text("ls: " + gamepad.getKey('ls'),20,120);
  text("start: " + gamepad.getKey('start'),20,130);
  text("select: " + gamepad.getKey('select'),20,140);
  text("dup: " + gamepad.getKey('dup'),20,150);
  text("ddown: " + gamepad.getKey('ddown'),20,160);
  text("dleft: " + gamepad.getKey('dleft'),20,170);
  text("dright: " + gamepad.getKey('dright'),20,180);
  text("leftstick_x: " + gamepad.getKey('leftstick_x'),20,190);
  text("leftstick_y: " + gamepad.getKey('leftstick_y'),20,200);
  text("rightstick_x: " + gamepad.getKey('rightstick_x'),20,210);
  text("rightstick_y: " + gamepad.getKey('rightstick_y'),20,220);
  
  lpad_x = map(gamepad.getKey('leftstick_x'), -1, 1, 0, width);
  lpad_y = map(gamepad.getKey('leftstick_y'), -1, 1, 0, height);
  rpad_x = map(gamepad.getKey('rightstick_x'), -1, 1, 0, width);
  rpad_y = map(gamepad.getKey('rightstick_y'), -1, 1, 0, height);
  
  fill(255,0,0);
  circle(lpad_x, lpad_y, 50);
  fill(255,255,0);
  circle(rpad_x, rpad_y, 50);
  
  fill(255,0,255);
  rect(0,height-10 + gamepad.getKey('lt')*(-height+10), 30, 10);
  rect(width-30,height-10+ gamepad.getKey('rt')*(-height+10),30,10);
  
}

class Gamepad {
  constructor() {
    this.buttons = {};
    
    this.buttons['a'] = 0;
    this.buttons['b'] = 0;
    this.buttons['x'] = 0;
    this.buttons['y'] = 0;
    this.buttons['rb'] = 0;
    this.buttons['lb'] = 0;
    this.buttons['rt'] = 0;
    this.buttons['lt'] = 0;
    this.buttons['rs'] = 0;
    this.buttons['ls'] = 0;
    this.buttons['start'] = 0;
    this.buttons['select'] = 0;
    this.buttons['dup'] = 0;
    this.buttons['ddown'] = 0;
    this.buttons['dleft'] = 0;
    this.buttons['dright'] = 0;
    this.buttons['leftstick_x'] = 0;
    this.buttons['leftstick_y'] = 0;
    this.buttons['rightstick_x'] = 0;
    this.buttons['rightstick_y'] = 0;
    
    this.connected = false;
    
    window.addEventListener("gamepadconnected", this.connect.bind(this));
    window.addEventListener("gamepaddisconnected", this.disconnect.bind(this));
  }
  
  connect(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
    
    this.connected = true;
  }
  
  disconnect(e) {
    console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
    
    this.connected = false;
  }
  
  update() {
    let gamepad = navigator.getGamepads()[0];
    
    if (gamepad) {
      this.buttons['a'] = gamepad.buttons[0].value;
      this.buttons['b'] = gamepad.buttons[1].value;
      this.buttons['x'] = gamepad.buttons[2].value;
      this.buttons['y'] = gamepad.buttons[3].value;
      this.buttons['lb'] = gamepad.buttons[4].value;
      this.buttons['rb'] = gamepad.buttons[5].value;
      this.buttons['lt'] = gamepad.buttons[6].value;
      this.buttons['rt'] = gamepad.buttons[7].value;
      this.buttons['select'] = gamepad.buttons[8].value;
      this.buttons['start'] = gamepad.buttons[9].value;
      this.buttons['ls'] = gamepad.buttons[10].value;
      this.buttons['rs'] = gamepad.buttons[11].value;
      this.buttons['dup'] = gamepad.buttons[12].value;
      this.buttons['ddown'] = gamepad.buttons[13].value;
      this.buttons['dleft'] = gamepad.buttons[14].value;
      this.buttons['dright'] = gamepad.buttons[15].value;
      this.buttons['leftstick_x'] = gamepad.axes[0];
      this.buttons['leftstick_y'] = gamepad.axes[1];
      this.buttons['rightstick_x'] = gamepad.axes[2];
      this.buttons['rightstick_y'] = gamepad.axes[3];
    }
  }
  
  getKey(key) {
    if (this.connected) {
      return this.buttons[key];
    }
    else {
      return 0;
    }
  }
}*/

import AutoSave from './modules/autosave-class.js'
import ChaosGame from './modules/chaos-game-class.js'
import PerlinCircle from './modules/perlin_circle-class.js'


/////////
const autoSave = new AutoSave(2);
let perlinCircle;

function setup() {
  if(window.innerWidth<800){
    scene.canvasWidth = window.innerWidth;
    scene.canvasHeight = window.innerHeight;
  }
  else {
    scene.canvasWidth = window.innerWidth;
    scene.canvasHeight = window.innerHeight;
  }

  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");
  colorMode(HSL, 360,100,100);

  scene.fitCanvasToScreen();
  window.addEventListener('resize', scene.fitCanvasToScreen, false);

  perlinCircle = new PerlinCircle()
}

function draw() {
  background(0)
  let smoothnessA;
  let smoothnessB;
  if(mouseX<=width/2){
    smoothnessA = map(mouseX, 0, width/2, 0, 100)
  }
  else{
    smoothnessA = map(mouseX, width/2, width, 100, 0)
  }

  if(mouseY<=height/2){
    smoothnessB = map(mouseY, 0, height/2, 0, 50)
  }
  else{
    smoothnessB = map(mouseY, height/2, height, 50, 0)
  }

  perlinCircle.setState({
    size: 200,
    roundness: 100,
    smoothnessA: smoothnessA,
    smoothnessB: smoothnessB,
    position: {x: width/2, y: height/2}
  })

  perlinCircle.draw()
  // noLoop()
  // autoSave.saveImage(20, scene.titleShort)
}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;
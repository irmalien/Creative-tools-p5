import AutoSave from './modules/autosave-class.js'
import PerlinCircle from './modules/perlin_circle-class.js'


/////////
const autoSave = new AutoSave(2);
let perlinCircle;

const circles = [];

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

  for(let i = 0; i<30; i++){
    const circle = {
      x: random(width),
      y: random(height),
      r: 30,
    }
    let overlapping = false;
    for(let j =0; j<circles.lenght; j++){
      let other = circles[j];
      let distance = dist(circle.x, circle,y, other.x. other.y)
      if(distance < circles.r + other.r) {
        overlapping = true;
        break;
      }
    }
    if(!overlapping){
      circles.push(circle)
    }

  }

  console.log(circles)
  for (let i=0;  i<circles.length; i++){
    fill(50,50,50);
    noStroke();
    ellipse(circles[i].x, circles[i].y, circles[i].r*2, circles[i].r*2);
  }
  
}

function draw() {
  // background(0)

  // for(let i=0; i<50; i++){
  //   perlinCircle = new PerlinCircle({
  //     size: random(10,30),
  //     roundness: 100,
  //     smoothnessA: random(100),
  //     position: {x: random(width), y: random(height)}
  //   })
  //   perlinCircle.move();
  //   noStroke();
  //   perlinCircle.drawSeamless();
  // }


  noLoop()
  // autoSave.saveImage(20, scene.titleShort)
}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;
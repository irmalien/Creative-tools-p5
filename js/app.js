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
  let whilecounter = 0;
  while(circles.length < 500 && whilecounter < 50000){
    whilecounter++
    const circle = {
      x: random(width),
      y: random(height),
      r: random(5,50),
    }
    let overlapping = false;
    for(let j =0; j<circles.length; j++){
      let other = circles[j];
      let distance = dist(circle.x, circle.y, other.x, other.y)
      if(distance < circle.r + other.r + 20) {
        overlapping = true;
        break;
      }
    }
    if(!overlapping){
      circles.push(circle)
    }
  }

  // let makePositionGrid = ({_obj}) => {
  //   const {width, height, columns, rows } = _obj;
  //   const collumnsWidth = width/columns
  //   const rowsWidth = height/rows
  //   for(let i=0; i<rows; i++){

  //   }
  // }

  console.log(circles.length)
  
}

function draw() {
  background(0)

  for (let i=0;  i<circles.length; i++){
    perlinCircle = new PerlinCircle({
      size: circles[i].r,
      roundness: 100,
      smoothnessA: random(100),
      position: {x: circles[i].x, y: circles[i].y}
    })
    perlinCircle.move();
    
    noStroke();
    fill(30,70,50)
    perlinCircle.drawSeamless();
    fill(0,100,100)
    let newsize = perlinCircle.getState('size')
    newsize = newsize*0.85
    let newPosition = perlinCircle.getState('position');
    newPosition.x = newPosition.x + random(-5, 5)
    newPosition.y = newPosition.y + random(-5, 5)
    // console.log(newPosition)
    perlinCircle.setState({
      size: newsize,
      position: {x: newPosition.x, y: newPosition.y},
      perlinZOff: 0.5
    })
    // console.log(perlinCircle.getState('size'))
    perlinCircle.move();
    perlinCircle.drawSeamless();

  }


  noLoop()
  // autoSave.saveImage(20, scene.titleShort)
}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;
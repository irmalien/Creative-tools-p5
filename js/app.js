import AutoSave from './modules/autosave-class.js'
import PerlinCircle from './modules/perlin_circle-class.js'
import FastPoissonDiskSampling from './modules/fast_poisson_disc_sampling-class.js'
import DisplacedGrid from './modules/displaced_grid.js'

let poissonDisk;

/////////
const autoSave = new AutoSave(2);

function setup() {
  if(window.innerWidth<800){
    scene.canvasWidth = window.innerWidth;
    scene.canvasHeight = window.innerHeight;
  }
  else {
    scene.canvasWidth = 2200;
    scene.canvasHeight = 1308;
  }

  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");
  colorMode(HSL, 360,100,100);

  scene.fitCanvasToScreen();
  window.addEventListener('resize', scene.fitCanvasToScreen, false);

}

function draw() {
  background(0)

  // for(let i=0; i<2000; i++){
  //   const perlinCircle = new PerlinCircle({
  //     size: random(10,20),
  //     roundness: 100,
  //     smoothnessA: random(100),
  //     position: {x: random(width), y: random(height)}
  //   })
  //   perlinCircle.move();
  //   noStroke();
  //   fill(0,100,100);
  //   perlinCircle.drawSeamless();
  // }

  // Draw FastPoissonDiskSamplingGrid
  // poissonDisk = new FastPoissonDiskSampling({
  //   minimumDistance: 50,
  //   numberOfSamples: 30
  // })

  //*****************************************
  // Draw DisplacedGrid
  const displacedGrid = new DisplacedGrid({columns: 22, rows: 13, displacementIntensity: 100})
  displacedGrid.positionsArray.forEach(sample=>{
    const r1 = random(5,15)
    const perlinCircle = new PerlinCircle({
      size: r1,
      roundness: 100,
      smoothnessA: random(80, 100),
      position: {x: sample.x, y: sample.y}
    })
    perlinCircle.move();
    noStroke();
    fill(0,0,100);
    perlinCircle.drawSeamless();
  })
  //*****************************************

  //*****************************************
  // Draw poissonDisk positions
  // let poissonGrid = poissonDisk.drawGridArr();
  // poissonGrid.forEach(sample=>{
  //   const r1 = random(5,15)
  //   const perlinCircle = new PerlinCircle({
  //     size: r1,
  //     roundness: 100,
  //     smoothnessA: random(80, 100),
  //     position: {x: sample.x, y: sample.y}
  //   })
  //   perlinCircle.move();
  //   noStroke();
  //   fill(0,0,100);
  //   perlinCircle.drawSeamless();
  // });
  //*****************************************


  //*****************************************
  // Draw single PerlinCircle
  // const perlinCircle = new PerlinCircle({
  //   size: 500,
  //   roundness: 100,
  //   smoothnessA: 70,
  //   smoothnessB: 20,
  //   position: {x:width/2, y:height/2},
  //   quality: 500,
  // })
  // perlinCircle.move();
  // noStroke();
  // fill(0,0,100);
  // perlinCircle.drawSeamless();
  //*****************************************

  // Draw nonOverlappingCircles
  // let nonOverlappingCircles = nonOverlappingPositions({
  //   quantity: 100,
  //   minSize: 10,
  //   maxSize: 20,
  //   minMargin: 10,
  //   maxMargin: 20,
  // })
  // nonOverlappingCircles.forEach(sample=>{
  //   const perlinCircle = new PerlinCircle({
  //     size: sample.r,
  //     roundness: 100,
  //     smoothnessA: random(100),
  //     position: {x: sample.x, y: sample.y}
  //   })
  //   perlinCircle.move();
  //   noStroke();
  //   fill(0,100,100);
  //   perlinCircle.drawSeamless();
  // });


  // Draw jittered Grid
  // let circlesArr = makePositionGrid({
  //   width: width,
  //   height: height,
  //   columns: 20,
  //   rows: 10
  // }).map((pos) => {
  //   pos.x = pos.x + random(-80, 80)
  //   pos.y = pos.y + random(-80, 80)
  //   return pos
  // });


  noLoop()
  // saveCanvas()




  // FUNCTIONS
  function nonOverlappingPositions(_obj){
    const {quantity, minSize, maxSize, minMargin, maxMargin} = _obj;
    const positionsWidth = _obj.width ? _obj.width : width;
    const positionsHeight = _obj.height ? _obj.height : height;
    let attempts = 0;
    let circlesArr = [];

    while(circlesArr.length < quantity && attempts < quantity*1000){
      attempts++;
      const circle = {
        x: random(positionsWidth),
        y: random(positionsHeight),
        r: random(minSize,maxSize),
        get margin(){
          return random(minMargin, maxMargin);
        }
      }
      let overlapping = false;
      for(let j =0; j<circlesArr.length; j++){
        let other = circlesArr[j];
        let distance = dist(circle.x, circle.y, other.x, other.y)
        if(distance < circle.r + other.r + circle.margin) {
          overlapping = true;
          break;
        }
      }
      if(!overlapping){
        circlesArr.push(circle)
      }
    }
    return circlesArr
  }



  function subRandomPositions (_obj) {
    // Function splits area in seperated regions and fills with random points,
    // creating more uniform distribution.

    //Imported variables
    const {quantity, columns, rows } = _obj;
    const areaWidth = _obj.width ? _obj.width : width;
    const areaHeight = _obj.height ? _obj.height : height;

    //Generated variables
    const quantityInRegion = Math.round(quantity/(columns*rows))
    const regionWidth = areaWidth/columns
    const regionHeight = areaHeight/rows
    const regionsArr = [];
    const positionsArr = [];

    //Divide area and create separated regions
    for(let i=0; i<rows; i++){
      const regionY1 = i*regionHeight;
      const regionY2 = (i+1)*regionHeight;

      for(let j=0; j<columns; j++){
        const regionX1 = j*regionWidth;
        const regionX2 = (j+1)*regionWidth;
        regionsArr.push({
          x1: regionX1,
          x2: regionX2,
          y1: regionY1,
          y2: regionY2,
        })
      }
    }

    //Populate each region with equal amount of random positions
    for(let region in regionsArr){
      for(let i=0; i<quantityInRegion; i++){
        const x = random(regionsArr[region].x1, regionsArr[region].x2)
        const y = random(regionsArr[region].y1, regionsArr[region].y2)
        positionsArr.push({x: x, y: y })
      }
    }
    return positionsArr;


  }

}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;

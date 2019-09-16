import PerlinCircle from "./modules/perlin_circle.js";
import FastPoissonDiskSampling from "./modules/fast_poisson_disc_sampling.js";
import DisplacedGrid from "./modules/displaced_grid.js";
import SubRandom from "./modules/sub_random_positions.js";
import NonOverlappingPositions from "./modules/non_overlapping_positions.js"

let poissonDisk;

function setup() {
  if (window.innerWidth < 800) {
    scene.canvasWidth = window.innerWidth;
    scene.canvasHeight = window.innerHeight;
  } else {
    scene.canvasWidth = 2200;
    scene.canvasHeight = 1308;
  }

  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");
  colorMode(HSL, 360, 100, 100);

  scene.fitCanvasToScreen();
  window.addEventListener("resize", scene.fitCanvasToScreen, false);
}

function draw() {
  background(0);

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
  // const displacedGrid = new DisplacedGrid({
  //   columns: 22,
  //   rows: 13,
  //   displacementIntensity: 100
  // });
  // displacedGrid.positionsArray.forEach(sample => {
  //   const r1 = random(5, 15);
  //   const perlinCircle = new PerlinCircle({
  //     size: r1,
  //     roundness: 100,
  //     smoothnessA: random(80, 100),
  //     position: { x: sample.x, y: sample.y }
  //   });
  //   perlinCircle.move();
  //   noStroke();
  //   fill(0, 0, 100);
  //   perlinCircle.drawSeamless();
  // });
  //*****************************************

  //*****************************************
  // Draw SubRandom
  // const subRandom = new SubRandom({
  //   columns: 10,
  //   rows: 10,
  //   quantityOfPositionsInCell: 1,
  // });
  // subRandom.positionsArray.forEach(sample => {
  //   const r1 = random(2, 5);
  //   const perlinCircle = new PerlinCircle({
  //     size: r1,
  //     roundness: 100,
  //     smoothnessA: random(80, 100),
  //     position: { x: sample.x, y: sample.y }
  //   });
  //   perlinCircle.move();
  //   noStroke();
  //   fill(0, 0, 100);
  //   perlinCircle.drawSeamless();
  // });
  //*****************************************

  //*****************************************
  // Draw NonOverlappingPositions
    const multiplier = 1
    const nonOverlapping = new NonOverlappingPositions({
      quantityOfPositions: 50 * multiplier,
      minimumSize: 2,
      maximumSize: 15,
      minimumMargin: 5,
      maximumMargin: 15,
    });
    const nonOverlapping2 = new NonOverlappingPositions({
      quantityOfPositions: 2000 * multiplier,
      minimumSize: 2,
      maximumSize: 7,
      minimumMargin: 2,
      maximumMargin: 10,
    });
    const nonOverlapping3 = new NonOverlappingPositions({
      quantityOfPositions: 10000 * multiplier,
      minimumSize: 1,
      maximumSize: 4,
      minimumMargin: 0.5,
      maximumMargin: 3,
    });
    const nonOverlapping4 = new NonOverlappingPositions({
      quantityOfPositions: 30000 * multiplier,
      minimumSize: 1,
      maximumSize: 2,
      minimumMargin: 0.1,
      maximumMargin: 2,
    });
    // nonOverlapping()
    background(10,8,17);
    let arr1 = [...nonOverlapping.positionsArray]
    nonOverlappingGaussian(arr1, 0.3, 1)
    nonOverlappingGaussian(arr1, 0.7, 0.3)
    nonOverlappingGaussian(nonOverlapping2.positionsArray, 0.7, 0.4)
    filter(BLUR, 2)
    nonOverlappingGaussian(nonOverlapping4.positionsArray, 0.1)
    nonOverlappingGaussian(arr1, 1, 0.2)
    filter(BLUR, 1)
    nonOverlappingGaussian(nonOverlapping3.positionsArray, 0.2)



  //*****************************************

  function nonOverlappingDraw(nonOverlapping){

    nonOverlapping.positionsArray.forEach(sample => {
      const perlinCircle = new PerlinCircle({
        size: sample.r/2,
        roundness: 100,
        smoothnessA: random(80, 100),
        position: { x: sample.x, y: sample.y }
      });
      perlinCircle.move();
      noStroke();
      fill(200, 20, 50);
      perlinCircle.drawSeamless();
      //
    //   fill(0, 0, 100);
    //   let xPos = sample.x + random(-2, 2)
    //   let yPos = sample.y + random(-2, 2)
    //   perlinCircle.setState({
    //     size: sample.r/3,
    //     position: { x: xPos, y: yPos }
    //   })
    //   perlinCircle.move();
    //   perlinCircle.drawSeamless();
    });
  }

  function nonOverlappingGaussian(positions, _opacity, scale = 0.5){
    positions.forEach(sample => {
      for (let i=0; i<sample.r*10; i++){
        let opacity = random(0.05, _opacity)
        let x = randomGaussian(sample.x, sample.r*scale);
        let y = randomGaussian(sample.y, sample.r*scale);
        stroke(0, 0, 100, opacity);
        point(x, y)
      }

    });
  }


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

  noLoop();
  // saveCanvas()

  // FUNCTIONS


}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;

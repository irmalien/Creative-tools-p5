import PerlinCircle from "./modules/perlin_circle.js";
import FastPoissonDiskSample from "./modules/fast_poisson_disc_sample.js";
import DisplacedGrid from "./modules/displaced_grid.js";
import SubRandomDistribution from "./modules/sub_random_distribution.js";
import NonOverlappingCircles from "./modules/non_overlapping_circles.js"


export function displacedGridExample(){
  const displacedGrid = new DisplacedGrid({
    columns: 33,
    rows: 20,
    displacementIntensity: 130
  });
  _drawCirclesFromArray(displacedGrid.positionsArray)
}

export function fastPoissonDiskExample(){
  const poissonDisk = new FastPoissonDiskSample({
    minimumDistance: 50,
    numberOfSamples: 30
  })
  _drawCirclesFromArray(poissonDisk.positionsArray)
}

export function nonOverlappingPositionsExample(){
  const nonOverlapping = new NonOverlappingCircles({
    quantityOfPositions: 1000,
    minimumSize: 5,
    maximumSize: 10,
    minimumMargin: 10,
    maximumMargin: 15,
  });
  _drawCirclesFromArray(nonOverlapping.positionsArray)
}

export function perlinCircleExample(){
  const perlinCircle = new PerlinCircle({
    size: 500,
    roundness: 100,
    smoothnessA: 70,
    smoothnessB: 20,
    position: {x:width/2, y:height/2},
    quality: 500,
  })
  perlinCircle.move();
  noStroke();
  fill(0,0,100);
  perlinCircle.drawSeamless();
}

export function randomDistributionExample(){
  const positionsArray = []
  for(let i=0; i<2000; i++){
    positionsArray.push({x: random(width), y: random(height)})
  }
  _drawCirclesFromArray(positionsArray)
}

export function subRandomExample(){
  const subRandom = new SubRandomDistribution({
    columns: 40,
    rows: 30,
    quantityOfPositionsInCell: 1,
  });
  _drawCirclesFromArray(subRandom.positionsArray)
}

function _drawCirclesFromArray(array){
  array.forEach(sample=>{
    const {x, y} = sample;
    const size = sample.r || random(5,10);
    const perlinCircle = new PerlinCircle({
      size,
      position: {x, y}
    })
    noStroke();
    fill(0,0,100);
    perlinCircle.move();
    perlinCircle.drawSeamless();
  });
}

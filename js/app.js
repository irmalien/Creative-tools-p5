import {
  displacedGridExample,
  fastPoissonDiskExample,
  nonOverlappingPositionsExample,
  perlinCircleExample,
  randomDistributionExample,
  subRandomExample
} from "./examples.js";

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

  // displacedGridExample()
  // fastPoissonDiskExample()
  // nonOverlappingPositionsExample()
  // perlinCircleExample()
  // randomDistributionExample()
  // subRandomExample()

  noLoop();
  // saveCanvas()
}

// Code below is requered if using P5 library with ES6 modules
window.setup = setup;
window.draw = draw;

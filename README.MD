# Creative tools for Javascript and P5js library
Ongoing development of various creative tools made primarily for P5js and HTML canvas.
* Perlin circle
* Random distribution
* Sub-random distribution
* Displaced grid
* Fast Poisson Disc Sampling
* Non-overlapping circles

## Usage
All tools are made as classes with state and can be initialised as objects with individualised settings.
Settings to objects can be passed upon initialisation or anytime after using objects .setState() function.

#### Import relevant classes
```javascript
import PerlinCircle from "./modules/perlin_circle.js";
import FastPoissonDiskSample from "./modules/fast_poisson_disc_sample.js";
import DisplacedGrid from "./modules/displaced_grid.js";
import SubRandomDistribution from "./modules/sub_random_distribution.js";
import NonOverlappingCircles from "./modules/non_overlapping_circles.js"
```

#### Initialise object parameters with constructor
```javascript
const perlinCircle = new PerlinCircle({
  size: random(10,20),
  roundness: 100,
  smoothnessA: random(100),
  position: {x: random(width), y: random(height)}
})
```

#### Initialise or modify object parameters with setState() method
```javascript
perlinCircle.setState({
  size: random(10,20),
  roundness: 100,
  smoothnessA: random(100),
  position: {x: random(width), y: random(height)}
})
```

#### get parameters with getState() method
```javascript
let size = perlinCircle.getState('size')
```

## Perlin Circle
A circle like object modified by Perlin noise.

#### Example output and code below
![Perlin Circle](./img/perlin_circle.png?raw=true)
<!-- TODO: consistency, remove comments -->
```javascript
const perlinCircle = new PerlinCircle({
  size: 500,          // size of circle
  roundness: 100,     // roundness value from 100 round to 0 flat
  smoothnessA: 60,    // smoothness on form value from 100 (smooth) to 0 rough
  smoothnessB: 30,    // smoothness on details value from 100 (smooth) to 0 rough
  position: {x:width/2, y:height/2},
  quality: 500,       // number of vertices to create circle
})
perlinCircle.move();
perlinCircle.draw();  
// perlinCircle.drawSeamless() method to draw circle on edge and continue on opposite side.
```

## Random distribution
Basic random distribution for comparison with other solutions.

#### Example output with default javascript random algorithm
![Random distribution](./img/random.png?raw=true)

## Sub-random distribution
Splits area in cells and populates each cell with randomly distributed positions. Number of cells are determined by `columns` and `rows` in an object. As number of cells are increased, distribution uniformity increases.

#### Example output and code below
![Sub-random distribution](./img/sub_random_distribution.png?raw=true)

```javascript
const subRandom = new SubRandom({
  areaWidth: 2200,
  areaHeight: 1308,
  columns: 40,
  rows: 30,
  quantityOfPositionsInCell: 1,
});
subRandom.positionsArray; // [{ x: Number, y: Number }, ...]
```

## Displaced grid
Generates grid of positions and by adjusting `displacementIntensity` creates appearance of random distribution. Value `0` creates grid with where each point is placed in middle of each cell, `100` adds displacement up to edge of the cell, values above `100` displaces points outside of their cell.

#### Example output and code below
![Displaced grid](./img/displaced_grid.png?raw=true)

```javascript
const displacedGrid = new DisplacedGrid({
  areaWidth: 2200,
  areaHeight: 1308,
  columns: 33,
  rows: 20,
  displacementIntensity: 130
});
displacedGrid.positionsArray; // [{ x: Number, y: Number }, ...]
```

## Fast Poisson Disk Sample
Fast poisson-disc sampling produces points that are tightly-packed, but no closer to each other than a specified minimum distance, resulting in a more natural pattern. This algorithm is fast and creates very uniform result, thought disadvantage is that it works best with circles/forms that are similar size, and as size variation increases algorithm produces less than satisfactory results.

#### Example output and code below
![Fast Poisson Disk Sample](./img/fast_poisson_disc_sample.png?raw=true)

```javascript
const poissonDisk = new FastPoissonDiskSample({
  areaWidth: 2200,
  areaHeight: 1308,
  minimumDistance: 50,
  numberOfSamples: 30
})
poissonDisk.positionsArray; // [{ x: Number, y: Number }, ...]
```

## Non-overlapping circles
Produces randomly placed circle area that other circles are forbiden to overlap. Circles get randomly placed until maximum defined quantity is reached or no more area is left to place new circle. The amount of attempts until considering it unplacable can be specified by passing the option called: `...`, default `200`. This algorithm with quadtree support is relatively fast and fully accounts for various circle sizes. Thought  with similar sizes will be less uniform that Fast Poisson Disk Sample.

#### Example output and code below
![NonOverlappingCircles](./img/non-overlapping.png?raw=true)

```javascript
const nonOverlapping = new NonOverlappingCircles({
  areaWidth: 2200,
  areaHeight: 1308,
  quantityOfPositions: 1000,
  minimumSize: 5,
  maximumSize: 10,
  minimumMargin: 10,
  maximumMargin: 15,
});
nonOverlapping.positionsArray; // [{ x: Number, y: Number, r: Number, margin: Number }, ...]
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT license

## Dependencies
This app is using [P5.js library](https://github.com/processing/p5.js)

# Creative tools for Javascript and P5js library
Ongoing development of various creative tools made primarily for P5js and HTML canvas.
* Perlin noise
* Perlin circle
* Fast Poisson Disc Sampling
* Non-overlapping random circle distribution

## Installation
TODO: Describe the installation process

## Usage
All tools are made as classes with state and can be initialised as objects with individualised settings.
Settings to objects can be passed upon initialisation or anytime after using objects .setState() function.

#### Initialise object parameters with constructor
```javascript
const perlinCircle = new PerlinCircle({
  size: random(10,20),
  roundness: 100,
  smoothnessA: random(100),
  position: {x: random(width), y: random(height)}
})
```

#### Initialise object parameters with setState() method
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

## Sub-Random positions
Splits area in cells and populates each cell with randomly distributed positions. Number of cells are determined by `collumns` and `rows` in object. As number of cells are increased, randomness non-uniformity effect gets reduced.

#### Example output and code below
![Sub-random positions](./img/sub-random.png?raw=true)

```javascript
const subRandom = new SubRandom({
  columns: 50,
  rows: 50,
  quantityOfPositions: 100,
});
subRandom.positionsArray; // export x and y positions in array
```

## Displaced grid
Generates grid of positions and by adjusting `displacementIntensity` creates appearance of random distribution. Value `0` creates grid with where each point is placed in middle of each cell, `100` adds displacement up to edge of the cell, values above `100` displaces points below their cell.

#### Example output and code below
![Displacement grid](./img/displacement_grid.png?raw=true)

```javascript
const displacedGrid = new DisplacedGrid({
  areaWidth: width,
  areaHeight: height,
  columns: 22,
  rows: 13,
  displacementIntensity: 100
});
displacedGrid.positionsArray; // export x and y positions in array
```

## Fast Poisson Disk Sample
Fast poisson-disc sampling produces points that are tightly-packed, but no closer to each other than a specified minimum distance, resulting in a more natural pattern. Advantage of this algorithm is it's fast speed. While disadvantage is that it works best with circles/forms that are similar size, and as size variation increases algorithm produces less than satisfactory results.

#### Example output and code below
![Fast Poisson Disk Sample](./img/fast-poisson-disk-sample.png?raw=true)

```javascript
const fastPoissonDiscSampling = new FastPoissonDiskSampling({
width: width,         // width of area
height: height,       // height of area
minimumDistance: 50,  // required minimum distance between the points
numberOfSamples: 30,  // Number of new samples around one sample
})
fastPoissonDiscSampling.drawGridArr(); // export x and y positions in array
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits
[Fast Poisson Disk Sampling in Arbitrary Dimensions](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf)
[Perlin noise wiki](https://en.wikipedia.org/wiki/Perlin_noise)

## License
TODO: Write license

## Dependencies
This app is using [P5.js library](https://github.com/processing/p5.js)

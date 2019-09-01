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

## Fast Poisson Disk Sample
Fast poisson-disc sampling produces points that are tightly-packed, but no closer to each other than a specified minimum distance, resulting in a more natural pattern.

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

## Usage
TODO: Write usage instructions

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits
[Fast Poisson Disk Sampling in Arbitrary Dimensions](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf)

## License
TODO: Write license

### Dependencies
This app is using [P5.js library](https://github.com/processing/p5.js)

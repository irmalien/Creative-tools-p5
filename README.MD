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

```javascript
const perlinCircle = new PerlinCircle({
  size: random(10,20),
  roundness: 100,
  smoothnessA: random(100),
  position: {x: random(width), y: random(height)}
})
```
_initialise setting with constructor_

```javascript
perlinCircle.setState({
  size: random(10,20),
  roundness: 100,
  smoothnessA: random(100),
  position: {x: random(width), y: random(height)}
})
```
_initialise settings with setState() method_

### Fast Poisson Disk Sample
Fast poisson-disc sampling produces points that are tightly-packed, but no closer to each other than a specified minimum distance, resulting in a more natural pattern.

![Example output from parameters below](./img/fast-poisson-disk-sample.png?raw=true)

```javascript
const fastPoissonDiscSampling = new FastPoissonDiskSampling({
width: width,         // width of area
height: height,       // height of area
minimumDistance: 50,  // required minimum distance between the points
numberOfSamples: 30,  // Number of new samples around one sample
})
```
_example output editable parameters_



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


function drawStars(){
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
}

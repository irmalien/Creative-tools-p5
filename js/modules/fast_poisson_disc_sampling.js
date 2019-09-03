import CreativeTools from './creative_tools.js'

export default class FastPoissonDiskSampling extends CreativeTools {
	constructor(_obj){
		super();
		
	  this.state = {
	    width: width,
	    height: height,
	    minimumDistance: 10,  // required minimum distance between the points
	    numberOfSamples: 30,  // No of new samples aroud one sample
	    get cellSize(){
	      return this.minimumDistance / Math.sqrt(2)
	    },
	    get noOfCols() {
	      return floor(this.width / this.cellSize);
	    },
	    get noOfRows() {
	      return floor(this.height / this.cellSize);
	    },
	    get noOfCells(){
	      return this.noOfCols * this.noOfRows;
	    },
	    grid: [],
	    get gridFiltered(){
	      return this.grid.filter(item => item != null);
	    },
	    activeList: [],
	    isFirstClickDone: false,
	    found: null,
  }

  this.setState(_obj)

  this.initialize()
  }

  drawGrid(){
    this.state.grid.forEach(sample=>{
      if(sample){
        strokeWeight(3);
        stroke(255);
        point(sample.x,sample.y)
      }
    });
  }
  drawActive(){
    this.state.activeList.forEach(sample=>{
      if(sample){
        strokeWeight(3);
        stroke(255,0,255);
        point(sample.x,sample.y)
      }
    });
  }

  reset(){
    background(0);
    for (var i=0; i< this.state.noOfCells ; i++){
      this.state.grid[i] = null;
    }
    this.state.activeList.length = 0
   }

  initialize(){
    const x = random(this.state.width);
    const y = random(this.state.height);
    for (let i=0; i< this.state.noOfCells ; i++){
      this.state.grid[i] = null;
    }
    this.reset();
    let sample = createVector(x,y);
    const col = floor(x/this.state.cellSize);
    const row = floor(y/this.state.cellSize);
    this.state.grid[row * this.state.noOfCols + col] = sample;
    this.state.activeList.push(sample);
  }

  move(){
    if(this.state.activeList.length > 0){
      let activeSampleCellIndex = floor(random(this.state.activeList.length));
      let activeSample = this.state.activeList[activeSampleCellIndex];
      this.state.found = false;

      for(let n = 0; n < this.state.numberOfSamples; n++){
        let newSample = p5.Vector.random2D();
        let magnitude = random(this.state.minimumDistance, 2 * this.state.minimumDistance);
        newSample.setMag(magnitude);
        newSample.add(activeSample);

        if(newSample.x >= 0 && newSample.x < this.state.width && newSample.y >= 0 && newSample.y < this.state.height ){
         var newSampleCellColumn = floor(newSample.x/this.state.cellSize);
         var newSampleCellRow = floor(newSample.y/this.state.cellSize);

          let isSafe = true;
          for (let i = -1; i <= 1; i++){
            for (let j = -1; j <= 1; j++) {
             let neighbour = this.state.grid[(newSampleCellRow + j) * this.state.noOfCols + (newSampleCellColumn + i)];
             if(neighbour){
              let d = p5.Vector.dist(newSample, neighbour);
              if(d < this.state.minimumDistance){
               isSafe = false;
               break;
              }
             }
            }
          }
          if(isSafe){
           this.state.found = true;
           this.state.grid[newSampleCellColumn + newSampleCellRow * this.state.noOfCols] = newSample;
           this.state.activeList.push(newSample);
           break;
         }
        }
      }
      if(!this.state.found)
        this.state.activeList.splice(activeSampleCellIndex, 1);
    }
  }

  drawGridArr(){
    console.log("started")
    while(this.state.activeList.length > 0){
      this.move()
    }
    return this.state.gridFiltered
  }


}

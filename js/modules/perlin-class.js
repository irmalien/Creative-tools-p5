export default class Perlin {
  //TODO ADD README HOW TO USE CLASS
  constructor(_obj){
    //ADD README HOW TO PASS ARGUMENTS

    // If construcor arg obj is missing, assign empty obj
    if(_obj===undefined){_obj={}}
    
    // Set initial OFFSET values from constructor obj or random number
    this.xOffInit = _obj.xOff ? _obj.xOff : ((Math.random()*100)+1)
    this.yOffInit = _obj.yOff ? _obj.yOff : ((Math.random()*100)+1)
    this.zOffInit = _obj.zOff ? _obj.zOff : ((Math.random()*100)+1)
    
    // Set initial INCREMENT values from constructor obj or default number 
    this.xInc = _obj.xInc ? _obj.xInc : 0.005
    this.yInc = _obj.yInc ? _obj.yInc : 0.005
    this.zInc = _obj.zInc ? _obj.zInc : 0.002

    // Set working OFFSET values from initial offset value
    this.xOffReset()
    this.yOffReset()
    this.zOffReset()
  }

  // Set perlin offset increment values
  set xIncrement(_int){
    this.xInc = _int;
  }
  set yIncrement(_int){
    this.yInc = _int;
  }
  set zIncrement(_int){
    this.zInc = _int;
  }

  get x(){
    return this.xOff;
  }
  get y(){
    return this.yOff;
  }
  get z(){
    return this.zOff;
  }

  // Move perlin offset values
  xOffMove(){
    this.xOff += this.xInc;
  }
  yOffMove(){
    this.yOff += this.yInc;
  }
  zOffMove(){
    this.zOff += this.zInc;
  }

  // Reset perlin offset parameters to initial values
  xOffReset(){
    this.xOff = this.xOffInit;
  };
  yOffReset(){
    this.yOff = this.yOffInit;
    // console.log("reset")
  };
  zOffReset(){
    this.zOff = this.zOffInit;
  };
}
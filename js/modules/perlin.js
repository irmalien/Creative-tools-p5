import CreativeTools from './creative_tools.js'

export default class Perlin extends CreativeTools {
  constructor(_obj){
		super();

    this.state = {
      xOff: (Math.random()*100)+1,
      yOff: (Math.random()*100)+1,
      zOff: (Math.random()*100)+1,

      xInc: 0.005,
      yInc: 0.005,
      zInc: 0.002,
    }

    this.setState(_obj)
  }

  get x(){
    return this.state.xOff;
  }
  get y(){
    return this.state.yOff;
  }
  get z(){
    return this.state.zOff;
  }

  set xInc(_int){
    this.state.xInc = _int;
  }
  set yInc(_int){
    this.state.yInc = _int;
  }
  set zInc(_int){
    this.state.zInc = _int;
  }

  set xOff(_int){
    this.state.xOff += _int
  }

  set yOff(_int){
    this.state.yOff += _int
  }

  set zOff(_int){
    this.state.zOff += _int
  }

  // Move perlin offset values
  xOffMove(){
    this.state.xOff += this.state.xInc;
  }
  yOffMove(){
    this.state.yOff += this.state.yInc;
  }
  zOffMove(_int){
    this.state.zOff += this.state.zInc;
  }

}

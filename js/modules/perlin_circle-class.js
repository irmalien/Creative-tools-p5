import Perlin from './perlin-class.js'

export default class PerlinCircle {
	constructor(_obj){

  this.state = {
    size: 100,
    roundness: 50,
    smoothnessA: 50,
    smoothnessB: 50,
    position: {x:0, y:0},
    perlin: new Perlin({zInc: 0.002}),
    quality: 500, //number of vertices that make object
    rotation: 0,
    rotationInc: 0.0005, //aka rotation speed; positive int - clockwise, negative - counterclockwise, 0.0005
    vertexArr: []
  }
  this.setState(_obj)
  }

  setState(_obj, state = this.state) {
    if (!_obj) return;
    try {
      Object.keys(_obj).forEach(key => {
        if (typeof state[key] === 'object' && !Array.isArray(state[key])) {
          this.setState(_obj[key], state[key]);
          return;
        }
        state[key] = _obj[key];
      })
    }
    catch(error) {
      console.error(error);
    }

  }

  move(){
    this.state.perlin.zOffMove()
    this.state.rotation+=this.state.rotationInc;
    // console.log(this.state.perlin.z)
  }
  draw(_circleParam, _position){
    /**
     * size - min !0 number, max number
     * roundness = min 0(), max 100(perfectly round)
     * smoothness = min, max..
     */
    this.move()
    let {size, roundness, smoothnessA, smoothnessB, position, quality, rotation} = this.state;
    const zoff = this.state.perlin.z;
    let a = size;
    let b = size*(roundness/100);

    smoothnessA = map(smoothnessA,0,100,5,0)

    this.state.vertexArr = []
    for (let angle = 0; angle<TWO_PI; angle+=TWO_PI/quality) {
      const xoff = map(sin(angle+rotation),-1,1,0,smoothnessA);
      const yoff = map(cos(angle+rotation),-1,1,0,smoothnessA);
      let rEllipse = a*b/(sqrt(sq(b*cos(angle))+sq(a*sin(angle))));
      let min = map(smoothnessB,100,0,rEllipse,rEllipse*0.5);
      let max = map(smoothnessB,100,0,rEllipse,rEllipse*1.5);
      this.r = map(noise(xoff, yoff, zoff), 0,1,min, max)
      let x = this.r*cos(angle)+1;
      let y = this.r*sin(angle)+1;
      this.state.vertexArr.push({x:x, y:y})
    }

    push();
      translate(position.x, position.y);
      beginShape();
      this.state.vertexArr.forEach((pos) => {
        vertex(pos.x,pos.y)  
      })     
     endShape(CLOSE);
    pop();
  }
}
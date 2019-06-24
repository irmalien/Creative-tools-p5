export default class ChaosGame {
  /**
   * TODO Add readme how to use class
   *  */

  constructor(_obj){

    if(_obj===undefined){_obj={}}
    this.state = {}

    /**
     * Default settings if no parameters are passed
     *  */
    this.state = {
      polygonType: 3,
      ruleType: 0,
      showVertexes: true,
      get vertexes(){
        if(this.polygonType>=6){
          return this.makeVertexes(height*0.4, this.polygonType, 0)     
        }
        return this.makeVertexes(height*0.4, this.polygonType, PI/2)
      },
      makeVertexes: (_size, _corners, _rotation) => {
        const vertexesArray = []
        for (let a = (TWO_PI / _corners)+_rotation; a <= TWO_PI+_rotation ; a += TWO_PI / _corners) {
          const r = _size
          const vertex = {}
          vertex.x = (r * cos(a))+width/2;
          vertex.y = (r * sin(a))+height/2;
          vertexesArray.push(vertex)
        }
        return vertexesArray
      },
      pointHistory: [{x:width/2, y:height/2}],
      vertexesHistory: [{x:0, y:0}]

    }
    

    this.setState(_obj)
    console.log(this.state)
    if(this.state.showVertexes){
      this.drawVertexes(this.state.vertexes)
    }
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

  drawVertexes(_obj){
    Object.keys(_obj).forEach(key => {
      // noStroke()
      stroke(100,100,100)
      noFill()
      // fill(100,100,100);
      ellipse(_obj[key].x, _obj[key].y, 5)
    })
  }

  selectRandomObj(_obj){
    let totalKeys = 0;
    Object.keys(_obj).forEach(() => {
      totalKeys++
    })
    const selectedKey = Math.floor(Math.random() * Math.floor(totalKeys));
    return _obj[selectedKey]
  }

  move(){
    let currentVertex = {}

    switch (this.state.ruleType) {
      case 0:
        currentVertex = this.selectRandomObj({...this.state.vertexes})
        break
      case 1:
        do {
          currentVertex = this.selectRandomObj({...this.state.vertexes})
          }
        while (currentVertex.x === this.state.vertexesHistory[0].x && currentVertex.y === this.state.vertexesHistory[0].y)
        break
      case 2:
          do {
            currentVertex = this.selectRandomObj({...this.state.vertexes})
            }
          while (currentVertex.x === this.state.vertexesHistory[0].x && currentVertex.y === this.state.vertexesHistory[0].y || 
            currentVertex.x === this.state.vertexesHistory[1].x && currentVertex.y === this.state.vertexesHistory[1].y)
          break
      case 3:
          do {
            currentVertex = this.selectRandomObj({...this.state.vertexes})

            }
            while (currentVertex.x === this.state.vertexesHistory[0].x && currentVertex.y === this.state.vertexesHistory[0].y && 
              currentVertex.x === this.state.vertexesHistory[1].x && currentVertex.y === this.state.vertexesHistory[1].y)
            break  
    }
    
    const currentPoint = {};
    currentPoint.x = (this.state.pointHistory[0].x+currentVertex.x)/2
    currentPoint.y = (this.state.pointHistory[0].y+currentVertex.y)/2

    this.draw({
      x: currentPoint.x,
      y: currentPoint.y,
      size: 2,
      color: {h:0, s:0, l:100},
      opacity: 0.25,
      fillBool: true
    })

    // this.drawPolygon(height/2, 4, TWO_PI/8)
    this.state.vertexesHistory = [currentVertex, ...this.state.vertexesHistory]
    this.state.vertexesHistory.length = 10;
    this.state.pointHistory = [currentPoint, ...this.state.pointHistory]
    this.state.pointHistory.length = 10;
  }

  //Not Used - move to new helpers
  drawPolygon(_size, _corners, _rotation){
    beginShape();
    translate(width/2, height/2)
    if(_rotation){
      rotate(_rotation)
    }
    for (let a = TWO_PI / _corners; a <= TWO_PI ; a += TWO_PI / _corners) {
      const r = _size
      const x = r * cos(a);
      const y = r * sin(a);
      vertex(x, y);
      console.log(x, y)
    }
    endShape();
  }

  draw(_obj){
    const {type, x, y, size, rotation, displacementX, displacementY, opacity, color, strokeThickness, fillBool, fieldScale} = _obj

    push();
      colorMode(HSL, 360,100,100);

      if(strokeThickness){
        stroke(color.h,color.s,color.l, opacity);
        strokeWeight(strokeThickness)
      }
      else{
        noStroke()
      }


      if(fillBool){
        fill(color.h,color.s,color.l, opacity);
      }
      else{
        noFill()
      }

      ellipse(x, y, size)

    pop();

  }
}
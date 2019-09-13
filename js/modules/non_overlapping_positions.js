import CreativeTools from "./creative_tools.js";
import { Point, Rectangle, QuadTree, Circle } from "./quadtree.js"

export default class NonOverlappingPositions extends CreativeTools {
  constructor(_obj) {
    super();

    this.state = {
      areaWidth: width,
      areaHeight: height,
      quantityOfPositions: 100,
      minimumSize: 0,
      maximumSize: 20,
      minimumMargin: 0,
      maximumMargin: 50,
      isSeamless: false,
      get maximumAttemptsBeforeExit() {
        return this.quantityOfPositions * 10;
      },
      get randomWidthPosition() {
        return random(this.areaWidth)
      },
      get randomHeightPosition() {
        return random(this.areaHeight)
      },
      get randomSize() {
        return this.minimumSize != 0 ? random(this.minimumSize, this.maximumSize) : this.maximumSize

      },
      get randomMargin() {
        return this.minimumMargin != 0 ? random(this.minimumMargin, this.maximumMargin) : this.maximumMargin
      }
    };

    this.setState(_obj);

    this.boundary = new Rectangle(0, 0, this.state.areaWidth, this.state.areaHeight);
    this.capacity = 4;
    this.quadtree = new QuadTree(this.boundary, this.capacity);
  }

  get positionsArray() {
    return this._generateAndValidatePositions();
  }

  _generateAndValidatePositions() {
    const { quantityOfPositions, maximumAttemptsBeforeExit } = this.state;

    const positionsArr = [];
    let positionsQuadArr = [];
    let failedAttempts = 0;
    while (
      positionsArr.length < quantityOfPositions &&
      failedAttempts < maximumAttemptsBeforeExit
    ) {
      failedAttempts++;

      if (positionsArr.length === 0) {
        const positionCandidate = this._makeRandomPosition();
        const point = new Point (
          positionCandidate.x,
          positionCandidate.y,
          positionCandidate
        )
        this.quadtree.insert(point)
        positionsArr.push(positionCandidate)
      }

      const positionCandidate = this._makeRandomPosition();
      const range = new Circle (
        positionCandidate.x,
        positionCandidate.y,
        (positionCandidate.r+positionCandidate.margin)*2,
      )

      let points = this.quadtree.query(range)
      let intersects = false
      for (let i =0; i<points.length; i++) {
        let other = points[i].userData;
        if (this._intersects(positionCandidate, other)){
          intersects = true
          break
        }
      }
      if (!intersects) {
        const point = new Point (
          positionCandidate.x,
          positionCandidate.y,
          positionCandidate
        )
        this.quadtree.insert(point)
        positionsArr.push(positionCandidate)
      }
    }
    return positionsArr;
  }

  _makeRandomPosition() {
    return {
      x: this.state.randomWidthPosition,
      y: this.state.randomHeightPosition,
      r: this.state.randomSize,
      margin: this.state.randomMargin
    }
  }

  // _candidatePositionIsValid(positionCandidate, positionsArr) {
  //   for (let j = 0; j < positionsArr.length; j++) {
  //     const position = positionsArr[j];
  //     const candidateDistance = this._candidateDistance(positionCandidate, position);
  //     const minimumDistance = this._minimumDistance(positionCandidate, position);
  //     if (candidateDistance < minimumDistance) {
  //       return false
  //     }
  //   }
  //   return true
  // }

  _intersects(positionCandidate, positionOther) {
    const candidateDistance = this._candidateDistance(positionCandidate, positionOther);
    const minimumDistance = this._minimumDistance(positionCandidate, positionOther);
    if (candidateDistance < minimumDistance) {
      return true
    }
    return false
  }

  _candidateDistance(positionCandidate, position){
    return dist(positionCandidate.x, positionCandidate.y, position.x, position.y)
  }

  _minimumDistance(positionCandidate, position){
    return positionCandidate.r + positionCandidate.margin + position.r + position.margin
  }

}

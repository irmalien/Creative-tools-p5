import CreativeTools from "./creative_tools.js";
import { Point, Rectangle, QuadTree, Circle } from "./quadtree.js";

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
      maximumAttemptsBeforeExit: 250, // 250 seems to be fast and optimal

      get randomWidthPosition() {
        return random(this.areaWidth);
      },
      get randomHeightPosition() {
        return random(this.areaHeight);
      },
      get randomSize() {
        return this.minimumSize != 0
          ? random(this.minimumSize, this.maximumSize)
          : this.maximumSize;
      },
      get randomMargin() {
        return this.minimumMargin != 0
          ? random(this.minimumMargin, this.maximumMargin)
          : this.maximumMargin;
      },
      get quadtreeRange() {
        return (this.maximumSize + this.maximumMargin) * 2;
      }
    };

    this.setState(_obj);
    this._initializeQuadTree();
  }

  get positionsArray() {
    return this._generateAndValidatePositions();
  }

  _generateAndValidatePositions() {
    const {
      quantityOfPositions,
      maximumAttemptsBeforeExit,
      quadtreeRange
    } = this.state;
    const positionsArr = [];
    let failedAttempts = 0;

    while (
      positionsArr.length < quantityOfPositions &&
      failedAttempts < maximumAttemptsBeforeExit
    ) {
      const positionCandidate = new PositionCandidate({
        x: this.state.randomWidthPosition,
        y: this.state.randomHeightPosition,
        r: this.state.randomSize,
        margin: this.state.randomMargin
      });
      // console.log(positionCandidate);
      const isValidCandidate = this._validateAgainstOtherPositions(
        positionCandidate
      );
      if (isValidCandidate) {
        this._addPositionToQuadtree(positionCandidate.state);
        positionsArr.push(positionCandidate.state);
        failedAttempts = 0;
      } else {
        failedAttempts++;
      }
    }
    return positionsArr;
  }

  _initializeQuadTree() {
    this.boundary = new Rectangle(
      0,
      0,
      this.state.areaWidth,
      this.state.areaHeight
    );
    this.capacity = 8;
    this.quadtree = new QuadTree(this.boundary, this.capacity);
  }

  _validateAgainstOtherPositions(positionCandidate) {
    const range = new Circle(
      positionCandidate.x,
      positionCandidate.y,
      this.state.quadtreeRange
    );
    const positionsInRange = this.quadtree.query(range);

    for (let i = 0; i < positionsInRange.length; i++) {
      let otherPosition = positionsInRange[i].userData;
      if (positionCandidate.intersects(otherPosition)) {
        return false;
      }
    }
    return true;
  }

  _addPositionToQuadtree(positionCandidate) {
    const point = new Point(
      positionCandidate.x,
      positionCandidate.y,
      positionCandidate
    );
    this.quadtree.insert(point);
  }
}

class PositionCandidate {
  constructor(_obj) {
    this.state = {
      x: _obj.x,
      y: _obj.y,
      r: _obj.r,
      margin: _obj.margin
    };
  }

  get x() {
    return this.state.x;
  }

  get y() {
    return this.state.y;
  }

  get r() {
    return this.state.y;
  }

  get margin() {
    return this.state.margin;
  }

  intersects(otherPosition) {
    const candidateDistance = this._candidateDistance(otherPosition);
    const minimumDistance = this._minimumDistance(otherPosition);
    if (candidateDistance < minimumDistance) {
      return true;
    }
    return false;
  }

  _candidateDistance(otherPosition) {
    return dist(this.state.x, this.state.y, otherPosition.x, otherPosition.y);
  }

  _minimumDistance(otherPosition) {
    return (
      this.state.r + this.state.margin + otherPosition.r + otherPosition.margin
    );
  }
}

import CreativeTools from "./creative_tools.js";

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
        return this.quantityOfPositions * 100;
      },
      get randomWidthPosition() {
        return random(this.areaWidth)
      },
      get randomHeightPosition() {
        return random(this.areaHeight)
      },
      get randomSize() {
        return this.minimumSize ? random(this.minimumSize, this.maximumSize) : this.maximumSize

      },
      get randomMargin() {
        return this.minimumMargin ? random(this.minimumMargin, this.maximumMargin) : this.maximumMargin
      }
    };

    this.setState(_obj);
  }

  get positionsArray() {
    return this._generateAndValidatePositions();
  }

  _generateAndValidatePositions() {
    const { quantityOfPositions, maximumAttemptsBeforeExit } = this.state;

    const positionsArr = [];
    let failedAttempts = 0;
    while (
      positionsArr.length < quantityOfPositions &&
      failedAttempts < maximumAttemptsBeforeExit
    ) {
      failedAttempts++;
      const positionCandidate = this._makeRandomPosition();
      const positionIsValid = this._candidatePositionIsValid(
        positionCandidate,
        positionsArr
      );

      if (positionIsValid) {
        positionsArr.push(positionCandidate);
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

  _candidatePositionIsValid(positionCandidate, positionsArr) {
    for (let j = 0; j < positionsArr.length; j++) {
      const position = positionsArr[j];
      const candidateDistance = this._candidateDistance(positionCandidate, position);
      const minimumDistance = this._minimumDistance(positionCandidate, position);
      if (candidateDistance < minimumDistance) {
        return false
      }
    }
    return true
  }

  _candidateDistance(positionCandidate, position){
    return dist(positionCandidate.x, positionCandidate.y, position.x, position.y)
  }

  _minimumDistance(positionCandidate, position){
    return positionCandidate.r + positionCandidate.margin + position.r + position.margin
  }

}

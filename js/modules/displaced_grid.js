import CreativeTools from "./creative_tools.js";

export default class DisplacedGrid extends CreativeTools {
  constructor(_obj) {
    super();

    this.state = {
      areaWidth: width,
      areaHeight: height,
      columns: 16,
      rows: 16,
      displacementIntensity: 100, //0 none, 100 edge of row/collumn
      get columnWidth() {
        return floor(this.areaWidth / this.columns);
      },
      get columnHalfWidth() {
        return this.columnWidth / 2;
      },
      get rowHeight() {
        return floor(this.areaHeight / this.rows);
      },
      get rowHalfHeight() {
        return this.rowHeight / 2;
      },
      get maximumDisplacementInCollumn() {
        return map(
          this.displacementIntensity,
          0,
          100,
          0,
          this.columnHalfWidth / 2
        );
      },
      get maximumDisplacementInRow() {
        return map(
          this.displacementIntensity,
          0,
          100,
          0,
          this.RowHalfHeight / 2
        );
      }
    };

    this.setState(_obj);
  }

  get positionsArray() {
    return this._makeDisplacedGrid();
  }

  _displace(position) {
    position.x += map(
      this._randomizeValue(),
      0,
      100,
      -this.state.maximumDisplacementInCollumn,
      this.state.maximumDisplacementInCollumn
    );
    position.y += map(
      this._randomizeValue(),
      0,
      100,
      -this.state.maximumDisplacementInCollumn,
      this.state.maximumDisplacementInCollumn
    );
    return position;
  }

  _randomizeValue(min = 0, max = 100) {
    return random(min, max);
  }

  _makeGrid() {
    const {
      rows,
      columns,
      rowHeight,
      rowHalfHeight,
      columnWidth,
      columnHalfWidth
    } = this.state;
    const positionsArr = [];

    for (let i = 0; i < rows; i++) {
      const positionY = i * rowHeight + rowHalfHeight;
      for (let j = 0; j < columns; j++) {
        const positionX = j * columnWidth + columnHalfWidth;
        positionsArr.push({ x: positionX, y: positionY });
      }
    }
    return positionsArr;
  }

  _makeDisplacedGrid() {
    const positionsArr = []
    this._makeGrid().forEach(position => {
      positionsArr.push(this._displace(position));
    });
    return positionsArr
  }
}

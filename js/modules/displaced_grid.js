import CreativeTools from "./creative_tools.js";

export default class DisplacedGrid extends CreativeTools {
  constructor(_obj) {
    super();

    this.state = {
      areaWidth: width,
      areaHeight: height,
      columns: 16,
      rows: 16,
      displacementIntensity: 50, //0 none, 100 edge of row/collumn
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
    return makeDisplacedGrid()
  }

  displace(position) {
    position.x += map(
      this.randomizeValue(),
      0,
      100,
      -this.state.maximumDisplacementInCollumn,
      this.state.maximumDisplacementInCollumn
    );
    position.y += map(
      this.randomizeValue(),
      0,
      100,
      -this.state.maximumDisplacementInCollumn,
      this.state.maximumDisplacementInCollumn
    );
    return position;
  }

  randomizeValue(min = 0, max = 100) {
    return random(min, max);
  }

  makeGrid() {
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
      const positionY = i * rowsWidth + rowHalfHeight;
      for (let j = 0; j < columns; j++) {
        const positionX = j * collumnsWidth + columnHalfWidth;
        positionsArr.push({ x: positionX, y: positionY });
      }
    }

    return positionsArr;
  }

  makeDisplacedGrid() {
    return this.makeGrid().forEach(position => {
      position = displace(position);
    });
  }

}

// jitterGridPositions(_obj) {
//   const { width, height, columns, rows } = _obj;
//   const collumnsWidth = width / columns;
//   const rowsWidth = height / rows;
//   const positionArr = [];
//
//   for (let i = 0; i < rows; i++) {
//     const y = i * rowsWidth;
//     for (let j = 0; j < columns; j++) {
//       const x = j * collumnsWidth;
//       positionArr.push({ x: x, y: y });
//     }
//   }
//   return positionArr;
// }

import CreativeTools from "./creative_tools.js";

// Function splits area in seperated regions and fills with random points,
// creating more uniform random distribution.

export default class DisplacedGrid extends CreativeTools {
  constructor(_obj) {
    super();

    this.state = {
      areaWidth: width,
      areaHeight: height,
      columns: 16,
      rows: 16,
      quantityOfPositions: 100,
      get columnWidth() {
        return floor(this.areaWidth / this.columns);
      },
      get rowHeight() {
        return floor(this.areaHeight / this.rows);
      },
      get quantityOfPositionsInRegion() {
        return Math.ceil(this.quantityOfPositions / (this.columns * this.rows));
      },
    };

    this.setState(_obj);
  }

  get positionsArray() {
    return this._populateCellsWithPositions();
  }

  //Alternative B
  _makeCells(){
    const {
      rows,
      columns,
      rowHeight,
      columnWidth,
    } = this.state;
    const cellsArr = [];

    for (let i = 0; i < rows; i++) {
      const cellHeightStarts = i * rowHeight;
      const cellHeightEnds = (i + 1) * rowHeight;

      for (let j = 0; j < columns; j++) {
        const cellWidthStarts = j * columnWidth;
        const cellWidthEnds = (j + 1) * columnWidth;
        cellsArr.push({
          x1: cellWidthStarts,
          x2: cellWidthEnds,
          y1: cellHeightStarts,
          y2: cellHeightEnds
        });
      }
    }
    return cellsArr
  }

  _populateCellsWithPositions(){
    const {quantityOfPositionsInRegion} = this.state
    const cellsArr = this._makeCells()
    const positionsArr = []

    for (let cell in cellsArr) {
      for (let i = 0; i < quantityOfPositionsInRegion; i++) {
        const x = random(cellsArr[cell].x1, cellsArr[cell].x2);
        const y = random(cellsArr[cell].y1, cellsArr[cell].y2);
        positionsArr.push({ x: x, y: y });
      }
    }
    return positionsArr;
  }

}

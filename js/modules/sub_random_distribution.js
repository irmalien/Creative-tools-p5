import CreativeTools from "./creative_tools.js";

export default class SubRandomDistribution extends CreativeTools {
  constructor(_obj) {
    super();

    this.state = {
      areaWidth: width,
      areaHeight: height,
      columns: 1,
      rows: 1,
      quantityOfPositionsInCell: 10,
      get columnWidth() {
        return floor(this.areaWidth / this.columns);
      },
      get rowHeight() {
        return floor(this.areaHeight / this.rows);
      },

    };

    this.setState(_obj);
  }

  get positionsArray() {
    return this._populateCellsWithPositions();
  }

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
    const {quantityOfPositionsInCell} = this.state
    const cellsArr = this._makeCells()
    const positionsArr = []

    for (let cell in cellsArr) {
      for (let i = 0; i < quantityOfPositionsInCell; i++) {
        const x = random(cellsArr[cell].x1, cellsArr[cell].x2);
        const y = random(cellsArr[cell].y1, cellsArr[cell].y2);
        positionsArr.push({ x: x, y: y });
      }
    }
    return positionsArr;
  }

}

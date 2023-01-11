const createGrid = () => {
  let boardContainer = create("section").addClass("grid-container");
  board = create("div")
    .addClass("board container")
    .addId("board")
    .appendTo(boardContainer);
  document.body.appendChild(boardContainer);

  for (let i = 0; i < 25; i++) {
    create("div").addClass("board__cell").appendTo(board);
  }
};

createGrid();


const grid = {
  gridSize: 5,
  cells: [],

  init: function () {
    let gridElements = document.getElementsByClassName("board__cell");
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      for (let cell of gridElements) {
        this.cells[i] = {
          element: cell,
          x: i % this.gridSize,
          y: Math.floor(i / this.gridSize),
          tile: null,
        };
      }
    }
    this.generateRandomCell();
    this.generateRandomCell();
  },

  getAllEmptyCells: function () {
    return this.cells.filter((cell) => cell.tile == null);
  },

  getRandomEmptyCell: function () {
    let index = Math.floor(Math.random() * this.getAllEmptyCells().length);
    return this.getAllEmptyCells()[index];
  },

  checkGridChange: function () {
    let cellsCurrentState = this.cells
      .filter((cell) => cell.tile != null)
      .map((cell) => cell.tile);

    let cellsTilesNumber = [];
    for (let tile of cellsCurrentState) {
      cellsTilesNumber.push(tile.outerHTML);
    }
    return cellsTilesNumber.toString();
  },

  generateRandomCell: function () {
    let tile = create("div");

    Math.random() >= 0.9 ? (tile.innerText = 4) : (tile.innerText = 2);

    let randomCell = this.getRandomEmptyCell();
    tile.setAttribute("class", "tile tile__" + tile.innerText);
    tile.style.setProperty("--x", randomCell.x);
    tile.style.setProperty("--y", randomCell.y);
    tile.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], 150);
    randomCell.tile = tile;
    document.getElementById("board").append(tile);
  },

  getCellsByColumns: function () {
    let gridCells = [];
    let rowCells = [];

    for (let i = 0; i < this.gridSize; i++) {
      for (let cell of this.cells) {
        if (cell.x % this.gridSize == i) rowCells.push(cell);
        if (rowCells.length == this.gridSize) {
          gridCells.push(rowCells);
          rowCells = [];
        }
      }
    }
    return gridCells;
  },

  getCellsByRows: function () {
    let gridCells = [];
    let rowCells = [];

    for (let i = 0; i < this.gridSize; i++) {
      for (let cell of this.cells) {
        if (cell.y % this.gridSize == i) rowCells.push(cell);
        if (rowCells.length == this.gridSize) {
          gridCells.push(rowCells);
          rowCells = [];
        }
      }
    }
    return gridCells;
  },
  
  gameIsWon: function () {
    return this.cells.find(
      cell => cell.tile != null && cell.tile.innerText == 2048
    );
  },

  gameIsLose: function () {
    return this.getAllEmptyCells().length == 0 && !canMove();
  },
};

grid.init();

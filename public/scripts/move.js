const motion = {
  transitionEnding: null,
  score: 0,

  iterate: function(cells) {
    cells.map((row) => {
      for (let i = 0; i < row.length; i++) {
        let cellFromMove = row[i];
        let cellToMove = null;
  
        if (cellFromMove.tile === null) continue;
  
        for (let k = i - 1; k >= 0; k--) {
          let nextCell = row[k];
          if (nextCell.tile === null) {
            cellToMove = nextCell;
          } else if (cellFromMove.tile.innerText == nextCell.tile.innerText) {
            cellToMove = nextCell;
            break;
          } else break;
        }
  
        if (cellToMove !== null) {
          this.moveCell(cellFromMove, cellToMove);
        }
      }
    });
  },

  moveCell: function (fromCell, toCell) {
    this.transitionEnding = false;
    const promises = [];
  
    let fromMoveTile = fromCell.tile;
    let toMoveTile = toCell.tile;
  
    promises.push(
      new Promise((resolve) => {
        fromMoveTile.addEventListener("transitionend", resolve, { once: true });
      })
    );
  
    if (toMoveTile === null) {
      fromMoveTile.style.setProperty("--x", toCell.x);
      fromMoveTile.style.setProperty("--y", toCell.y);
      toCell.tile = fromMoveTile;
      fromCell.tile = null;
    } 

    else if (fromMoveTile.innerText === toMoveTile.innerText) {
      fromMoveTile.style.setProperty("--x", toCell.x);
      fromMoveTile.style.setProperty("--y", toCell.y);
      fromMoveTile.style.zIndex = "-111";
  
      setTimeout(() => {
        fromMoveTile.style.opacity = "0";
      }, 100);
      setTimeout(() => {
        document.getElementById("board").removeChild(fromMoveTile);
      }, 500);
  
      toMoveTile.innerText *= 2;
      toMoveTile.setAttribute("class", "tile tile__" + toMoveTile.innerText);
      toMoveTile.animate(
        [{ transform: "scale(1.2)" }, { transform: "scale(1)" }],
        200
      );
  
      fromCell.tile = null;
      this.score += +toMoveTile.innerText;
      document.getElementById("score-value").innerText = this.score;
    }
    if (promises.length > 0) {
      return Promise.all(promises).then(() => this.transitionEnding = true);
    }
  }
}

function checkNearCells(cells) {
  let checkMove;
  for (let row of cells) {
    let filterRow = row.map((cell) => cell.tile);

    for (let i = 0; i < filterRow.length; i++) {
      if (filterRow[i] != null && filterRow[i + 1] != null) {
        if (filterRow[i].innerText == filterRow[i + 1].innerText)
          checkMove = true;
      }
    }
  }
  return checkMove;
}

function canMove() {
  let checkLeft = checkNearCells(grid.getCellsByRows());
  let checkRight = checkNearCells(
    grid.getCellsByRows().map((row) => [...row].reverse())
  );
  let checkUp = checkNearCells(grid.getCellsByColumns());
  let checkDown = checkNearCells(
    grid.getCellsByColumns().map((columns) => [...columns].reverse())
  );
  return checkLeft || checkRight || checkUp || checkDown;
}

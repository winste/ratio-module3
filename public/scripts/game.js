document.addEventListener("keyup", onePress);

function onePress(e) {
  if (motion.transitionEnding || motion.transitionEnding === null) {
    let cellsBeforeMoving = grid.checkGridChange();
    let eName = null;

    if (e.code) {
      eName = e.code;
      e.preventDefault();
    }
    else {
      eName = e;
    }
    if (!timer.starting) timer.start();
    
    switch (eName) {
      case "ArrowUp":
      case "Up":
        slideUp();
        break;
      case "ArrowDown":
      case "Down":
        slideDown();
        break;
      case "ArrowLeft":
      case "Left":
        slideLeft();
        break;
      case "ArrowRight":
      case "Right":
        slideRight();
        break;
      default:
        return;
    }
   
    let cellsAfterMoving = grid.checkGridChange();
    if (cellsBeforeMoving !== cellsAfterMoving) grid.generateRandomCell();
  }

  if (grid.gameIsWon() || grid.gameIsLose()) stopActions();
}


let slideLeft = () => motion.iterate(grid.getCellsByRows());
let slideRight = () => motion.iterate(grid.getCellsByRows().map((row) => [...row].reverse()));
let slideUp = () => motion.iterate(grid.getCellsByColumns());
let slideDown = () => motion.iterate(grid.getCellsByColumns().map((columns) => [...columns].reverse()));



function stopActions() {
  timer.end();
  board.removeEventListener("pointerdown", getStartPosition);
  board.removeEventListener("touchstart", getStartPosition);
  document.removeEventListener("keyup", onePress);
  
  for (let tile of document.querySelectorAll(".tile")) {
    tile.classList.add("tile__no-move");
  }
}


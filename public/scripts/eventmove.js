const position = {
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  distancePressed: 60,
  board: document.getElementById("board")
};


function getStartPosition(e) {
  e.preventDefault();
  let eventBody = null;
  let eventName = null;

  if (e.type == "touchstart") {
    eventBody = e.touches[0];
    eventName = "touchmove";
  } else {
    eventBody = e;
    eventName = "pointermove";
  }

  position.startX = eventBody.clientX;
  position.startY = eventBody.clientY;
  position.board.addEventListener(`${eventName}`, getEndPosition);
}


function getEndPosition(e) {
  let eventBody = null;
  e.type == "touchmove" ? (eventBody = e.touches[0]) : (eventBody = e);

  position.endX = eventBody.clientX;
  position.endY = eventBody.clientY;
  let direction = getDirection(
    position.startX,
    position.startY,
    position.endX,
    position.endY
  );
  if (direction != null) position.board.removeEventListener(`${e.type}`, getEndPosition);
}


function getDirection(startX, startY, endX, endY) {
  let direction = null;

  if (endX - startX > position.distancePressed) direction = "Right";
  else if (startX - endX > position.distancePressed) direction = "Left";
  else if (startY - endY > position.distancePressed) direction = "Up";
  else if (endY - startY > position.distancePressed) direction = "Down";

  if (direction != null) onePress(direction);
  return direction;
}


board.addEventListener("pointerdown", getStartPosition);
board.addEventListener("touchstart", getStartPosition);

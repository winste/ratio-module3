function create(tag) {
  return document.createElement(tag);
}

HTMLElement.prototype.appendTo = function (parent) {
  parent.appendChild(this);
  return this;
};

HTMLElement.prototype.prependTo = function (parent) {
  parent.prepend(this);
  return this;
};

HTMLElement.prototype.addClass = function (classValue) {
  this.className = classValue;
  return this;
};

HTMLElement.prototype.addId = function (id) {
  this.id = id;
  return this;
};

HTMLElement.prototype.content = function (content) {
  this.innerHTML = content;
  return this;
};


const createHeadline = () => {
  const heading = create("section")
    .addClass("heading container")
    .prependTo(document.querySelector("body"));

  headingTtitle = create("h1")
    .addClass("heading__title")
    .content("2048")
    .appendTo(heading);

  aboutContainer = create("div").addClass("heading__about").appendTo(heading);

  aboutText = create("p")
    .addClass("heading__about-text")
    .content("Join the tiles, get to 2048!")
    .appendTo(aboutContainer);
    
  aboutText2 = create("p")
    .addClass("heading__about-text")
    .content("When two tiles slide into each other, they merge into one!")
    .appendTo(aboutContainer);
};


const createTimer = () => {
  const headlineResult = create("div")
    .addClass("heading__result")
    .appendTo(document.querySelector(".heading"));
  timeBlock = create("div").addClass("heading__time").appendTo(headlineResult);

  timer = create("div")
    .addClass("heading__result-time timer")
    .appendTo(timeBlock);

  timerTitle = create("p")
    .addClass("heading__result-title timer__title")
    .content("time: ")
    .appendTo(timer);

  unitTime = create("div")
    .addClass("heading__result-value timer__units")
    .addId("timer")
    .content("00:00:00.0")
    .appendTo(timer); //замена отдельных единиц времени на общий вид
};

// удалила функцию для создания блока с лучшим результатом времени

function msToTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 100);
  seconds = Math.floor((ms / 1000) % 60);
  minutes = Math.floor((ms / (1000 * 60)) % 60);
  hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return hours
    ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
    : `${minutes}m ${seconds}.${milliseconds}s`;
}


const createScoreBLock = () => {
  const headingScore = document.querySelector(".heading__result");

  scoreCount = create("div")
    .addClass("heading__count score")
    .appendTo(headingScore);

  scoreTitle = create("p")
    .addClass("heading__result-title score__title")
    .content("score: ")
    .appendTo(scoreCount);
    
  scoreValue = create("p")
    .addClass("heading__result-value score__value")
    .addId("score-value")
    .content("0")
    .appendTo(scoreCount);
};


const createButtons = () => {
  const resetButton = create("button")
    .addClass("button button-reset")
    .content("new game");

  recordButton = create("button")
    .addClass("button button-record")
    .content("records");

  document.querySelector(".heading__result").append(resetButton, recordButton);
  resetButton.onclick = () => window.location.reload();
};


createHeadline();
createTimer();
createScoreBLock();
createButtons();

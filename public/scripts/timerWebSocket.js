const timer = {
  socket: undefined,
  starting: undefined,
  timeResult: undefined,

  start() {
    this.socket = new WebSocket("ws://localhost:3000");
    this.socket.onopen = () => {
      this.socket.send("start");
      this.starting = true;
    };
    this.socket.onerror = (error) => console.log("WebSocket Error ", error);
    this.socket.onmessage = (event) => {
      outputTime(+event.data);
      this.timeResult = +event.data;
    };
  },

  end() {
    document.querySelector(".form").classList.add("modal-window--open");
    this.socket.send("end");
    this.socket.onerror = (error) => console.log("WebSocket Error ", error);
    this.socket.close();
  },
};

function outputTime(ms) {
  let timeValue = new Date(ms);
  let decorateUnitTime = (unit) => (unit < 10 ? "0" + unit : unit);
  let h = decorateUnitTime(timeValue.getUTCHours());
  m = decorateUnitTime(timeValue.getMinutes());
  s = decorateUnitTime(timeValue.getSeconds());
  ms = Math.trunc(timeValue.getMilliseconds() / 100);
  document.getElementById("timer").innerText = `${h}:${m}:${s}.${ms}`;
}

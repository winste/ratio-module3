const timer = {  // объект для запуска таймера и передачи его значений на страницу
  socket: undefined,  // хранит подключение к веб сокету, чтобы в дальнейшем можно было передавать/получать данные либо прервать соединение
  starting: undefined, // для отслеживания, был ли таймер запущен
  timeResult: undefined,  // сюда записываются последние передаваемые данных таймера с веб сокета (в милисекундах)

  start() {  // запускает таймер
    this.socket = new WebSocket("ws://localhost:3000");  // создание соединения с веб сокетом
    this.socket.onopen = () => {  // подключаемся к веб сокету
      this.socket.send("start");  // передаем на сервер "start", чтобы сервер начал считать и передавать нам милисекунды с начала игры
      this.starting = true; // устанавлаиваем значение, отмечая, что таймер был запущен
    };
    this.socket.onerror = (error) => console.log("WebSocket Error ", error); 
    this.socket.onmessage = (event) => { // обраатываем полученные данные с сервера
      outputTime(+event.data); // передаем данные в числовом формате в функцию вывода на страницу
      this.timeResult = +event.data; // в timeResult перезаписываются полученные данные в актуальном времени при поступлении с сервера
    };
  },

  end() {  // останавливает таймер
    if (grid.win) document.querySelector(".form").classList.add("modal-window--open"); // если был выигрыш игры, то вызывает форму для записи имени игрока
    this.socket.send("end"); // отправляет информацию об окончании работы таймера для его остановки на сервере и разрыве соединения
    this.socket.onerror = (error) => console.log("WebSocket Error ", error);
  },
};

function outputTime(ms) { // преобразует полученные милисекунды в вид HH:mm:ss:sss и выводит на страницу
  let timeValue = new Date(ms);
  let decorateUnitTime = (unit) => (unit < 10 ? "0" + unit : unit);
  let h = decorateUnitTime(timeValue.getUTCHours());
  m = decorateUnitTime(timeValue.getMinutes());
  s = decorateUnitTime(timeValue.getSeconds());
  ms = Math.trunc(timeValue.getMilliseconds() / 100);
  document.getElementById("timer").innerText = `${h}:${m}:${s}.${ms}`;
};
const express = require("express");  
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;

// подключение к экспрессу и создание сервера
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

// подключение к вебсокету
const socketServer = require("http").createServer(app).listen(server); 
const wss = new WebSocket.Server({ server: socketServer }); 

//подключение к MongoDB
const url = "mongodb+srv://admin:12345@cluster0.ubn9cdr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.static(__dirname + "/public"));  // для чтения статических файлов
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json()); // для чтения данных в формате JSON

// объект для начала отсчета времени
const timer = {
  timeOnStart: undefined,  // записывает время запуска таймера
  startTime() {
    this.timeOnStart = Date.now();
  },
};

wss.on("connection", function connection(ws) {  // открывает соединение по вебсокету
  let tick;  // переменная для управления методом setInterval

  ws.on("message", (message) => {  // обрабатываем полученное сообщение с клиента
    if (message == "start") {  // если в  сообщении говорится о начале запуска таймера
      timer.startTime();  // то начинаем отсчет времени
      tick = setInterval(() => {  
        ws.send(Date.now() - timer.timeOnStart);  // передаем на клиент прошедшее время в актульном режиме 
      }, 0);
    }

    if (message == "end") {  // если сообщение о закрытии
      clearInterval(tick);  // останавливаем передачу времени
      ws.close();  // закрываем соединение по вебсокету
    }
  });
});


app.get("/", (req, res) => {  // обработка метода get на начальной странице
  res.sendFile(__dirname + "/index.html");
});


app.get("/api/v1/record", async (res, req) => {  
  try {
    await client.connect();  // подключаемся к MongoDB
    const result = await client.db("results")  
      .collection("users")
      .find() // запрашиваем список пользователей из коллекции  
      .sort({time: 1}) // сортируем весь список по времени: от лучшего результата к худшему
      .limit(20)  // ограничение на 20 пользователей для отображения в таблице лучших 20 игроков
      .toArray();
    req.send(result)  // отправляем полученный массив пользователей на клиент
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();  // в конце закрываем соединене с MongoDB
  }
});


app.post("/api/v1/record", async (res, req) => {
  try {
    await client.connect();
    const result = await client
      .db("results")
      .collection("users")  // находим необходимую коллекцию
      .insertOne(res.body);  // добавляем в базу данных пользователя, отправленного с клиента в формате {usename: name, time: ms}
    req.send(result.insertedId);  // по окончании отправляем на клиент id вновь добавленного игрока
  } catch (error) {
    console.log(error);
  } finally {
    await client.close(); // в конце закрываем соединене с MongoDB
  }
});

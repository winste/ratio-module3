const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
const socketServer = require("http").createServer(app).listen(server);
const wss = new WebSocket.Server({ server: socketServer });
const url = "mongodb+srv://admin:12345@cluster0.ubn9cdr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const timer = {
  timeOnStart: undefined,
  startTime() {
    this.timeOnStart = Date.now();
  },
};

wss.on("connection", function connection(ws) {
  console.log("-WebSocket connected...");
  let tick;

  ws.on("message", (message) => {
    if (message == "start") {
      timer.startTime();
      tick = setInterval(() => {
        ws.send(Date.now() - timer.timeOnStart);
      }, 0);
    }

    if (message == "end") {
      clearInterval(tick);
      console.log("-WebSocket closed");
    }
  });
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get("/api/v1/record", async (res, req) => {
  try {
    await client.connect();
    const result = await client.db("results")
      .collection("users")
      .find()
      .limit(20)
      .sort({time: 1})
      .toArray();
    req.send(result)
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});


app.post("/api/v1/record", async (res, req) => {
  try {
    await client.connect();
    const result = await client
      .db("results")
      .collection("users")
      .insertOne(res.body);
    req.send(result.insertedId);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

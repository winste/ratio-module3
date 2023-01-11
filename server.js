const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const PORT =  process.env.PORT || 3000;
const server = app.listen(PORT);
const socketServer = require('http').createServer(app).listen(server);
const wss = new WebSocket.Server({ server:socketServer });

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());


const timer = {
    timeOnStart: undefined,
    startTime()  {
      this.timeOnStart = Date.now();
    }
}


wss.on('connection', function connection(ws) {
  console.log('--WebSocket on server connected...');

  let tick;
  let differenceInTime = undefined;

  ws.on('message', function incoming(message) {
    console.log(message.toString());

    if (message == 'start') {
      timer.startTime();

      tick = setInterval(() => {
        differenceInTime = Date.now() - timer.timeOnStart;
        ws.send(differenceInTime);
      }, 0);
    }

    if (message == 'end') {
      clearInterval(tick);
      console.log(differenceInTime);
      console.log('--WebSocket on server closed...');
    }
  });
});



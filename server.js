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

  ws.on('message', message => {

    if (message == 'start') {
      timer.startTime();
      tick = setInterval(() => {
        ws.send(Date.now() - timer.timeOnStart);
      }, 0);
    }

    if (message == 'end') {
      clearInterval(tick);
      console.log('--WebSocket on server closed...');
    }
  });
});


app.post('/api/v1/record', (response, request) => {
  console.log(response.body);
  request.send('okok');
})



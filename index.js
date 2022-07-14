const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('pay', (msg) => {
    console.log('paying: ' + msg);
    io.emit('paid', msg);
  });
});
server.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT);
});
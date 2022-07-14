const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('transaction', (msg) => {
    console.log('transaction: ' + msg);
    // io.emit('transaction', msg);
    socket.broadcast.emit('transaction', msg);
  });
});
server.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT);
});
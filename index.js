const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors')

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('transaction', (msg) => {
    console.log('transaction: ' + msg);
    socket.broadcast.emit('transaction', msg);
  });
});
server.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT);
});